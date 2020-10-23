import { useEffect, useState } from 'react'

export const useStateCallbackWrapper = (initialValue, callBack) => {
  const [state, setState] = useState(initialValue)
  useEffect(() => callBack(state), [state])
  return [state, setState]
}
