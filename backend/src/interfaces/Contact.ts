import {FieldsValue} from "./FieldsValue";

interface InterfaceContact {
    id: number
    name: string
    responsible_user_id: number
    created_at: number

    custom_fields_values: FieldsValue[]
}

class Contact {
    id: number
    name: string
    responsible_user_id: number
    created_at: number

    custom_fields_values: FieldsValue[]

    constructor(interfaceContact: InterfaceContact) {
        this.id = interfaceContact.id
        this.name = interfaceContact.name
        this.created_at = interfaceContact.created_at
        this.responsible_user_id = interfaceContact.responsible_user_id
        this.custom_fields_values = interfaceContact.custom_fields_values
    }
}

export {Contact, InterfaceContact}
