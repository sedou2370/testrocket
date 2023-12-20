interface InterfaceUser {
    id: number
    name: string
}

class User {
    id: number
    name: string

    constructor(interfaceUSer: InterfaceUser) {
        this.id = interfaceUSer.id
        this.name = interfaceUSer.name
    }
}

export {User, InterfaceUser}
