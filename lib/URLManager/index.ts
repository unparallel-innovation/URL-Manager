import QueryString from "query-string";
import { EventEmitter } from "events"
import { URLManagerTools, StringHM } from '../URLManagerTools';

export interface URLManagerProps {
    id: string,
    hashChain?: StringHM
    urlManagerComponentId?: string,
    useObjectToComputeHash?: boolean
}


export class URLManager extends URLManagerTools {


    id: string
    disableUrlManager: boolean
    hashLength: number
    hash: string
    events: EventEmitter
    urlManagerComponentId: string | undefined
    useObjectToComputeHash: boolean
    constructor(props: URLManagerProps, disableUrlManager?: boolean) {
        super()
        this.id = props.id
        this.disableUrlManager = !!disableUrlManager
        this.hashLength = 6
        this.useObjectToComputeHash = !!props.useObjectToComputeHash
        this.hash = URLManager.generateHash(this.id, props.hashChain, this.useObjectToComputeHash)
        this.events = new EventEmitter()
        this.urlManagerComponentId = props.urlManagerComponentId

    }





    setNewHashChain(hashChain: StringHM) {

        const prevHash = this.hash
        this.hash = URLManager.generateHash(this.id, hashChain, this.useObjectToComputeHash)
        if (prevHash != this.hash) {
            this.events.emit("hashChange", this.hash)
        }

    }

    updateKey<T = any>(key: string, value: T, addToHistoric?: boolean) {
        if (this.disableUrlManager) {
            return
        }

        const newJson = { [key]: value }
        let componentJson = this.getJSONFromComponent(this.hash) //get previous component json
        componentJson = { ...componentJson, ...newJson }
        this.setQueryParameter(componentJson, addToHistoric)
    }

    deleteKey(key: string, addToHistoric?: boolean) {
        const componentJson = this.getJSONFromComponent(this.hash) //get previous component json
        delete componentJson[key]
        this.setQueryParameter(Object.keys(componentJson).length === 0 ? null : componentJson, addToHistoric)
    }

    deleteAllKeys(addToHistoric?: boolean) {
        this.setQueryParameter(null, addToHistoric)
    }

    setQueryParameter(value: any, addToHistoric?: boolean) {
        const url = new URL(window.location.href);
        if (value === null) url.searchParams.delete(this.hash)
        else url.searchParams.set(this.hash, URLManager.getEncodedStrFromJSON(value));
        if (addToHistoric) {
            window.history.pushState({}, "", url)
        } else {
            window.history.pushState({}, "", url)
        }
    }


    getSearch(search: string | undefined): string {
        if (typeof search === "string") return search
        if (typeof window === "undefined") {
            throw '"window" object not defined, when using this library in the server side "search" parameter must be defined'
        }
        return window.location.search
    }


    getKeyFromComponent<T = any>(key: string, search?: string): T | undefined {

        const query = QueryString.parse(this.getSearch(search))
        const result = query[this.hash]
        if (typeof result === "string") {
            const json = URLManager.getJSONFromEncodedStr(result)
            return json[key]
        }
    }

    getJSONFromComponent(hash: string, search?: string) {
        const result = URLManager.getJSONFromHash(hash, this.getSearch(search))
        return result
    }


}
