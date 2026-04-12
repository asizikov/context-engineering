import type { CSSProperties } from 'react'

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

const rail: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  width: 200,
  padding: '32px 0 32px 20px',
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  overflowY: 'auto',
  zIndex: 100,
}

const item = (_active: boolean, visited: boolean): CSSProperties => ({
  background: 'none',
  border: 'none',
  padding: '6px 0',
  cursor: visited ? 'pointer' : 'default',
  textAlign: 'left',
  fontFamily: 'inherit',
  display: 'flex',
  alignItems: 'baseline',
  gap: 8,
  opacity: visited ? 1 : 0,
  transform: visited ? 'translateX(0)' : 'translateX(-8px)',
  transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
})

const num = (active: boolean): CSSProperties => ({
  fontSize: '11px',
  fontWeight: 600,
  color: active ? '#111' : '#bbb',
  width: 18,
  textAlign: 'right',
  flexShrink: 0,
  fontVariantNumeric: 'tabular-nums',
  transition: 'color 0.2s',
})

const title = (active: boolean): CSSProperties => ({
  fontSize: '13px',
  fontWeight: active ? 700 : 400,
  color: active ? '#111' : '#999',
  lineHeight: 1.35,
  transition: 'color 0.2s, font-weight 0.2s',
})

export default function Sidebar({
  chapters,
  currentIndex,
  maxVisited,
  onNavigate,
}: SidebarProps) {
  if (currentIndex === 0) return null

  return (
    <nav style={rail}>
      {chapters.map((ch) => {
        const isActive = ch.index === currentIndex
        const isVisited = ch.index <= maxVisited

        return (
          <button
            key={ch.index}
            style={item(isActive, isVisited)}
            onClick={() => isVisited && onNavigate(ch.index)}
            disabled={!isVisited}
          >
            <span style={num(isActive)}>{ch.index}</span>
            <span style={title(isActive)}>{ch.title}</span>
          </button>
        )
      })}
    </nav>
  )
}
