import React from 'react'

let id = 0
const useId = () => React.useMemo(() => id++, [])

export default useId
