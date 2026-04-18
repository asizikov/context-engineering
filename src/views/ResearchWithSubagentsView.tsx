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

const SCRIPT: Message[] = [
  { role: 'user', label: 'User', text: 'Change styles for the chart component' },
  { role: 'assistant', label: 'Agent', text: 'I\'ll spawn a research sub-agent to find the right CSS file.' },
  { role: 'assistant', label: 'Tool Call', text: '→ spawn_subagent("research",\n    "Find the CSS file and selector\n     for the chart component styles")' },
  { role: 'tool', label: 'Sub-Agent Result', text: '{\n  file: "src/styles/ui.css",\n  selector: ".chart-container",\n  line: 42\n}' },
  { role: 'assistant', label: 'Agent', text: 'Found it at ui.css line 42. Applying the style changes.' },
  { role: 'assistant', label: 'Tool Call', text: '→ edit_file("src/styles/ui.css",\n    old: "border-radius: 16px",\n    new: "border-radius: 20px")' },
  { role: 'tool', label: 'Tool Result', text: '✓ src/styles/ui.css updated' },
]

const CONTEXT_LOG: ContextEntry[] = [
  { label: 'User Message', text: 'Change styles for the chart component', color: '#111' },
  { label: 'Assistant', text: 'Spawning research sub-agent…', color: '#666' },
  { label: 'Tool Call', text: 'spawn_subagent("research", "Find chart CSS…")', color: '#0969da' },
  { label: 'Sub-Agent Result (3 lines)', text: '{ file: "src/styles/ui.css",\n  selector: ".chart-container", line: 42 }', color: '#7c3aed' },
  { label: 'Assistant', text: 'Found it. Applying edit.', color: '#666' },
  { label: 'Tool Call', text: 'edit_file("src/styles/ui.css", …)', color: '#0969da' },
  { label: 'Tool Result', text: '✓ File updated', color: '#2d6a2e' },
]

const subAgentTrace: CSSProperties = {
  padding: '10px 16px',
  borderBottom: '1px solid #f0f0f0',
  background: '#faf5ff',
}

/* ── Component ── */

export default function ResearchWithSubagentsView() {
  const [step, setStep] = useState(1)
  const messages = SCRIPT.slice(0, step)
  const contextEntries = CONTEXT_LOG.slice(0, step)
  const showSubAgentTrace = step >= 3
  const chatEndRef = useRef<HTMLDivElement>(null)
  const contextEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    contextEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [step])

  return (
    <div style={page} className="chapter-page chapter-page--wide">
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>

      <span style={chapterLabel}>Chapter 15</span>
      <h2 style={heading}>Research with Sub-Agents</h2>
      <p style={subtitle}>
        Same task — but now a sub-agent handles the research in its <strong>own</strong> context.
      </p>

      <div style={splitLayout} className="chapter-split">
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
            {/* Sub-agent trace (shown as a separate collapsed area) */}
            {showSubAgentTrace && (
              <div style={{ ...subAgentTrace, ...(step === 3 ? newEntry : {}) }}>
                <div style={{ ...sectionLabel, color: '#7c3aed' }}>
                  🔍 Sub-Agent Context (separate window)
                </div>
                <div style={{
                  fontSize: '10px',
                  color: '#7c3aed',
                  opacity: 0.7,
                  padding: '6px 10px',
                  background: '#f3eeff',
                  borderRadius: 6,
                  border: '1px dashed #d8b4fe',
                  fontFamily: '"SF Mono", "Fira Code", monospace',
                }}>
                  read_file("global.css") → no match{'\n'}
                  read_file("ui.css") → found .chart-container{'\n'}
                  <span style={{ opacity: 0.5 }}>↳ context discarded after return</span>
                </div>
              </div>
            )}

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
          Click <strong style={{ color: '#111' }}>Next Step →</strong> to see how sub-agents keep the main context lean.
        </p>
      )}

      {step >= SCRIPT.length && (
        <div style={{
          marginTop: 24,
          padding: '16px 24px',
          background: '#f0fdf4',
          border: '1.5px solid #bbf7d0',
          borderRadius: 12,
          maxWidth: 680,
          ...newEntry,
        }}>
          <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#166534', margin: 0, textAlign: 'center' }}>
            ✅ Only the <strong>relevant result</strong> (file path + selector) stays in the main context.
            The sub-agent's research — reading global.css, scanning ui.css — happened in a
            separate context window that was <strong>discarded</strong> after returning. No wasted tokens.
          </p>
        </div>
      )}
    </div>
  )
}
