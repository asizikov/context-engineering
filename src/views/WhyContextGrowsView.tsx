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
  margin: '0 0 40px',
  textAlign: 'center',
}

const body: CSSProperties = {
  fontSize: 'clamp(16px, 2vw, 19px)',
  lineHeight: 1.75,
  color: '#444',
  maxWidth: 600,
  textAlign: 'center',
  margin: '0 0 24px',
  fontWeight: 400,
}

const callout: CSSProperties = {
  width: '100%',
  maxWidth: 520,
  padding: '20px 24px',
  borderRadius: 12,
  background: '#fff8f0',
  border: '1.5px solid #f0d8b0',
  marginBottom: 36,
}

const calloutTitle: CSSProperties = {
  fontSize: '14px',
  fontWeight: 700,
  color: '#111',
  marginBottom: 6,
}

const calloutBody: CSSProperties = {
  fontSize: '14px',
  lineHeight: 1.65,
  color: '#666',
}

const diagram: CSSProperties = {
  width: '100%',
  maxWidth: 520,
  border: '1.5px solid #e0e0e0',
  borderRadius: 16,
  padding: '32px 28px',
  background: '#fafafa',
}

const barRow: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  marginBottom: 12,
}

const barLabel: CSSProperties = {
  fontSize: '12px',
  fontWeight: 600,
  color: '#888',
  width: 80,
  textAlign: 'right',
  flexShrink: 0,
}

const bar = (widthPct: number, color: string): CSSProperties => ({
  height: 28,
  borderRadius: 6,
  background: color,
  width: `${widthPct}%`,
  transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
  display: 'flex',
  alignItems: 'center',
  paddingLeft: 10,
  fontSize: '11px',
  fontWeight: 600,
  color: '#fff',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
})

const caption: CSSProperties = {
  fontSize: '13px',
  color: '#999',
  textAlign: 'center',
  marginTop: 20,
  lineHeight: 1.6,
}

const LAYERS = [
  { label: 'System', pct: 15, color: '#555' },
  { label: 'Project', pct: 10, color: '#777' },
  { label: 'Tools', pct: 20, color: '#999' },
  { label: 'History', pct: 35, color: '#bbb' },
  { label: 'User', pct: 5, color: '#111' },
]

export default function WhyContextGrowsView() {
  return (
    <div style={page}>
      <span style={chapterLabel}>Chapter 06</span>
      <h2 style={heading}>Why Context Grows</h2>

      <p style={body}>
        Large language models are <strong>stateless</strong>. They have no
        memory between calls. Every time the agent takes a turn, the harness
        must resubmit the <strong>entire session</strong> — system prompt,
        tools, and every previous message — as input.
      </p>

      <div style={callout}>
        <div style={calloutTitle}>⚠️ Models don't remember</div>
        <div style={calloutBody}>
          Each API call sends the full conversation log from scratch.
          The agent's response, your reply, tool calls and results —
          all of it gets appended and resent on the next turn. The
          context window only grows; it never shrinks on its own.
        </div>
      </div>

      <div style={diagram}>
        {LAYERS.map((layer) => (
          <div key={layer.label} style={barRow}>
            <span style={barLabel}>{layer.label}</span>
            <div style={bar(layer.pct, layer.color)}>{layer.pct}%</div>
          </div>
        ))}
        <p style={caption}>
          After a few loop iterations, conversation history and<br />
          tool results dominate the context window.
        </p>
      </div>
    </div>
  )
}
