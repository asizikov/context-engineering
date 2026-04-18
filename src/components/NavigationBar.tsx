import type { CSSProperties } from 'react'

interface NavigationBarProps {
  canGoBack: boolean
  canGoForward: boolean
  onBack: () => void
  onForward: () => void
  currentIndex: number
  sidebarOffset?: number
}

const bar: CSSProperties = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '20px 40px',
  zIndex: 100,
  background: 'linear-gradient(transparent, rgba(255,255,255,0.95) 40%)',
  pointerEvents: 'none',
}

const btn: CSSProperties = {
  pointerEvents: 'auto',
  background: 'none',
  border: 'none',
  fontSize: '15px',
  fontFamily: 'inherit',
  letterSpacing: '0.05em',
  textTransform: 'uppercase' as const,
  cursor: 'pointer',
  padding: '12px 0',
  color: '#111',
  transition: 'opacity 0.2s',
}

export default function NavigationBar({
  canGoBack,
  canGoForward,
  onBack,
  onForward,
  currentIndex,
  sidebarOffset = 0,
}: NavigationBarProps) {
  if (currentIndex === 0) return null

  const barStyle: CSSProperties = {
    ...bar,
    paddingLeft: sidebarOffset + 40,
  }

  return (
    <div style={barStyle}>
      <button
        style={{ ...btn, opacity: canGoBack ? 1 : 0.25 }}
        onClick={onBack}
        disabled={!canGoBack}
      >
        ← Back
      </button>

      {canGoForward && (
        <button
          style={btn}
          onClick={onForward}
        >
          Next →
        </button>
      )}
    </div>
  )
}
