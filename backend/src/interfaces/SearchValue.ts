interface InterfaceSearchValue {
    value: string
}

class SearchValue {
    value: string

    constructor(interfaceSearchValue: InterfaceSearchValue) {
        this.value = interfaceSearchValue.value
    }
}

export {SearchValue, InterfaceSearchValue}
