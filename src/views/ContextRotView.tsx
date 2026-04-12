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
  gap: 20,
}

const problemCard = (color: string): CSSProperties => ({
  padding: '20px 24px',
  borderRadius: 12,
  border: `2px solid ${color}`,
  borderLeft: `6px solid ${color}`,
  background: '#fff',
})

const problemTitle: CSSProperties = {
  fontSize: '16px',
  fontWeight: 700,
  color: '#111',
  marginBottom: 6,
}

const problemDesc: CSSProperties = {
  fontSize: '14px',
  lineHeight: 1.6,
  color: '#666',
}

const PROBLEMS = [
  {
    title: 'Lost in the Middle',
    desc: 'Models pay most attention to the beginning and end of context. Information buried in the middle gets overlooked — a blind spot that grows with context length.',
    color: '#e74c3c',
  },
  {
    title: 'Recency Bias',
    desc: 'Instructions and information near the end of the prompt carry outsized influence. Earlier context fades, even if it\'s more important.',
    color: '#e67e22',
  },
  {
    title: 'Noise Accumulation',
    desc: 'Each loop iteration adds tool results and reasoning traces. Irrelevant details pile up and dilute the signal, making it harder for the model to find what matters.',
    color: '#f1c40f',
  },
]

export default function ContextRotView() {
  return (
    <div style={page}>
      <span style={chapterLabel}>Chapter 08</span>
      <h2 style={heading}>Context Rot</h2>

      <p style={body}>
        As context grows, its <strong>quality degrades</strong>. These are the
        three problems that emerge when a context window fills up with the
        residue of an agent's work.
      </p>

      <div style={diagram}>
        {PROBLEMS.map((p) => (
          <div key={p.title} style={problemCard(p.color)}>
            <div style={problemTitle}>{p.title}</div>
            <div style={problemDesc}>{p.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
