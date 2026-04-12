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
  padding: '32px',
  background: '#fafafa',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 16,
}

const stageRow: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  width: '100%',
}

const stageLabel: CSSProperties = {
  fontSize: '12px',
  fontWeight: 700,
  color: '#888',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  width: 70,
  textAlign: 'right',
  flexShrink: 0,
}

const stageBarStyle: CSSProperties = {
  flex: 1,
  height: 32,
  borderRadius: 8,
  overflow: 'hidden',
  display: 'flex',
  background: '#eee',
}

const segment = (width: number, color: string): CSSProperties => ({
  width: `${width}%`,
  height: '100%',
  background: color,
  transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
})

const arrow: CSSProperties = {
  fontSize: 20,
  color: '#ccc',
  textAlign: 'center',
  width: '100%',
}

const caption: CSSProperties = {
  fontSize: '13px',
  color: '#888',
  textAlign: 'center',
  lineHeight: 1.6,
  marginTop: 4,
}

const legend: CSSProperties = {
  display: 'flex',
  gap: 16,
  flexWrap: 'wrap',
  justifyContent: 'center',
}

const legendItemStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  fontSize: '12px',
  color: '#666',
}

const dot = (color: string): CSSProperties => ({
  width: 10,
  height: 10,
  borderRadius: 3,
  background: color,
})

export default function CompactionView() {
  const beforeSegments = [
    { width: 15, color: '#555' },
    { width: 20, color: '#999' },
    { width: 50, color: '#ccc' },
    { width: 10, color: '#111' },
  ]

  const afterSegments = [
    { width: 15, color: '#555' },
    { width: 20, color: '#999' },
    { width: 20, color: '#ccc' },
    { width: 10, color: '#111' },
  ]

  return (
    <div style={page}>
      <span style={chapterLabel}>Chapter 08</span>
      <h2 style={heading}>Compaction</h2>

      <p style={body}>
        Compaction is the antidote to context rot. It <strong>summarizes</strong>{' '}
        earlier conversation turns, preserving essential facts while discarding
        noise — freeing space for new, relevant context.
      </p>

      <div style={diagram}>
        <div style={stageRow}>
          <span style={stageLabel}>Before</span>
          <div style={stageBarStyle}>
            {beforeSegments.map((s, i) => (
              <div key={i} style={segment(s.width, s.color)} />
            ))}
          </div>
        </div>

        <div style={arrow}>↓ compact</div>

        <div style={stageRow}>
          <span style={stageLabel}>After</span>
          <div style={stageBarStyle}>
            {afterSegments.map((s, i) => (
              <div key={i} style={segment(s.width, s.color)} />
            ))}
          </div>
        </div>

        <div style={legend}>
          <span style={legendItemStyle}>
            <span style={dot('#555')} />System
          </span>
          <span style={legendItemStyle}>
            <span style={dot('#999')} />Tools
          </span>
          <span style={legendItemStyle}>
            <span style={dot('#ccc')} />History
          </span>
          <span style={legendItemStyle}>
            <span style={dot('#111')} />User
          </span>
        </div>

        <p style={caption}>
          History is summarized, keeping key decisions and<br />
          outcomes while freeing tokens for new context.
        </p>
      </div>
    </div>
  )
}
