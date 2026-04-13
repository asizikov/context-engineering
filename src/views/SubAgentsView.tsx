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

const diagramWrap: CSSProperties = {
  width: '100%',
  maxWidth: 560,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 12,
  marginBottom: 40,
}

const mainBox: CSSProperties = {
  width: '100%',
  padding: '22px 28px',
  border: '2px solid #111',
  borderRadius: 14,
  background: '#fff',
  textAlign: 'center',
}

const mainLabel: CSSProperties = {
  fontSize: '14px',
  fontWeight: 700,
  color: '#111',
  marginBottom: 4,
}

const mainDesc: CSSProperties = {
  fontSize: '12px',
  color: '#888',
}

const arrow: CSSProperties = {
  fontSize: '20px',
  color: '#ccc',
  lineHeight: 1,
}

const subRow: CSSProperties = {
  display: 'flex',
  gap: 12,
  width: '100%',
}

const subBox: CSSProperties = {
  flex: 1,
  padding: '16px 14px',
  border: '1.5px dashed #c0c0c0',
  borderRadius: 12,
  background: '#f8f8ff',
  textAlign: 'center',
}

const subLabel: CSSProperties = {
  fontSize: '12px',
  fontWeight: 700,
  color: '#555',
  marginBottom: 2,
}

const subDesc: CSSProperties = {
  fontSize: '10px',
  color: '#999',
  lineHeight: 1.4,
}

const pointsList: CSSProperties = {
  width: '100%',
  maxWidth: 520,
  display: 'flex',
  flexDirection: 'column',
  gap: 14,
}

const pointCard: CSSProperties = {
  display: 'flex',
  gap: 16,
  alignItems: 'flex-start',
  padding: '18px 22px',
  border: '1.5px solid #e0e0e0',
  borderRadius: 14,
  background: '#fafafa',
}

const pointIcon: CSSProperties = {
  fontSize: '22px',
  flexShrink: 0,
  width: 32,
  textAlign: 'center',
  lineHeight: 1,
}

const pointTitle: CSSProperties = {
  fontSize: '15px',
  fontWeight: 700,
  color: '#111',
  marginBottom: 4,
}

const pointDesc: CSSProperties = {
  fontSize: '13px',
  lineHeight: 1.6,
  color: '#777',
}

const hint: CSSProperties = {
  marginTop: 40,
  fontSize: '14px',
  color: '#999',
  textAlign: 'center',
}

export default function SubAgentsView() {
  return (
    <div style={page}>
      <span style={chapterLabel}>Chapter 13</span>
      <h2 style={heading}>Sub-Agents</h2>
      <p style={subtitle}>Isolated context for focused work</p>

      <p style={body}>
        Sub-agents are <strong>lightweight agents</strong> that spin up with their own
        context window. They do focused work — research, exploration, code review — and
        return only the result to the main agent, keeping the primary context clean.
      </p>

      {/* Diagram */}
      <div style={diagramWrap}>
        <div style={mainBox}>
          <div style={mainLabel}>🧠 Main Agent Context</div>
          <div style={mainDesc}>Your conversation + task state</div>
        </div>
        <div style={arrow}>↕</div>
        <div style={subRow}>
          <div style={subBox}>
            <div style={subLabel}>🔍 Research Agent</div>
            <div style={subDesc}>Own context window</div>
          </div>
          <div style={subBox}>
            <div style={subLabel}>🧪 Test Agent</div>
            <div style={subDesc}>Own context window</div>
          </div>
          <div style={subBox}>
            <div style={subLabel}>📝 Review Agent</div>
            <div style={subDesc}>Own context window</div>
          </div>
        </div>
      </div>

      <div style={pointsList}>
        <div style={pointCard}>
          <span style={pointIcon}>🧹</span>
          <div>
            <div style={pointTitle}>Clean Main Context</div>
            <div style={pointDesc}>
              Research dead-ends, irrelevant files, and exploratory searches stay in the
              sub-agent's context — they never pollute your main conversation.
            </div>
          </div>
        </div>

        <div style={pointCard}>
          <span style={pointIcon}>📦</span>
          <div>
            <div style={pointTitle}>Only Results Come Back</div>
            <div style={pointDesc}>
              The sub-agent returns a concise answer — a file path, a code snippet, a
              verdict — not the full trace of how it got there.
            </div>
          </div>
        </div>

        <div style={pointCard}>
          <span style={pointIcon}>♻️</span>
          <div>
            <div style={pointTitle}>Context Is Disposable</div>
            <div style={pointDesc}>
              Once the sub-agent finishes, its context window is discarded. No lingering
              tokens, no compaction needed.
            </div>
          </div>
        </div>
      </div>

      <p style={hint}>
        Click <strong style={{ color: '#111' }}>Next →</strong> to see the difference in action.
      </p>
    </div>
  )
}
