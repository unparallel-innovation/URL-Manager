import QueryString from "query-string";
import { EventEmitter } from "events"
import { URLManagerTools, StringHM } from '../URLManagerTools';

export interface URLManagerProps {
    id: string,
    hashChain?: StringHM
    urlManagerComponentId?: string
}


export class URLManager extends URLManagerTools {


    id: string
    disableUrlManager: boolean
    hashLength: number
    hash: string
    events: EventEmitter
    urlManagerComponentId: string | undefined
    constructor(props: URLManagerProps, disableUrlManager?: boolean) {
        super()
        this.id = props.id
        this.disableUrlManager = !!disableUrlManager
        this.hashLength = 6
        this.hash = URLManager.generateHash(this.id, props.hashChain)
        this.events = new EventEmitter()
        this.urlManagerComponentId = props.urlManagerComponentId
    }





    setNewHashChain(hashChain: StringHM) {

        const prevHash = this.hash
        this.hash = URLManager.generateHash(this.id, hashChain)
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
        const url = new URL(window.location.href);
        url.searchParams.set(this.hash, URLManager.getEncodedStrFromJSON(componentJson));
        if (addToHistoric) {
            window.history.pushState({}, "", url)
        } else {
            window.history.pushState({}, "", url)
        }

    }

    getKeyFromComponent<T = any>(key: string): T | undefined {
        if (window.location) {
            const query = QueryString.parse(window.location.search)
            const result = query[this.hash]
            if (typeof result === "string") {
                const json = URLManager.getJSONFromEncodedStr(result)
                return json[key]
            }
        }
    }

    getJSONFromComponent(hash: string) {
        if (window.location) {
            const result = URLManager.getJSONFromHash(hash, window.location.search)
            return result
        }
    }


}
