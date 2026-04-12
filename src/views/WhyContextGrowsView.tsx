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
  margin: '0 0 48px',
  fontWeight: 400,
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
      <span style={chapterLabel}>Chapter 05</span>
      <h2 style={heading}>Why Context Grows</h2>

      <p style={body}>
        Every loop iteration <strong>adds</strong> to the context — tool calls,
        results, reasoning traces. A context window that started small can
        quickly fill up, pushing against token limits.
      </p>

      <div style={diagram}>
        {LAYERS.map((layer) => (
          <div key={layer.label} style={barRow}>
            <span style={barLabel}>{layer.label}</span>
            <div style={bar(layer.pct, layer.color)}>{layer.pct}%</div>
          </div>
        ))}
        <p style={caption}>
          Conversation history and tool results dominate<br />
          the window after just a few loop iterations.
        </p>
      </div>
    </div>
  )
}
