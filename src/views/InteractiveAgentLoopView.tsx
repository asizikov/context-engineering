import { useState, type CSSProperties } from 'react'

const page: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100dvh',
  padding: '60px 24px 120px',
  maxWidth: 800,
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
  fontSize: 'clamp(28px, 5vw, 48px)',
  fontWeight: 700,
  lineHeight: 1.1,
  letterSpacing: '-0.025em',
  color: '#111',
  margin: '0 0 20px',
  textAlign: 'center',
}

const subtitle: CSSProperties = {
  fontSize: 'clamp(15px, 1.8vw, 17px)',
  lineHeight: 1.7,
  color: '#666',
  maxWidth: 540,
  textAlign: 'center',
  margin: '0 0 36px',
}

const simContainer: CSSProperties = {
  width: '100%',
  maxWidth: 620,
  border: '1.5px solid #e0e0e0',
  borderRadius: 16,
  overflow: 'hidden',
  background: '#fafafa',
}

const simHeader: CSSProperties = {
  padding: '16px 24px',
  borderBottom: '1px solid #eee',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}

const simTitle: CSSProperties = {
  fontSize: '13px',
  fontWeight: 700,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '#555',
}

const msgList: CSSProperties = {
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  maxHeight: 420,
  overflowY: 'auto',
}

const bubble = (role: 'user' | 'assistant' | 'tool'): CSSProperties => {
  const styles = {
    user: { bg: '#111', fg: '#fff', align: 'flex-end' as const },
    assistant: { bg: '#fff', fg: '#111', align: 'flex-start' as const },
    tool: { bg: '#f0fdf0', fg: '#2d6a2e', align: 'flex-start' as const },
  }
  const s = styles[role]
  return {
    alignSelf: s.align,
    background: s.bg,
    color: s.fg,
    padding: '10px 16px',
    borderRadius: 12,
    fontSize: '13px',
    lineHeight: 1.6,
    fontFamily: role === 'tool' ? '"SF Mono", "Fira Code", monospace' : 'inherit',
    maxWidth: '85%',
    border: role === 'assistant' ? '1px solid #eee' : 'none',
  }
}

const roleTag: CSSProperties = {
  fontSize: '10px',
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  marginBottom: 4,
  opacity: 0.6,
}

const btnRow: CSSProperties = {
  padding: '16px 24px',
  borderTop: '1px solid #eee',
  display: 'flex',
  justifyContent: 'center',
  gap: 12,
}

const stepBtn = (primary: boolean): CSSProperties => ({
  padding: '10px 28px',
  borderRadius: 50,
  border: primary ? 'none' : '1.5px solid #ddd',
  background: primary ? '#111' : '#fff',
  color: primary ? '#fff' : '#555',
  fontSize: '14px',
  fontWeight: 600,
  fontFamily: 'inherit',
  cursor: 'pointer',
  transition: 'all 0.2s',
})

interface Message {
  role: 'user' | 'assistant' | 'tool'
  label: string
  text: string
}

const EXPRESSION = '(3 + 5) × 2 − 4'

const SCRIPT: Message[] = [
  { role: 'user', label: 'User', text: `Evaluate: ${EXPRESSION}` },
  { role: 'assistant', label: 'Agent', text: 'I need to evaluate (3 + 5) first. Let me use the add tool.' },
  { role: 'assistant', label: 'Tool Call', text: '→ add_subtract({ a: 3, b: 5, op: "add" })' },
  { role: 'tool', label: 'Tool Result', text: '{ "result": 8 }' },
  { role: 'assistant', label: 'Agent', text: 'Got 8. Now I need to multiply by 2.' },
  { role: 'assistant', label: 'Tool Call', text: '→ multiply_divide({ a: 8, b: 2, op: "multiply" })' },
  { role: 'tool', label: 'Tool Result', text: '{ "result": 16 }' },
  { role: 'assistant', label: 'Agent', text: 'Got 16. Now subtract 4.' },
  { role: 'assistant', label: 'Tool Call', text: '→ add_subtract({ a: 16, b: 4, op: "subtract" })' },
  { role: 'tool', label: 'Tool Result', text: '{ "result": 12 }' },
  { role: 'assistant', label: 'Agent', text: `The answer is 12.\n\n${EXPRESSION} = 12` },
]

export default function InteractiveAgentLoopView() {
  const [step, setStep] = useState(1)
  const messages = SCRIPT.slice(0, step)

  return (
    <div style={page}>
      <span style={chapterLabel}>Chapter 06</span>
      <h2 style={heading}>Agent Loop in Action</h2>
      <p style={subtitle}>
        Watch an agent that <strong>can't do math</strong> evaluate{' '}
        <code style={{ background: '#f3f3f3', padding: '2px 6px', borderRadius: 4, fontSize: '14px' }}>
          {EXPRESSION}
        </code>{' '}
        using only two tools: <em>add_subtract</em> and <em>multiply_divide</em>.
      </p>

      <div style={simContainer}>
        <div style={simHeader}>
          <span style={simTitle}>Agent Simulator</span>
          <span style={{ fontSize: '12px', color: '#aaa' }}>
            Step {step} / {SCRIPT.length}
          </span>
        </div>

        <div style={msgList}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: bubble(msg.role).alignSelf === 'flex-end' ? 'flex-end' : 'flex-start' }}>
              <div style={roleTag}>{msg.label}</div>
              <div style={bubble(msg.role)}>{msg.text}</div>
            </div>
          ))}
        </div>

        <div style={btnRow}>
          <button
            style={stepBtn(false)}
            onClick={() => setStep(1)}
            disabled={step <= 1}
          >
            Reset
          </button>
          <button
            style={stepBtn(true)}
            onClick={() => setStep((s) => Math.min(s + 1, SCRIPT.length))}
            disabled={step >= SCRIPT.length}
          >
            {step >= SCRIPT.length ? 'Done ✓' : 'Next Step →'}
          </button>
        </div>
      </div>
    </div>
  )
}
