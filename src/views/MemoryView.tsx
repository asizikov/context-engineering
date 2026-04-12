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

const grid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: 14,
  width: '100%',
  maxWidth: 560,
}

interface MemoryCardProps {
  icon: string
  title: string
  description: string
  examples: string[]
}

function MemoryCard({ icon, title, description, examples }: MemoryCardProps) {
  return (
    <div style={{
      border: '1.5px solid #e0e0e0',
      borderRadius: 14,
      padding: '22px 20px',
      background: '#fafafa',
      textAlign: 'left',
    }}>
      <div style={{ fontSize: 24, marginBottom: 10 }}>{icon}</div>
      <div style={{ fontSize: '15px', fontWeight: 700, color: '#111', marginBottom: 6 }}>
        {title}
      </div>
      <div style={{ fontSize: '13px', lineHeight: 1.6, color: '#777', marginBottom: 10 }}>
        {description}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {examples.map((ex) => (
          <span key={ex} style={{
            fontSize: '11px',
            fontWeight: 600,
            padding: '3px 10px',
            borderRadius: 20,
            background: '#eee',
            color: '#555',
          }}>
            {ex}
          </span>
        ))}
      </div>
    </div>
  )
}

const MEMORY_TYPES: MemoryCardProps[] = [
  {
    icon: '📄',
    title: 'Markdown Docs',
    description: 'Plan files, scratch pads, architecture docs — persistent text the agent can read and write between turns.',
    examples: ['plan.md', 'CLAUDE.md', 'notes.md'],
  },
  {
    icon: '🗃️',
    title: 'Databases',
    description: 'Structured storage for todos, test cases, batch tracking. SQL gives the agent queryable, updatable state.',
    examples: ['SQLite', 'session DB', 'todos table'],
  },
  {
    icon: '📇',
    title: 'Indexes',
    description: 'Code search indexes, symbol tables, file listings — fast lookup structures that avoid loading everything into context.',
    examples: ['grep index', 'glob cache', 'LSP'],
  },
  {
    icon: '🧠',
    title: 'Agentic Memory',
    description: 'Facts the agent stores for future sessions — conventions, preferences, and patterns learned from past interactions.',
    examples: ['store_memory', 'session store', 'facts DB'],
  },
]

const footer: CSSProperties = {
  fontSize: 'clamp(15px, 1.8vw, 17px)',
  lineHeight: 1.7,
  color: '#666',
  maxWidth: 500,
  textAlign: 'center',
  fontStyle: 'italic',
  marginTop: 36,
}

export default function MemoryView() {
  return (
    <div style={page}>
      <span style={chapterLabel}>Chapter 15</span>
      <h2 style={heading}>Memory</h2>

      <p style={body}>
        The context window is ephemeral — it resets each session. To persist
        knowledge across sessions and beyond the token limit, agents use
        <strong> external memory</strong>.
      </p>

      <div style={grid}>
        {MEMORY_TYPES.map((m) => (
          <MemoryCard key={m.title} {...m} />
        ))}
      </div>

      <p style={footer}>
        Memory turns a stateless model into a system that learns and
        improves over time.
      </p>
    </div>
  )
}
