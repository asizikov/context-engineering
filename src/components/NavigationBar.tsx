import type { CSSProperties } from 'react'

interface NavigationBarProps {
  canGoBack: boolean
  canGoForward: boolean
  onBack: () => void
  onForward: () => void
  currentIndex: number
  totalViews: number
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

const progress: CSSProperties = {
  pointerEvents: 'auto',
  display: 'flex',
  gap: '6px',
  alignItems: 'center',
}

const dot = (active: boolean): CSSProperties => ({
  width: active ? 20 : 6,
  height: 6,
  borderRadius: 3,
  background: active ? '#111' : '#ccc',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
})

export default function NavigationBar({
  canGoBack,
  canGoForward,
  onBack,
  onForward,
  currentIndex,
  totalViews,
}: NavigationBarProps) {
  if (currentIndex === 0) return null

  return (
    <div style={bar}>
      <button
        style={{ ...btn, opacity: canGoBack ? 1 : 0.25 }}
        onClick={onBack}
        disabled={!canGoBack}
      >
        ← Back
      </button>

      <div style={progress}>
        {Array.from({ length: totalViews }, (_, i) => (
          <div key={i} style={dot(i === currentIndex)} />
        ))}
      </div>

      <button
        style={{ ...btn, opacity: canGoForward ? 1 : 0.25 }}
        onClick={onForward}
        disabled={!canGoForward}
      >
        Next →
      </button>
    </div>
  )
}
