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
  margin: '0 0 24px',
  fontWeight: 400,
}

const callout: CSSProperties = {
  width: '100%',
  maxWidth: 520,
  padding: '20px 24px',
  borderRadius: 12,
  background: '#fdf2f2',
  border: '1.5px solid #e8b4b4',
  marginBottom: 40,
}

const calloutTitle: CSSProperties = {
  fontSize: '14px',
  fontWeight: 700,
  color: '#111',
  marginBottom: 6,
}

const calloutBody: CSSProperties = {
  fontSize: '14px',
  lineHeight: 1.65,
  color: '#666',
}

/* ── diagram styles ── */

const diagram: CSSProperties = {
  width: '100%',
  maxWidth: 560,
  border: '1.5px solid #e0e0e0',
  borderRadius: 16,
  padding: '36px 28px 28px',
  background: '#fafafa',
  position: 'relative',
}

const timeline: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 0,
  position: 'relative',
}

const nodeRow: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 14,
  position: 'relative',
  paddingLeft: 28,
  minHeight: 48,
}

const rail: CSSProperties = {
  position: 'absolute',
  left: 11,
  top: 0,
  bottom: 0,
  width: 2,
  background: '#ddd',
}

const dot = (color: string, size = 12): CSSProperties => ({
  width: size,
  height: size,
  borderRadius: '50%',
  background: color,
  border: `2px solid ${color}`,
  flexShrink: 0,
  position: 'relative',
  zIndex: 1,
})

const nodeLabel: CSSProperties = {
  fontSize: '13px',
  fontWeight: 600,
  color: '#555',
}

const nodeSublabel: CSSProperties = {
  fontSize: '12px',
  color: '#999',
  marginLeft: 6,
}

const branchContainer: CSSProperties = {
  marginLeft: 28,
  paddingLeft: 32,
  borderLeft: '2px dashed #4caf50',
  position: 'relative',
}

const branchLabel: CSSProperties = {
  position: 'absolute',
  left: -62,
  top: 8,
  fontSize: '11px',
  fontWeight: 700,
  color: '#4caf50',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  transform: 'rotate(-90deg)',
  transformOrigin: 'center center',
}

const branchNode: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 14,
  minHeight: 44,
}

const branchDot: CSSProperties = {
  ...dot('#4caf50', 10),
}

const branchText: CSSProperties = {
  fontSize: '13px',
  fontWeight: 600,
  color: '#4caf50',
}

const strikeLabel: CSSProperties = {
  fontSize: '13px',
  fontWeight: 600,
  color: '#c62828',
  textDecoration: 'line-through',
}

const caption: CSSProperties = {
  fontSize: '13px',
  color: '#999',
  textAlign: 'center',
  marginTop: 24,
  lineHeight: 1.6,
}

export default function CorrectingMistakesView() {
  return (
    <div style={page}>
      <span style={chapterLabel}>Chapter 09</span>
      <h2 style={heading}>Correcting Agent Mistakes</h2>

      <p style={body}>
        When an agent takes a wrong turn, your instinct may be to
        correct it mid‑session — "no, try it differently." But the
        <strong> wrong assumptions stay in the context</strong>.
        Every subsequent response is now influenced by that mistake.
      </p>

      <div style={callout}>
        <div style={calloutTitle}>🚫 Don't steer — roll back</div>
        <div style={calloutBody}>
          Telling the agent to try again doesn't erase what it already saw.
          The incorrect reasoning, failed tool calls, and bad assumptions
          remain in the context window, blurring focus and biasing future
          output. Instead, use the <strong>checkpoint system</strong> your
          harness provides — step back to a known‑good state and branch off
          with a fresh prompt.
        </div>
      </div>

      <p style={body}>
        Modern harnesses create <strong>checkpoints</strong> at key moments.
        Rolling back to one gives the model a clean context — no ghosts of
        wrong attempts lingering in the window.
      </p>

      {/* ── Branch-off diagram ── */}
      <div style={diagram}>
        <div style={timeline}>
          <div style={rail} />

          <div style={nodeRow}>
            <div style={dot('#111')} />
            <span style={nodeLabel}>Turn 1</span>
            <span style={nodeSublabel}>User prompt</span>
          </div>

          <div style={nodeRow}>
            <div style={dot('#111')} />
            <span style={nodeLabel}>Turn 2</span>
            <span style={nodeSublabel}>Agent plans approach</span>
          </div>

          <div style={nodeRow}>
            <div style={dot('#111')} />
            <span style={nodeLabel}>
              Turn 3 — <span style={{ color: '#4caf50', fontWeight: 700 }}>checkpoint ✓</span>
            </span>
          </div>

          {/* Mistake branch (faded) */}
          <div style={nodeRow}>
            <div style={dot('#c62828')} />
            <span style={strikeLabel}>Turn 4 — wrong approach</span>
          </div>
          <div style={{ ...nodeRow, opacity: 0.35 }}>
            <div style={dot('#c62828', 8)} />
            <span style={strikeLabel}>Turn 5 — deeper into mistake…</span>
          </div>

          {/* Branch-off */}
          <div style={branchContainer}>
            <span style={branchLabel}>branch</span>
            <div style={branchNode}>
              <div style={branchDot} />
              <span style={branchText}>Turn 4′ — fresh prompt, clean context</span>
            </div>
            <div style={branchNode}>
              <div style={branchDot} />
              <span style={branchText}>Turn 5′ — correct path continues</span>
            </div>
          </div>
        </div>

        <p style={caption}>
          Roll back to the checkpoint and branch off —<br />
          the mistake never enters the new context.
        </p>
      </div>
    </div>
  )
}
