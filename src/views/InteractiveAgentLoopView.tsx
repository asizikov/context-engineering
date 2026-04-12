import { useState, useEffect, useRef, type CSSProperties } from 'react'

/* ── Layout ── */

const page: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100dvh',
  padding: '60px 24px 120px',
  maxWidth: 1100,
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
  maxWidth: 600,
  textAlign: 'center',
  margin: '0 0 32px',
}

const splitLayout: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 16,
  width: '100%',
}

/* ── Shared panel styles ── */

const panelStyle: CSSProperties = {
  border: '1.5px solid #e0e0e0',
  borderRadius: 16,
  overflow: 'hidden',
  background: '#fafafa',
  display: 'flex',
  flexDirection: 'column',
}

const panelHeader = (bg: string): CSSProperties => ({
  padding: '12px 20px',
  borderBottom: '1px solid #eee',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: bg,
})

const panelTitle: CSSProperties = {
  fontSize: '12px',
  fontWeight: 700,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '#555',
}

/* ── Left: Conversation ── */

const msgList: CSSProperties = {
  padding: '14px',
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  overflowY: 'auto',
  flex: 1,
  maxHeight: 460,
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
    padding: '8px 14px',
    borderRadius: 10,
    fontSize: '12px',
    lineHeight: 1.55,
    fontFamily: role === 'tool' ? '"SF Mono", "Fira Code", monospace' : 'inherit',
    maxWidth: '90%',
    border: role === 'assistant' ? '1px solid #eee' : 'none',
  }
}

const roleTag: CSSProperties = {
  fontSize: '9px',
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  marginBottom: 3,
  opacity: 0.5,
}

const btnRow: CSSProperties = {
  padding: '12px 20px',
  borderTop: '1px solid #eee',
  display: 'flex',
  justifyContent: 'center',
  gap: 10,
}

const stepBtn = (primary: boolean): CSSProperties => ({
  padding: '8px 22px',
  borderRadius: 50,
  border: primary ? 'none' : '1.5px solid #ddd',
  background: primary ? '#111' : '#fff',
  color: primary ? '#fff' : '#555',
  fontSize: '13px',
  fontWeight: 600,
  fontFamily: 'inherit',
  cursor: 'pointer',
  transition: 'all 0.2s',
})

/* ── Right: Context window ── */

const contextBody: CSSProperties = {
  padding: '0',
  overflowY: 'auto',
  flex: 1,
  maxHeight: 460,
  fontSize: '11px',
  fontFamily: '"SF Mono", "Fira Code", monospace',
  lineHeight: 1.65,
}

const contextSection: CSSProperties = {
  padding: '10px 16px',
  borderBottom: '1px solid #f0f0f0',
}

const sectionLabel: CSSProperties = {
  fontSize: '9px',
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#aaa',
  marginBottom: 6,
}

const contextText: CSSProperties = {
  color: '#555',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
}

const newEntry: CSSProperties = {
  animation: 'fadeIn 0.4s ease-out',
}

/* ── Data ── */

interface Message {
  role: 'user' | 'assistant' | 'tool'
  label: string
  text: string
}

interface ContextEntry {
  label: string
  text: string
  color: string
}

const EXPRESSION = '(3 + 5) × 2 − 4'

const SYSTEM_PROMPT = `You are an AI agent. You cannot perform
math operations yourself. You MUST use the
provided tools for all calculations.`

const TOOLS_DOC = `add_subtract(a, b, op)
  Performs addition or subtraction.
  op: "add" | "subtract"
  Returns: { result: number }

multiply_divide(a, b, op)
  Performs multiplication or division.
  op: "multiply" | "divide"
  Returns: { result: number }`

const SCRIPT: Message[] = [
  { role: 'user', label: 'User', text: `Evaluate: ${EXPRESSION}` },
  { role: 'assistant', label: 'Agent', text: 'I need to evaluate (3 + 5) first.' },
  { role: 'assistant', label: 'Tool Call', text: '→ add_subtract({ a: 3, b: 5, op: "add" })' },
  { role: 'tool', label: 'Tool Result', text: '{ "result": 8 }' },
  { role: 'assistant', label: 'Agent', text: 'Got 8. Now multiply by 2.' },
  { role: 'assistant', label: 'Tool Call', text: '→ multiply_divide({ a: 8, b: 2, op: "multiply" })' },
  { role: 'tool', label: 'Tool Result', text: '{ "result": 16 }' },
  { role: 'assistant', label: 'Agent', text: 'Got 16. Now subtract 4.' },
  { role: 'assistant', label: 'Tool Call', text: '→ add_subtract({ a: 16, b: 4, op: "subtract" })' },
  { role: 'tool', label: 'Tool Result', text: '{ "result": 12 }' },
  { role: 'assistant', label: 'Agent', text: `The answer is 12.\n${EXPRESSION} = 12` },
]

const CONTEXT_LOG: ContextEntry[] = [
  { label: 'User Message', text: `Evaluate: ${EXPRESSION}`, color: '#111' },
  { label: 'Assistant', text: 'I need to evaluate (3 + 5) first.', color: '#666' },
  { label: 'Tool Call', text: 'add_subtract({ a: 3, b: 5, op: "add" })', color: '#0969da' },
  { label: 'Tool Result', text: '{ "result": 8 }', color: '#2d6a2e' },
  { label: 'Assistant', text: 'Got 8. Now multiply by 2.', color: '#666' },
  { label: 'Tool Call', text: 'multiply_divide({ a: 8, b: 2, op: "multiply" })', color: '#0969da' },
  { label: 'Tool Result', text: '{ "result": 16 }', color: '#2d6a2e' },
  { label: 'Assistant', text: 'Got 16. Now subtract 4.', color: '#666' },
  { label: 'Tool Call', text: 'add_subtract({ a: 16, b: 4, op: "subtract" })', color: '#0969da' },
  { label: 'Tool Result', text: '{ "result": 12 }', color: '#2d6a2e' },
  { label: 'Assistant', text: `The answer is 12.\n${EXPRESSION} = 12`, color: '#666' },
]

export default function InteractiveAgentLoopView() {
  const [step, setStep] = useState(1)
  const messages = SCRIPT.slice(0, step)
  const contextEntries = CONTEXT_LOG.slice(0, step)
  const contextEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    contextEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [step])

  return (
    <div style={page}>
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>

      <span style={chapterLabel}>Chapter 06</span>
      <h2 style={heading}>Agent Loop in Action</h2>
      <p style={subtitle}>
        Watch an agent that <strong>can't do math</strong> evaluate{' '}
        <code style={{ background: '#f3f3f3', padding: '2px 6px', borderRadius: 4, fontSize: '14px' }}>
          {EXPRESSION}
        </code>{' '}
        — conversation on the left, growing context window on the right.
      </p>

      <div style={splitLayout}>
        {/* Left: Conversation */}
        <div style={panelStyle}>
          <div style={panelHeader('#fff')}>
            <span style={panelTitle}>Conversation</span>
            <span style={{ fontSize: '11px', color: '#aaa' }}>
              Step {step} / {SCRIPT.length}
            </span>
          </div>

          <div style={msgList}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: bubble(msg.role).alignSelf === 'flex-end' ? 'flex-end' : 'flex-start',
                  ...(i === step - 1 ? newEntry : {}),
                }}
              >
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

        {/* Right: Context Window */}
        <div style={panelStyle}>
          <div style={panelHeader('#f8f8f8')}>
            <span style={panelTitle}>Context Window</span>
            <span style={{ fontSize: '11px', color: '#aaa' }}>
              {contextEntries.length + 2} sections
            </span>
          </div>

          <div style={contextBody}>
            <div style={contextSection}>
              <div style={sectionLabel}>System Prompt</div>
              <div style={contextText}>{SYSTEM_PROMPT}</div>
            </div>

            <div style={contextSection}>
              <div style={sectionLabel}>Tools</div>
              <div style={contextText}>{TOOLS_DOC}</div>
            </div>

            <div style={{ ...contextSection, borderBottom: 'none' }}>
              <div style={sectionLabel}>Conversation Log</div>
              {contextEntries.length === 0 && (
                <div style={{ ...contextText, color: '#ccc', fontStyle: 'italic' }}>
                  Waiting for first message…
                </div>
              )}
              {contextEntries.map((entry, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom: 8,
                    paddingLeft: 8,
                    borderLeft: `2px solid ${entry.color}`,
                    ...(i === contextEntries.length - 1 ? newEntry : {}),
                  }}
                >
                  <div style={{ fontSize: '9px', fontWeight: 700, color: entry.color, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    {entry.label}
                  </div>
                  <div style={contextText}>{entry.text}</div>
                </div>
              ))}
              <div ref={contextEndRef} />
            </div>
          </div>
        </div>
      </div>

      {step === 1 && (
        <p style={{ marginTop: 16, fontSize: '13px', color: '#999', textAlign: 'center' }}>
          Click <strong style={{ color: '#111' }}>Next Step →</strong> to see how each interaction is reflected in the context window.
        </p>
      )}
    </div>
  )
}
