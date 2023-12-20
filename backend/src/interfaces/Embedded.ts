import {Tag} from "./Tag";
import {Contact} from "./Contact";
import {Companie} from "./Companie";

export interface Embedded {
    tags: Tag[]
    contacts:Contact[]
    companies:Companie[]
}
