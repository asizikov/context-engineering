import type { CSSProperties } from 'react'

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
  margin: '0 0 48px',
  textAlign: 'center',
}

const quoteBlock: CSSProperties = {
  borderLeft: '4px solid #111',
  padding: '24px 32px',
  margin: '0 0 48px',
  maxWidth: 560,
}

const quoteText: CSSProperties = {
  fontSize: 'clamp(20px, 3vw, 28px)',
  fontWeight: 600,
  lineHeight: 1.5,
  letterSpacing: '-0.01em',
  color: '#111',
  fontStyle: 'italic',
  margin: 0,
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

const diagramBox: CSSProperties = {
  width: '100%',
  maxWidth: 480,
  border: '1.5px solid #e0e0e0',
  borderRadius: 16,
  padding: '32px',
  background: '#fafafa',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 12,
}

const scaleRow: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  gap: 12,
}

const scaleLabel: CSSProperties = {
  fontSize: '12px',
  fontWeight: 600,
  color: '#aaa',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  width: 70,
  textAlign: 'right',
  flexShrink: 0,
}

const scaleLine: CSSProperties = {
  flex: 1,
  height: 2,
  background: 'linear-gradient(to right, #ddd, #111)',
  borderRadius: 1,
}

const pointer: CSSProperties = {
  width: 14,
  height: 14,
  borderRadius: '50%',
  background: '#111',
  border: '3px solid #fff',
  boxShadow: '0 0 0 2px #111',
  position: 'relative',
  left: '60%',
  marginTop: -8,
}

const pointerLabel: CSSProperties = {
  fontSize: '11px',
  fontWeight: 700,
  color: '#111',
  textAlign: 'center',
  marginTop: 4,
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
}

export default function TheGoalView() {
  return (
    <div style={page}>
      <span style={chapterLabel}>Chapter 10</span>
      <h2 style={heading}>The Goal</h2>

      <div style={quoteBlock}>
        <p style={quoteText}>
          "Provide as little context as possible, but as much as required."
        </p>
      </div>

      <p style={body}>
        Context engineering is a balancing act. Too little and the agent
        hallucinates or makes wrong assumptions. Too much and signal gets
        buried in noise. The sweet spot is <strong>precise, relevant
        context</strong> — nothing more.
      </p>

      <div style={diagramBox}>
        <div style={scaleRow}>
          <span style={scaleLabel}>Too little</span>
          <div style={{ flex: 1, position: 'relative' }}>
            <div style={scaleLine} />
            <div style={pointer} />
          </div>
          <span style={{ ...scaleLabel, textAlign: 'left' }}>Too much</span>
        </div>
        <div style={pointerLabel}>Sweet spot</div>
      </div>
    </div>
  )
}
