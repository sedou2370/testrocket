interface InterfaceTag {
    id: number,
    name: string,
    color: string | null
}

class Tag {
    id: number
    name: string
    color: string | null

    constructor(interfaceTag: InterfaceTag) {
        this.id = interfaceTag.id
        this.name = interfaceTag.name
        this.color = interfaceTag.color
    }
}

// @ts-ignore
export {Tag, InterfaceTag}
