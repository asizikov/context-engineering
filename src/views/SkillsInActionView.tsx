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

/* ── Right: Content panel ── */

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

/* ── Skill card styles ── */

const skillCard = (active: boolean): CSSProperties => ({
  padding: '10px 14px',
  borderRadius: 10,
  border: active ? '1.5px solid #0969da' : '1.5px solid #e0e0e0',
  background: active ? '#f0f7ff' : '#fff',
  marginBottom: 8,
  transition: 'all 0.3s ease',
  boxShadow: active ? '0 0 0 3px rgba(9,105,218,0.1)' : 'none',
})

const skillName: CSSProperties = {
  fontSize: '12px',
  fontWeight: 700,
  color: '#111',
  marginBottom: 2,
  fontFamily: 'inherit',
}

const skillDesc: CSSProperties = {
  fontSize: '10px',
  color: '#888',
  fontFamily: 'inherit',
}

/* ── Data ── */

interface Message {
  role: 'user' | 'assistant' | 'tool'
  label: string
  text: string
}

type RightPanelState = 'skills' | 'skill-loading' | 'skill-loaded' | 'terminal' | 'terminal-done'

interface StepConfig {
  rightState: RightPanelState
  activeSkill: string | null
}

const SCRIPT: Message[] = [
  { role: 'user', label: 'User', text: 'Create a pull request' },
  { role: 'assistant', label: 'Agent', text: 'I\'ll use the create-pull-request skill for this. Let me load it first.' },
  { role: 'assistant', label: 'Tool Call', text: '→ load_skill("create-pull-request")' },
  { role: 'tool', label: 'Tool Result', text: '✓ Loaded SKILL.md into context (1.2 KB)' },
  { role: 'assistant', label: 'Agent', text: 'Skill loaded. I can see the steps. Let me create the PR using the gh CLI.' },
  { role: 'assistant', label: 'Tool Call', text: '→ run_in_terminal("gh pr create \\\n    --title \'Add context management\' \\\n    --body \'Implements skill-based workflow\'")' },
  { role: 'tool', label: 'Tool Result', text: 'https://github.com/owner/repo/pull/42\n\n✓ Pull request #42 created successfully' },
  { role: 'assistant', label: 'Agent', text: 'Done! I\'ve created PR #42 for you.' },
]

const SKILL_MD_CONTENT = `# create-pull-request

## Description
Create a GitHub pull request from the
current branch.

## Steps
1. Check current branch is not main
2. Ensure all changes are committed
3. Push branch to remote
4. Run: gh pr create --title <title>
   --body <description>
5. Return the PR URL to the user

## Required Tools
- run_in_terminal
- read_file`

const STEP_CONFIG: StepConfig[] = [
  { rightState: 'skills', activeSkill: null },                        // 1: User asks
  { rightState: 'skills', activeSkill: 'create-pull-request' },       // 2: Agent decides
  { rightState: 'skill-loading', activeSkill: 'create-pull-request' },// 3: Tool call
  { rightState: 'skill-loaded', activeSkill: 'create-pull-request' }, // 4: SKILL.md loaded
  { rightState: 'skill-loaded', activeSkill: 'create-pull-request' }, // 5: Agent reads skill
  { rightState: 'terminal', activeSkill: 'create-pull-request' },     // 6: Terminal call
  { rightState: 'terminal-done', activeSkill: 'create-pull-request' },// 7: Terminal result
  { rightState: 'terminal-done', activeSkill: 'create-pull-request' },// 8: Done
]

/* ── Component ── */

export default function SkillsInActionView() {
  const [step, setStep] = useState(1)
  const messages = SCRIPT.slice(0, step)
  const config = STEP_CONFIG[step - 1]
  const chatEndRef = useRef<HTMLDivElement>(null)
  const contextEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    contextEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [step])

  const showSkillMd = config.rightState === 'skill-loaded'
    || config.rightState === 'terminal'
    || config.rightState === 'terminal-done'

  const showTerminal = config.rightState === 'terminal' || config.rightState === 'terminal-done'
  const terminalDone = config.rightState === 'terminal-done'

  return (
    <div style={page}>
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>

      <span style={chapterLabel}>Chapter 22</span>
      <h2 style={heading}>Skills in Action</h2>
      <p style={subtitle}>
        Skills are <strong>on-demand instructions</strong> loaded into context only when needed
        — the model decides which skill to invoke and the <code style={{ background: '#f3f3f3', padding: '2px 6px', borderRadius: 4, fontSize: '14px' }}>SKILL.md</code> tells it exactly what to do.
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

        {/* Right: Skills & Context */}
        <div style={panelStyle}>
          <div style={panelHeader('#f8f8f8')}>
            <span style={panelTitle}>Context</span>
            <span style={{ fontSize: '11px', color: '#aaa' }}>
              {showSkillMd ? 'SKILL.md loaded' : '2 skills'}
            </span>
          </div>

          <div style={contextBody}>
            {/* Skills list */}
            <div style={contextSection}>
              <div style={sectionLabel}>Registered Skills</div>
              <div style={skillCard(config.activeSkill === 'create-new-ui-component')}>
                <div style={skillName}>🧩 create-new-ui-component</div>
                <div style={skillDesc}>Scaffold a new React component with tests</div>
              </div>
              <div style={skillCard(config.activeSkill === 'create-pull-request')}>
                <div style={skillName}>🚀 create-pull-request</div>
                <div style={skillDesc}>Create a GitHub PR from the current branch</div>
              </div>
            </div>

            {/* SKILL.md content */}
            {showSkillMd && (
              <div style={{ ...contextSection, ...(config.rightState === 'skill-loaded' && step === 4 ? newEntry : {}) }}>
                <div style={sectionLabel}>
                  <span style={{ color: '#0969da' }}>📄 SKILL.md</span> — create-pull-request
                </div>
                <div style={{ ...contextText, color: '#333' }}>{SKILL_MD_CONTENT}</div>
              </div>
            )}

            {/* Loading indicator */}
            {config.rightState === 'skill-loading' && (
              <div style={{ ...contextSection, ...newEntry }}>
                <div style={sectionLabel}>Loading Skill…</div>
                <div style={{ ...contextText, color: '#0969da', fontStyle: 'italic' }}>
                  Reading SKILL.md into context…
                </div>
              </div>
            )}

            {/* Terminal output */}
            {showTerminal && (
              <div style={{
                ...contextSection,
                borderBottom: 'none',
                ...(config.rightState === 'terminal' && step === 6 ? newEntry : {}),
              }}>
                <div style={sectionLabel}>Terminal Output</div>
                <div style={{
                  background: '#1e1e1e',
                  color: '#d4d4d4',
                  padding: '10px 14px',
                  borderRadius: 8,
                  fontSize: '11px',
                  fontFamily: '"SF Mono", "Fira Code", monospace',
                  lineHeight: 1.6,
                  whiteSpace: 'pre-wrap',
                }}>
                  <span style={{ color: '#6a9955' }}>$</span>{' '}
                  <span style={{ color: '#dcdcaa' }}>gh pr create</span>{' '}
                  <span style={{ color: '#ce9178' }}>--title 'Add context management'</span>{'\n'}
                  {terminalDone ? (
                    <>
                      <span style={{ color: '#6a9955' }}>
                        {'Creating pull request for '}
                        <span style={{ color: '#569cd6' }}>feature/context</span>
                        {' into '}
                        <span style={{ color: '#569cd6' }}>main</span>
                      </span>{'\n'}
                      <span style={{ color: '#dcdcaa' }}>
                        https://github.com/owner/repo/pull/42
                      </span>{'\n'}
                      <span style={{ color: '#6a9955' }}>✓ Pull request #42 created</span>
                    </>
                  ) : (
                    <span style={{ color: '#888', fontStyle: 'italic' }}>Running…</span>
                  )}
                </div>
              </div>
            )}

            <div ref={contextEndRef} />
          </div>
        </div>
      </div>

      {/* Hint text */}
      {step === 1 && (
        <p style={{ marginTop: 16, fontSize: '13px', color: '#999', textAlign: 'center' }}>
          Click <strong style={{ color: '#111' }}>Next Step →</strong> to see how a skill is loaded into context on demand.
        </p>
      )}

      {/* Post-completion note */}
      {step >= SCRIPT.length && (
        <div style={{
          marginTop: 24,
          padding: '16px 24px',
          background: '#f0f7ff',
          border: '1.5px solid #c8ddf5',
          borderRadius: 12,
          maxWidth: 680,
          ...newEntry,
        }}>
          <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#333', margin: 0, textAlign: 'center' }}>
            The <code style={{ background: '#e1ecf7', padding: '2px 6px', borderRadius: 4, fontSize: '13px', fontWeight: 600 }}>SKILL.md</code> content
            is now part of the context — the model knows <em>exactly</em> which tools to call and in what order.
            Skills keep the base context lean and load expertise only when it's needed.
          </p>
        </div>
      )}
    </div>
  )
}
