# URL Manager

Element used to store an retrieved query parameters from the URL encoded in JSON

## Constructor

```typescript
const urlManager = new URLManager({ id: "page" })
```

**id:** each instance have an id, this allows to have in the same URL several jsons, this could be useful to store the data of different elements in the ame url

## Methods

```typescript
urlManager.updateKey<T=any>(key: string, value: T, addToHistoric?: boolean)
```
Updates a JSON entry, by providing a key/value pair

 ```typescript
urlManager.getKeyFromComponent<T = any>(key: string): T | undefined
```
Obtains the JSON associated with a key

 ```typescript
urlManager.deleteKey(key: string, addToHistoric?: boolean)
```
Deletes a key from the JSON encoded in the url, if all the keys are removed the paremeters will be removed from the URL

 ```typescript
urlManager.deleteAllKeys(addToHistoric?: boolean)
```
Delete all the keys from the JSON encoded in the url, this will remove the parameter from the URL as well


## Example
A React Component with an example is available in "/src/App.tsx" on this repository