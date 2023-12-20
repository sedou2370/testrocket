import express, {Express, Request, Response} from 'express'
// @ts-ignore
import cors from 'cors'
import dotenv from 'dotenv'
import {Client} from 'amocrm-js'
import path from 'path'
import fs from 'fs'
// @ts-ignore
import config from './assets/cinfig'
import {DataLeads} from "./interfaces/DataLeads";
import {InterfaceTag, Tag} from "./interfaces/Tag";
import {InterfaceUser, User} from "./interfaces/User";
import {Contact} from "./interfaces/Contact";
import {InterfaceSearchValue, SearchValue} from "./interfaces/SearchValue";


const corsOption = {
    credentials: true,
    origin: ['http://localhost:5173', 'https://localhost:5173']
}
const bodyParser = require('body-parser')
const filePath = path.resolve(__dirname, '../token.json')
const app: Express = express()
const port = 5000
const client = new Client(config)
let leads: null | DataLeads = null
let tags: null | Tag[] = null
let users: null | User[] = null
let contacts: null | Contact[] = null

dotenv.config();
app.use(bodyParser.json())
app.use(cors(corsOption))
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get('/', async (req: Request, res: Response) => {
    res.send(`
        <h1>Welcome to Node Express TS API Server! </h1>
        <p>
        NODE_ENV: ${process.env.NODE_ENV}
        PORT: ${port}
        </p>
    `)
})

app.get('/get', async (req: Request, res: Response) => {
    client.token.on('change', () => {
        const token = client.token.getValue()
        fs.writeFileSync(filePath, JSON.stringify(token))
    })

    if (fs.existsSync(filePath)) {
        try {
            const json = fs.readFileSync(filePath).toString();
            const currentToken = JSON.parse(json)
            client.token.setValue(currentToken)
        } catch (e) {
            console.log(`Error ${e}`)
        }
    }

    // @ts-ignore
    const query = new SearchValue(req.query as InterfaceSearchValue)

    if (query.value === undefined) {
        const response = await client.request.make('GET', '/api/v4/leads');

        leads = new DataLeads(response.data as DataLeads)
    } else {
        const response = await client.request.make('GET', `/api/v4/leads?query=${query.value}`);
        leads = new DataLeads(response.data as DataLeads)
    }

    const responcePipelines = await client.request.make('GET', '/api/v4/leads/pipelines')

    // @ts-ignore
    tags = responcePipelines.data?._embedded.pipelines[0]._embedded.statuses.map(
        // @ts-ignore
        (interfaceTages) => new Tag(interfaceTages as InterfaceTag)
    ) as Tag[]

    await addTagsInLeads()

    const responceUsers = await client.request.make('GET', '/api/v4/users')

    // @ts-ignore
    users = (responceUsers.data?._embedded.users as Array<unknown>).map(interfaceUser => new User(interfaceUser as InterfaceUser))

    await addUsersInLeads()

    const responceContacts = await client.request.make('GET', '/api/v4/contacts')


    // @ts-ignore
    contacts = (responceContacts.data?._embedded.contacts as Array<unknown>).map(interfaceContact => new Contact(interfaceContact as InterfaceContact))

    await addContactsInLeads()

    res.send(leads)
})

app.listen(port, async () => {
    console.log(`Node.JS-Express API 📀 listening at http://localhost:${port}`)
});

async function addTagsInLeads() {
    leads?._embedded.leads.forEach(lead => {
        const tag = tags?.find(t => t.id === lead.status_id)
        if (tag) {
            lead._embedded.tags.push(tag)
        }
    })
}

async function addUsersInLeads() {
    leads?._embedded.leads.forEach(lead => {
        const user = users?.find(u => u.id === lead.responsible_user_id)
        if (user) {
            lead.user_mame = user.name
        }
    })
}

async function addContactsInLeads() {
    leads?._embedded.leads.forEach(lead => {
        const contact = contacts?.find(c => c.responsible_user_id === lead.responsible_user_id && c.created_at === lead.created_at)
        if (contact) {
            lead.contact_name_user = contact.name
            lead.mail = contact.custom_fields_values[1].values[0].value
            lead.telephone = contact.custom_fields_values[0].values[0].value
        }
    })
}
