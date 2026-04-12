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
  maxWidth: 560,
  border: '1.5px solid #e0e0e0',
  borderRadius: 16,
  padding: '32px',
  background: '#fafafa',
}

const row: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 12,
  marginBottom: 24,
}

const box = (variant: 'model' | 'tool' | 'result'): CSSProperties => {
  const colors = {
    model: { bg: '#111', fg: '#fff', border: '#111' },
    tool: { bg: '#fff', fg: '#111', border: '#111' },
    result: { bg: '#f5f5f5', fg: '#555', border: '#ddd' },
  }
  const c = colors[variant]
  return {
    padding: '12px 20px',
    borderRadius: 10,
    fontSize: '14px',
    fontWeight: 600,
    background: c.bg,
    color: c.fg,
    border: `2px solid ${c.border}`,
  }
}

const arrow: CSSProperties = { fontSize: 18, color: '#bbb' }

const codeBlock: CSSProperties = {
  width: '100%',
  background: '#111',
  color: '#a8e6a3',
  borderRadius: 10,
  padding: '20px',
  fontSize: '13px',
  fontFamily: '"SF Mono", "Fira Code", monospace',
  lineHeight: 1.7,
  textAlign: 'left',
  whiteSpace: 'pre',
  overflowX: 'auto',
}

const EXAMPLE = `{
  "tool": "read_file",
  "arguments": {
    "path": "src/auth.ts"
  }
}

→ Returns file contents to the agent`

export default function ToolCallsView() {
  return (
    <div style={page}>
      <span style={chapterLabel}>Chapter 04</span>
      <h2 style={heading}>Tool Calls</h2>

      <p style={body}>
        Tools are how agents <strong>act on the world</strong>. Instead of just
        generating text, the model emits a structured tool call — the runtime
        executes it and feeds the result back as new context.
      </p>

      <div style={diagram}>
        <div style={row}>
          <span style={box('model')}>Model</span>
          <span style={arrow}>→</span>
          <span style={box('tool')}>Tool Call</span>
          <span style={arrow}>→</span>
          <span style={box('result')}>Result</span>
        </div>

        <div style={codeBlock}>{EXAMPLE}</div>
      </div>
    </div>
  )
}
