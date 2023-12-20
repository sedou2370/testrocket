// @ts-ignore
import {Embedded} from "@/intergaces/Embedded";

interface InterfaceLead {
    id: number,
    responsible_user_id: number,
    user_mame: string,
    name: string,
    price: number,
    created_at: number,

    contact_name_user: string
    mail: string

    telephone: string
    pipeline_id: number,
    status_id: number,


    _embedded: Embedded
}

class Lead {
    id: number
    name: string
    responsible_user_id: number
    user_mame: string
    price: number
    created_at: string

    contact_name_user: string
    mail: string

    telephone: string


    pipeline_id: number
    status_id: number


    _embedded: Embedded

    constructor(interfaceLead: InterfaceLead) {
        this.id = interfaceLead.id
        this.name = interfaceLead.name
        this.responsible_user_id = interfaceLead.responsible_user_id
        this.user_mame = interfaceLead.user_mame
        this.price = interfaceLead.price
        this.created_at = reformDate(interfaceLead.created_at)
        this.contact_name_user = interfaceLead.contact_name_user
        this.mail = interfaceLead.mail
        this.telephone = interfaceLead.telephone
        this.pipeline_id = interfaceLead.pipeline_id
        this.status_id = interfaceLead.status_id
        this._embedded = interfaceLead._embedded
    }
}

function reformDate(num: number) {
    const a = new Date(num * 1000)

    return `${a.toLocaleDateString()} ${a.toLocaleTimeString()}`
}

// @ts-ignore
export {Lead, InterfaceLead}
