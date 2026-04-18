import { useState, useEffect } from 'react'

export function useIsMobile(breakpointW = 1024, breakpointH = 900): boolean {
  const check = () =>
    window.innerWidth <= breakpointW || window.innerHeight <= breakpointH

  const [isMobile, setIsMobile] = useState(check)

  useEffect(() => {
    const mqW = window.matchMedia(`(max-width: ${breakpointW}px)`)
    const mqH = window.matchMedia(`(max-height: ${breakpointH}px)`)
    const handler = () => setIsMobile(check)
    mqW.addEventListener('change', handler)
    mqH.addEventListener('change', handler)
    setIsMobile(check())
    return () => {
      mqW.removeEventListener('change', handler)
      mqH.removeEventListener('change', handler)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [breakpointW, breakpointH])

  return isMobile
}
