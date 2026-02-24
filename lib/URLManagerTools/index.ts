import QueryString from "query-string";

import ObjectHash from "object-hash"

export interface StringHM {
    [k: string]: any
}

export interface URLManagerRequest<T = StringHM> {
    id: string,
    json: T,
    hashChain?: StringHM
}

export class URLManagerTools {


    static getJSONFromHash(hash: string, parameters: string) {

        const query = QueryString.parse(parameters)
        const result = query[hash]
        if (typeof result === "string") {
            return this.getJSONFromEncodedStr(result)
        }
    }

    static getJSONFromId(id: string, parameters: string, hashChain?: StringHM) {
        const hash = this.generateHash(id, hashChain)
        return this.getJSONFromHash(hash, parameters)
    }

    static getJSONFromEncodedStr(encodedStr: string) {

        const decoded = decodeURIComponent(encodedStr)
        return JSON.parse(decoded)
    }
    static getUrlParameterForId(id: string, json: StringHM, hashChain?: StringHM) {
        const hash = this.generateHash(id, hashChain)
        return this.getUrlParameterForHash(hash, json)
    }

    static getUrlParameterForHash(hash: string, json: StringHM) {
        const encodedJSON = this.getEncodedStrFromJSON(json)
        const parameter = hash + "=" + encodedJSON
        return parameter
    }


    static generateURLParameters(requests: URLManagerRequest[]) {
        if (Array.isArray(requests)) {
            const parameters: string[] = []
            requests.forEach(request => {
                const { id, json, hashChain } = request
                const parameter = this.getUrlParameterForId(id, json, hashChain)
                parameters.push(parameter)
            })
            return parameters.join("&")
        }
    }

    //static generateJSONFromUrlParamet

    static getEncodedStrFromJSON(json: StringHM) {
        const strObj = JSON.stringify(json);
        return encodeURIComponent(strObj)
    }

    static generateHash(id: string, hashChain?: StringHM) {
        const hashLength = 6
        const obj = { id, ...hashChain }
        let hash = ObjectHash(obj)
        hash = hash.substring(0, hashLength)
        return hash
    }

}
