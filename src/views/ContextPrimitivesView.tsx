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

const grid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: 16,
  width: '100%',
  maxWidth: 560,
}

interface PrimitiveCardProps {
  label: string
  emoji: string
  description: string
}

function PrimitiveCard({ label, emoji, description }: PrimitiveCardProps) {
  const card: CSSProperties = {
    border: '1.5px solid #e0e0e0',
    borderRadius: 14,
    padding: '24px 20px',
    background: '#fafafa',
    textAlign: 'left',
    transition: 'border-color 0.2s',
  }
  return (
    <div style={card}>
      <div style={{ fontSize: 24, marginBottom: 10 }}>{emoji}</div>
      <div style={{ fontSize: '15px', fontWeight: 700, color: '#111', marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ fontSize: '13px', lineHeight: 1.6, color: '#777' }}>
        {description}
      </div>
    </div>
  )
}

const PRIMITIVES: PrimitiveCardProps[] = [
  {
    emoji: '⚙️',
    label: 'System Prompt',
    description: 'Global instructions that define the agent\'s persona, rules, and capabilities.',
  },
  {
    emoji: '📋',
    label: 'Project Prompt',
    description: 'CLAUDE.md, AGENTS.md — repo-level conventions, architecture, and preferences.',
  },
  {
    emoji: '🔧',
    label: 'Tools',
    description: 'Definitions of available actions: read files, run commands, search code, etc.',
  },
  {
    emoji: '✨',
    label: 'Skills',
    description: 'Higher-level capabilities composed from tools — specialized workflows the agent can invoke.',
  },
  {
    emoji: '💬',
    label: 'User Prompt',
    description: 'Your request — the task, question, or instruction that drives the current interaction.',
  },
]

export default function ContextPrimitivesView() {
  return (
    <div style={page}>
      <span style={chapterLabel}>Chapter 04</span>
      <h2 style={heading}>Context Primitives</h2>

      <p style={body}>
        Every agent interaction is built from the same building blocks. These
        are the <strong>primitives</strong> that compose the context window —
        each shaping what the model knows and how it behaves.
      </p>

      <div style={grid}>
        {PRIMITIVES.map((p) => (
          <PrimitiveCard key={p.label} {...p} />
        ))}
      </div>
    </div>
  )
}
