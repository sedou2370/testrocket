import {Embedded} from "./Embedded";

export interface Lead {
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
