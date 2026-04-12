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

const fileBlock: CSSProperties = {
  width: '100%',
  maxWidth: 520,
  borderRadius: 16,
  overflow: 'hidden',
  border: '1.5px solid #e0e0e0',
  marginBottom: 32,
}

const fileHeader: CSSProperties = {
  background: '#111',
  color: '#fff',
  padding: '12px 20px',
  fontSize: '13px',
  fontWeight: 700,
  fontFamily: '"SF Mono", "Fira Code", monospace',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
}

const fileBody: CSSProperties = {
  background: '#1a1a1a',
  padding: '20px',
  fontSize: '13px',
  fontFamily: '"SF Mono", "Fira Code", monospace',
  lineHeight: 1.8,
  color: '#ccc',
  whiteSpace: 'pre-wrap',
}

const comment: CSSProperties = { color: '#6a9955' }
const keyword: CSSProperties = { color: '#569cd6' }

const principles: CSSProperties = {
  width: '100%',
  maxWidth: 520,
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
}

const principle: CSSProperties = {
  display: 'flex',
  gap: 14,
  alignItems: 'flex-start',
  padding: '16px 20px',
  borderRadius: 12,
  border: '1.5px solid #e0e0e0',
  background: '#fafafa',
}

const checkmark: CSSProperties = {
  color: '#22c55e',
  fontSize: '16px',
  flexShrink: 0,
  marginTop: 1,
}

const principleText: CSSProperties = {
  fontSize: '14px',
  lineHeight: 1.6,
  color: '#444',
}

export default function AgentsMdView() {
  return (
    <div style={page}>
      <span style={chapterLabel}>Chapter 13</span>
      <h2 style={heading}>AGENTS.md</h2>

      <p style={body}>
        Your project instruction file is the most persistent context the agent
        sees — loaded on every session. Keep it <strong>short</strong> and
        document only what's <strong>unique</strong> to your project.
      </p>

      <div style={fileBlock}>
        <div style={fileHeader}>
          <span>📄</span> AGENTS.md
        </div>
        <div style={fileBody}>
          <span style={comment}># Project conventions</span>{'\n'}
          {'\n'}
          <span style={keyword}>## Build</span>{'\n'}
          {'Run `npm run build` to compile.'}{'\n'}
          {'Run `npm test` to run tests.'}{'\n'}
          {'\n'}
          <span style={keyword}>## Style</span>{'\n'}
          {'Use single quotes. No semicolons.'}{'\n'}
          {'Prefer named exports over default.'}{'\n'}
          {'\n'}
          <span style={comment}>{'# ✗ Don\'t document general knowledge'}</span>{'\n'}
          <span style={comment}>{'# ✗ Don\'t paste entire style guides'}</span>{'\n'}
          <span style={comment}>{'# ✗ Don\'t include obvious patterns'}</span>
        </div>
      </div>

      <div style={principles}>
        <div style={principle}>
          <span style={checkmark}>✓</span>
          <span style={principleText}>
            <strong>Document what's unique</strong> — build commands, naming
            conventions, architectural decisions specific to this repo.
          </span>
        </div>
        <div style={principle}>
          <span style={checkmark}>✓</span>
          <span style={principleText}>
            <strong>Keep it under 100 lines</strong> — every line competes for
            attention with your actual task in the context window.
          </span>
        </div>
        <div style={principle}>
          <span style={checkmark}>✓</span>
          <span style={principleText}>
            <strong>Skip general knowledge</strong> — the model already knows
            TypeScript, React, and common patterns. Don't reteach it.
          </span>
        </div>
      </div>
    </div>
  )
}
