import { useMemo, useState } from "react"
import { URLManager } from "../lib/URLManager"




function App() {
  const urlManager = useMemo<URLManager>(() => new URLManager({ id: "test" }), [])
  const key = "count"
  const [count, _setCount] = useState<number>(urlManager.getKeyFromComponent(key) || 0)

  function setCount(value: number) {
    urlManager.updateKey(key, value)
    _setCount(value)
  }

  return (
    <>
      <h1>Count: {count}</h1>
      <button onClick={() => { setCount(count + 1) }}>Increment</button>
    </>
  )
}

export default App
