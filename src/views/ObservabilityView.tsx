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
  margin: '0 0 40px',
  fontWeight: 400,
}

const layers: CSSProperties = {
  width: '100%',
  maxWidth: 540,
  display: 'flex',
  flexDirection: 'column',
  gap: 14,
}

interface CardProps {
  icon: string
  title: string
  description: string
  detail: string
}

function Card({ icon, title, description, detail }: CardProps) {
  return (
    <div style={{
      border: '1.5px solid #e0e0e0',
      borderRadius: 14,
      padding: '20px 24px',
      background: '#fafafa',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
        <span style={{ fontSize: 20 }}>{icon}</span>
        <span style={{ fontSize: '16px', fontWeight: 700, color: '#111' }}>{title}</span>
      </div>
      <div style={{ fontSize: '14px', lineHeight: 1.6, color: '#555', marginBottom: 8 }}>
        {description}
      </div>
      <div style={{
        fontSize: '12px',
        lineHeight: 1.6,
        color: '#888',
        padding: '10px 14px',
        background: '#f0f0f0',
        borderRadius: 8,
        fontFamily: '"SF Mono", "Fira Code", monospace',
      }}>
        {detail}
      </div>
    </div>
  )
}

const ITEMS: CardProps[] = [
  {
    icon: '📡',
    title: 'Observability',
    description: 'OpenTelemetry traces and structured logs let you monitor what the agent does, how long it takes, and where it fails — essential for debugging and auditing.',
    detail: 'OTEL traces • Structured logs • Token usage metrics • Latency tracking',
  },
  {
    icon: '✍️',
    title: 'Commit Attribution',
    description: 'Every change the agent makes is traceable. Co-authored-by trailers, separate bot accounts, and audit trails ensure clear accountability.',
    detail: 'Co-authored-by: Copilot <...@users.noreply.github.com>',
  },
]

export default function ObservabilityView() {
  return (
    <div style={page}>
      <span style={chapterLabel}>Chapter 24</span>
      <h2 style={heading}>Observability</h2>

      <p style={body}>
        Knowing <strong>what the agent did</strong> — and why — is as important
        as what it produced. Tracing, structured logs, and clear attribution
        turn a black box into an auditable, debuggable system.
      </p>

      <div style={layers}>
        {ITEMS.map((item) => (
          <Card key={item.title} {...item} />
        ))}
      </div>
    </div>
  )
}
