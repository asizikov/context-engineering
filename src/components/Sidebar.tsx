import { useState, type CSSProperties } from 'react'
import { useIsMobile } from '../hooks/useIsMobile'

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

const mobileDrawer = (open: boolean): CSSProperties => ({
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  width: 240,
  padding: '64px 0 32px 20px',
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  overflowY: 'auto',
  zIndex: 200,
  background: '#fff',
  boxShadow: open ? '4px 0 24px rgba(0,0,0,0.12)' : 'none',
  transform: open ? 'translateX(0)' : 'translateX(-100%)',
  transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
})

const backdrop = (open: boolean): CSSProperties => ({
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.4)',
  zIndex: 199,
  opacity: open ? 1 : 0,
  pointerEvents: open ? 'auto' : 'none',
  transition: 'opacity 0.3s',
})

const hamburgerBtn: CSSProperties = {
  position: 'fixed',
  top: 16,
  right: 16,
  zIndex: 201,
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 8,
  display: 'flex',
  flexDirection: 'column',
  gap: 5,
  alignItems: 'center',
  justifyContent: 'center',
}

const hamburgerLine: CSSProperties = {
  width: 22,
  height: 2,
  background: '#111',
  borderRadius: 2,
  display: 'block',
  transition: 'opacity 0.2s',
}

const closeBtn: CSSProperties = {
  position: 'absolute',
  top: 16,
  right: 16,
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontSize: 22,
  color: '#111',
  lineHeight: 1,
  padding: 4,
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

const titleStyle = (active: boolean): CSSProperties => ({
  fontSize: '13px',
  fontWeight: active ? 700 : 400,
  color: active ? '#111' : '#999',
  lineHeight: 1.35,
  transition: 'color 0.2s, font-weight 0.2s',
})

function ChapterList({
  chapters,
  currentIndex,
  maxVisited,
  onNavigate,
}: SidebarProps) {
  return (
    <>
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
            <span style={titleStyle(isActive)}>{ch.title}</span>
          </button>
        )
      })}
    </>
  )
}

export default function Sidebar({
  chapters,
  currentIndex,
  maxVisited,
  onNavigate,
}: SidebarProps) {
  const isMobile = useIsMobile()
  const [isOpen, setIsOpen] = useState(false)

  if (currentIndex === 0) return null

  if (isMobile) {
    const handleNavigate = (index: number) => {
      setIsOpen(false)
      onNavigate(index)
    }

    return (
      <>
        <button
          style={hamburgerBtn}
          onClick={() => setIsOpen(true)}
          aria-label="Open navigation menu"
        >
          <span style={hamburgerLine} />
          <span style={hamburgerLine} />
          <span style={hamburgerLine} />
        </button>

        <div
          style={backdrop(isOpen)}
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />

        <nav style={mobileDrawer(isOpen)} aria-label="Chapter navigation">
          <button
            style={closeBtn}
            onClick={() => setIsOpen(false)}
            aria-label="Close navigation menu"
          >
            ✕
          </button>
          <ChapterList
            chapters={chapters}
            currentIndex={currentIndex}
            maxVisited={maxVisited}
            onNavigate={handleNavigate}
          />
        </nav>
      </>
    )
  }

  return (
    <nav style={rail}>
      <ChapterList
        chapters={chapters}
        currentIndex={currentIndex}
        maxVisited={maxVisited}
        onNavigate={onNavigate}
      />
    </nav>
  )
}
