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

interface TipProps {
  number: string
  title: string
  description: string
}

function Tip({ number, title, description }: TipProps) {
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

const TIPS: TipProps[] = [
  {
    number: '01',
    title: 'Keep Tasks Small & Scoped',
    description: 'Break work into focused chunks. Smaller tasks mean smaller context, which means higher quality output from the agent.',
  },
  {
    number: '02',
    title: 'Engineer Your Instruction Files',
    description: 'CLAUDE.md, AGENTS.md, .cursorrules — these project-level prompts are your highest-leverage context. Invest in making them precise.',
  },
  {
    number: '03',
    title: 'Use Different Modes',
    description: 'Plan mode, code review mode, exploration mode — scoping the agent\'s task type helps it load only the relevant context.',
  },
]

export default function UserTechniquesView() {
  return (
    <div style={page}>
      <span style={chapterLabel}>Chapter 13</span>
      <h2 style={heading}>Your Techniques</h2>
      <p style={subtitle}>What you can do as the human in the loop</p>

      <p style={body}>
        The harness handles the runtime, but <strong>you</strong> control the
        inputs. These practices shape what context the agent sees before the
        first token is generated.
      </p>

      <div style={list}>
        {TIPS.map((tip) => (
          <Tip key={tip.number} {...tip} />
        ))}
      </div>
    </div>
  )
}
