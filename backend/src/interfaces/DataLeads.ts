import {Lead} from "./Lead";

interface InterfaceDataLeads {
    _embedded: {
        leads: Lead[]
    }
}

class DataLeads {
    _embedded: {
        leads: Lead[]
    }

    constructor(dataleads: InterfaceDataLeads) {
        this._embedded = dataleads._embedded
    }

}

export {InterfaceDataLeads, DataLeads}
