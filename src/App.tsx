import { useMemo, useState } from "react"
import { URLManager } from "../lib/URLManager"




function App() {
  const urlManager = useMemo<URLManager>(() => new URLManager({ id: "test" }), [])
  const [count, _setCount] = useState<number>(urlManager.getKeyFromComponent("count") || 0)
  const [count2, _setCount2] = useState<number>(urlManager.getKeyFromComponent("count2") || 0)

  function setCount(value: number) {
    if (value === 0) urlManager.deleteKey("count")
    else urlManager.updateKey("count", value)
    _setCount(value)
  }
  function setCount2(value: number) {
    if (value === 0) urlManager.deleteKey("count2")
    else urlManager.updateKey("count2", value)
    _setCount2(value)
  }
  return (
    <>
      <h1>Count: {count}</h1>
      <h1>Count2: {count2}</h1>
      <div>
        <button onClick={() => { setCount(count + 1) }}>Increment count</button>
        <button onClick={() => { setCount2(count2 + 1) }}>Increment count 2</button>
      </div>
      <div>
        <button onClick={() => { setCount(0) }}>Reset count</button>
        <button onClick={() => { setCount2(0) }}>Reset count 2</button>
      </div>
    </>
  )
}

export default App
