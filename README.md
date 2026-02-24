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

## Example
A React Component with an example is available in "/src/App.tsx" on this repository