import type { CSSProperties } from 'react'

const footer: CSSProperties = {
  position: 'fixed',
  bottom: 68,
  left: 0,
  right: 0,
  textAlign: 'center',
  fontSize: '13px',
  color: '#bbb',
  pointerEvents: 'none',
  zIndex: 10,
}

export default function Footer() {
  return (
    <span style={footer}>© Anton Sizikov — Solutions Engineer @ GitHub</span>
  )
}
