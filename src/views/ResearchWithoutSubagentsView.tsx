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

const GLOBAL_CSS = `/* global.css — 86 lines */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
}

body {
  font-family: 'Inter', sans-serif;
  background: #f9fafb;
  color: #111;
}

h1, h2, h3 { line-height: 1.2; }
a { color: #0969da; }
.container { max-width: 1200px; margin: 0 auto; }
.btn { padding: 8px 16px; border-radius: 6px; }
.btn-primary { background: #111; color: #fff; }
/* ... 68 more lines of resets & utilities ... */`

const UI_CSS = `/* ui.css — 124 lines */
.sidebar { width: 260px; border-right: 1px solid #eee; }
.header { height: 56px; border-bottom: 1px solid #eee; }
.card { border-radius: 12px; padding: 20px; }

.chart-container {
  padding: 24px;
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
}

.chart-title {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 16px;
}
/* ... 104 more lines ... */`

const SCRIPT: Message[] = [
  { role: 'user', label: 'User', text: 'Change styles for the chart component' },
  { role: 'assistant', label: 'Agent', text: 'Let me find the relevant CSS. I\'ll start with the global stylesheet.' },
  { role: 'assistant', label: 'Tool Call', text: '→ read_file("src/styles/global.css")' },
  { role: 'tool', label: 'Tool Result', text: GLOBAL_CSS },
  { role: 'assistant', label: 'Agent', text: 'No chart styles in global.css. Let me check ui.css.' },
  { role: 'assistant', label: 'Tool Call', text: '→ read_file("src/styles/ui.css")' },
  { role: 'tool', label: 'Tool Result', text: UI_CSS },
  { role: 'assistant', label: 'Agent', text: 'Found .chart-container in ui.css. Applying changes now.' },
  { role: 'assistant', label: 'Tool Call', text: '→ edit_file("src/styles/ui.css",\n    old: "border-radius: 16px",\n    new: "border-radius: 20px")' },
  { role: 'tool', label: 'Tool Result', text: '✓ src/styles/ui.css updated' },
]

const CONTEXT_LOG: ContextEntry[] = [
  { label: 'User Message', text: 'Change styles for the chart component', color: '#111' },
  { label: 'Assistant', text: 'Let me find the relevant CSS…', color: '#666' },
  { label: 'Tool Call', text: 'read_file("src/styles/global.css")', color: '#0969da' },
  { label: 'Tool Result — global.css (86 lines)', text: GLOBAL_CSS, color: '#2d6a2e' },
  { label: 'Assistant', text: 'No chart styles here. Let me check ui.css.', color: '#666' },
  { label: 'Tool Call', text: 'read_file("src/styles/ui.css")', color: '#0969da' },
  { label: 'Tool Result — ui.css (124 lines)', text: UI_CSS, color: '#2d6a2e' },
  { label: 'Assistant', text: 'Found .chart-container. Applying edit.', color: '#666' },
  { label: 'Tool Call', text: 'edit_file("src/styles/ui.css", …)', color: '#0969da' },
  { label: 'Tool Result', text: '✓ File updated', color: '#2d6a2e' },
]

/* ── Component ── */

export default function ResearchWithoutSubagentsView() {
  const [step, setStep] = useState(1)
  const messages = SCRIPT.slice(0, step)
  const contextEntries = CONTEXT_LOG.slice(0, step)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const contextEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    contextEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [step])

  return (
    <div style={page}>
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>

      <span style={chapterLabel}>Chapter 14</span>
      <h2 style={heading}>Research without Sub-Agents</h2>
      <p style={subtitle}>
        The agent searches files directly — every file it reads stays in the main context.
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
            <div ref={chatEndRef} />
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
            <span style={panelTitle}>Context</span>
            <span style={{ fontSize: '11px', color: '#aaa' }}>
              {contextEntries.length} sections
            </span>
          </div>

          <div style={contextBody}>
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
          Click <strong style={{ color: '#111' }}>Next Step →</strong> to walk through the agent's research process.
        </p>
      )}

      {step >= SCRIPT.length && (
        <div style={{
          marginTop: 24,
          padding: '16px 24px',
          background: '#fff5f5',
          border: '1.5px solid #fecaca',
          borderRadius: 12,
          maxWidth: 680,
          ...newEntry,
        }}>
          <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#991b1b', margin: 0, textAlign: 'center' }}>
            ⚠️ Both <code style={{ background: '#fee2e2', padding: '2px 6px', borderRadius: 4, fontSize: '13px', fontWeight: 600 }}>global.css</code> and{' '}
            <code style={{ background: '#fee2e2', padding: '2px 6px', borderRadius: 4, fontSize: '13px', fontWeight: 600 }}>ui.css</code> are
            now in the context — <strong>210 lines of CSS</strong> taking up token space, even though only the chart
            styles in ui.css were relevant.
          </p>
        </div>
      )}
    </div>
  )
}
