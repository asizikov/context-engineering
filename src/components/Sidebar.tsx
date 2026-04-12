import { useState, type CSSProperties } from 'react'

export interface Chapter {
  index: number
  title: string
}

interface SidebarProps {
  chapters: Chapter[]
  currentIndex: number
  maxVisited: number
  onNavigate: (index: number) => void
}

const toggle: CSSProperties = {
  position: 'fixed',
  top: 20,
  left: 20,
  zIndex: 201,
  width: 40,
  height: 40,
  borderRadius: 10,
  border: '1.5px solid #e0e0e0',
  background: 'rgba(255,255,255,0.9)',
  backdropFilter: 'blur(8px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  fontSize: '18px',
  color: '#555',
  transition: 'border-color 0.2s, background 0.2s',
}

const overlay: CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.15)',
  zIndex: 199,
  transition: 'opacity 0.3s',
}

const panel = (open: boolean): CSSProperties => ({
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  width: 300,
  background: '#fff',
  borderRight: '1px solid #eee',
  zIndex: 200,
  transform: open ? 'translateX(0)' : 'translateX(-100%)',
  transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
})

const header: CSSProperties = {
  padding: '24px 24px 16px',
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: '#aaa',
}

const listStyle: CSSProperties = {
  padding: '0 12px 24px',
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
}

const item = (active: boolean, visited: boolean): CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '10px 12px',
  borderRadius: 8,
  background: active ? '#f5f5f5' : 'transparent',
  cursor: visited ? 'pointer' : 'default',
  transition: 'background 0.15s',
  border: 'none',
  width: '100%',
  textAlign: 'left',
  fontFamily: 'inherit',
})

const num = (active: boolean, visited: boolean): CSSProperties => ({
  fontSize: '12px',
  fontWeight: 700,
  color: active ? '#111' : visited ? '#999' : '#ddd',
  width: 22,
  textAlign: 'right',
  flexShrink: 0,
})

const title = (active: boolean, visited: boolean): CSSProperties => ({
  fontSize: '14px',
  fontWeight: active ? 700 : 500,
  color: active ? '#111' : visited ? '#555' : '#ddd',
  lineHeight: 1.3,
})

export default function Sidebar({
  chapters,
  currentIndex,
  maxVisited,
  onNavigate,
}: SidebarProps) {
  const [open, setOpen] = useState(false)

  // Hide on landing
  if (currentIndex === 0) return null

  return (
    <>
      <button
        style={toggle}
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle chapter list"
      >
        ☰
      </button>

      {open && (
        <div
          style={overlay}
          onClick={() => setOpen(false)}
        />
      )}

      <div style={panel(open)}>
        <div style={header}>Chapters</div>
        <div style={listStyle}>
          {chapters.map((ch) => {
            const isActive = ch.index === currentIndex
            const isVisited = ch.index <= maxVisited

            return (
              <button
                key={ch.index}
                style={item(isActive, isVisited)}
                onClick={() => {
                  if (isVisited) {
                    onNavigate(ch.index)
                    setOpen(false)
                  }
                }}
                disabled={!isVisited}
              >
                <span style={num(isActive, isVisited)}>{ch.index}</span>
                <span style={title(isActive, isVisited)}>{ch.title}</span>
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}
