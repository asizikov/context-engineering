import { useState, type CSSProperties } from 'react'

const page: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100dvh',
  padding: '60px 24px 120px',
  maxWidth: 760,
  margin: '0 auto',
}

const chapterLabel: CSSProperties = {
  fontSize: '13px',
  fontWeight: 500,
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: '#999',
  marginBottom: 20,
}

const heading: CSSProperties = {
  fontSize: 'clamp(32px, 5.5vw, 56px)',
  fontWeight: 700,
  lineHeight: 1.1,
  letterSpacing: '-0.025em',
  color: '#111',
  margin: '0 0 40px',
  textAlign: 'center',
}

const body: CSSProperties = {
  fontSize: 'clamp(16px, 2vw, 19px)',
  lineHeight: 1.75,
  color: '#444',
  maxWidth: 600,
  textAlign: 'center',
  margin: '0 0 48px',
  fontWeight: 400,
}

const diagramContainer: CSSProperties = {
  width: '100%',
  maxWidth: 560,
  margin: '0 0 48px',
}

const diagramBox: CSSProperties = {
  border: '1.5px solid #e0e0e0',
  borderRadius: 16,
  padding: '32px',
  background: '#fafafa',
}

const row: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 16,
  marginBottom: 20,
}

const arrow: CSSProperties = {
  fontSize: 20,
  color: '#bbb',
}

const pill = (active: boolean): CSSProperties => ({
  padding: '12px 24px',
  borderRadius: 50,
  fontSize: '14px',
  fontWeight: 600,
  letterSpacing: '0.03em',
  border: active ? '2px solid #111' : '2px solid #ddd',
  background: active ? '#111' : '#fff',
  color: active ? '#fff' : '#888',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  userSelect: 'none',
})

const contextWindow: CSSProperties = {
  border: '2px dashed #ccc',
  borderRadius: 12,
  padding: '20px',
  textAlign: 'center',
  marginTop: 8,
}

const contextLabel: CSSProperties = {
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: '#aaa',
  marginBottom: 12,
}

const contextItem = (visible: boolean): CSSProperties => ({
  display: 'inline-block',
  padding: '6px 14px',
  margin: '4px',
  borderRadius: 6,
  fontSize: '13px',
  fontWeight: 500,
  background: visible ? '#f0f0f0' : 'transparent',
  color: visible ? '#333' : 'transparent',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  border: visible ? '1px solid #e0e0e0' : '1px solid transparent',
})

const highlight: CSSProperties = {
  fontSize: 'clamp(15px, 1.8vw, 17px)',
  lineHeight: 1.7,
  color: '#666',
  maxWidth: 540,
  textAlign: 'center',
  fontStyle: 'italic',
}

const CONTEXT_ITEMS = [
  'System prompt',
  'User message',
  'File contents',
  'Error logs',
  'Conversation history',
  'Tool results',
]

export default function WhatIsContextView() {
  const [activeItems, setActiveItems] = useState<Set<number>>(new Set([0, 1]))
  const [showAll, setShowAll] = useState(false)

  const toggleAll = () => {
    if (showAll) {
      setActiveItems(new Set([0, 1]))
    } else {
      setActiveItems(new Set(CONTEXT_ITEMS.map((_, i) => i)))
    }
    setShowAll(!showAll)
  }

  return (
    <div style={page}>
      <span style={chapterLabel}>Chapter 01</span>

      <h2 style={heading}>What is Context?</h2>

      <p style={body}>
        In the world of AI coding agents, <strong>context</strong> is everything
        the model can see when it generates a response. It's the window through
        which the agent perceives your project, your intent, and the task at
        hand.
      </p>

      {/* Interactive diagram */}
      <div style={diagramContainer}>
        <div style={diagramBox}>
          <div style={row}>
            <span style={pill(true)}>You</span>
            <span style={arrow}>→</span>
            <span style={pill(true)}>Context</span>
            <span style={arrow}>→</span>
            <span style={pill(true)}>Agent</span>
          </div>

          <div style={contextWindow}>
            <div style={contextLabel}>Context Window</div>
            {CONTEXT_ITEMS.map((item, i) => (
              <span
                key={item}
                style={contextItem(activeItems.has(i))}
                onClick={() => {
                  setActiveItems((prev) => {
                    const next = new Set(prev)
                    if (next.has(i)) next.delete(i)
                    else next.add(i)
                    return next
                  })
                }}
              >
                {item}
              </span>
            ))}
            <div style={{ marginTop: 12 }}>
              <button
                onClick={toggleAll}
                style={{
                  background: 'none',
                  border: '1px solid #ddd',
                  borderRadius: 20,
                  padding: '6px 16px',
                  fontSize: '12px',
                  fontFamily: 'inherit',
                  color: '#888',
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                }}
              >
                {showAll ? 'Reset' : 'Show all'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <p style={highlight}>
        "The quality of an agent's output is directly proportional to the
        quality of context it receives."
      </p>
    </div>
  )
}
