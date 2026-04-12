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
  margin: '0 0 16px',
  textAlign: 'center',
}

const subtitle: CSSProperties = {
  fontSize: '15px',
  color: '#888',
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

const list: CSSProperties = {
  width: '100%',
  maxWidth: 520,
  display: 'flex',
  flexDirection: 'column',
  gap: 14,
}

interface TechniqueCardProps {
  number: string
  title: string
  description: string
}

function TechniqueCard({ number, title, description }: TechniqueCardProps) {
  return (
    <div style={{
      display: 'flex',
      gap: 18,
      alignItems: 'flex-start',
      padding: '20px 24px',
      border: '1.5px solid #e0e0e0',
      borderRadius: 14,
      background: '#fafafa',
    }}>
      <span style={{
        fontSize: '24px',
        fontWeight: 800,
        color: '#ddd',
        lineHeight: 1,
        flexShrink: 0,
        width: 32,
        textAlign: 'center',
      }}>
        {number}
      </span>
      <div>
        <div style={{ fontSize: '15px', fontWeight: 700, color: '#111', marginBottom: 4 }}>
          {title}
        </div>
        <div style={{ fontSize: '13px', lineHeight: 1.6, color: '#777' }}>
          {description}
        </div>
      </div>
    </div>
  )
}

const TECHNIQUES: TechniqueCardProps[] = [
  {
    number: '01',
    title: 'Auto-Compaction',
    description: 'The harness summarizes earlier turns automatically when the context window fills up, preserving key facts.',
  },
  {
    number: '02',
    title: 'Discovery Tools',
    description: 'grep, glob, file search — the agent explores your codebase on demand instead of loading everything upfront.',
  },
  {
    number: '03',
    title: 'Sub-Agentic Calls',
    description: 'Spawning lightweight sub-agents for focused tasks keeps the main context clean and scoped.',
  },
  {
    number: '04',
    title: 'Progressive Loading',
    description: 'Context is loaded incrementally — files, docs, and data are fetched only when the agent actually needs them.',
  },
  {
    number: '05',
    title: 'Planning',
    description: 'Writing plans to files or databases externalizes reasoning, freeing tokens while preserving structure.',
  },
]

export default function HarnessTechniquesView() {
  return (
    <div style={page}>
      <span style={chapterLabel}>Chapter 11</span>
      <h2 style={heading}>Harness Techniques</h2>
      <p style={subtitle}>What the agent runtime does for you</p>

      <p style={body}>
        Modern agent harnesses employ several strategies to manage context
        automatically — so the model stays focused even during long, complex
        tasks.
      </p>

      <div style={list}>
        {TECHNIQUES.map((t) => (
          <TechniqueCard key={t.title} {...t} />
        ))}
      </div>
    </div>
  )
}
