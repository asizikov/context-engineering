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
  padding: '32px 24px 24px',
  background: '#fafafa',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}

const nodeRow: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
}

const dot = (color: string, size = 12): CSSProperties => ({
  width: size,
  height: size,
  borderRadius: '50%',
  background: color,
  border: `2px solid ${color}`,
  flexShrink: 0,
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

const vLine = (color = '#ccc', h = 20): CSSProperties => ({
  width: 2,
  height: h,
  background: color,
})

const branchCol: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 0,
}

const branchHeader = (color: string): CSSProperties => ({
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color,
  marginBottom: 6,
})

const strikeLabel: CSSProperties = {
  fontSize: '12px',
  fontWeight: 600,
  color: '#c62828',
  textDecoration: 'line-through',
}

const branchText: CSSProperties = {
  fontSize: '12px',
  fontWeight: 600,
  color: '#4caf50',
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

      {/* ── Tree branch-off diagram ── */}
      <div style={diagram}>
        {/* Trunk */}
        <div style={nodeRow}>
          <div style={dot('#111')} />
          <span style={nodeLabel}>Turn 1</span>
          <span style={nodeSublabel}>User prompt</span>
        </div>
        <div style={vLine()} />

        <div style={nodeRow}>
          <div style={dot('#111')} />
          <span style={nodeLabel}>Turn 2</span>
          <span style={nodeSublabel}>Agent plans approach</span>
        </div>
        <div style={vLine()} />

        <div style={nodeRow}>
          <div style={dot('#f59e0b', 14)} />
          <span style={{ ...nodeLabel, color: '#111', fontWeight: 700 }}>
            Turn 3 — <span style={{ color: '#4caf50' }}>checkpoint ✓</span>
          </span>
        </div>

        {/* Short stem from checkpoint to the fork */}
        <div style={vLine('#bbb', 8)} />

        {/* Fork + branches (2-col grid) */}
        <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: 0 }}>
          {/* Y-connector: two arms that meet at center */}
          <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: '25%',
              height: 24,
              borderTop: '2px solid #c62828',
              borderLeft: '2px solid #c62828',
              borderTopLeftRadius: 8,
            }} />
            <div style={{
              width: '25%',
              height: 24,
              borderTop: '2px solid #4caf50',
              borderRight: '2px solid #4caf50',
              borderTopRightRadius: 8,
            }} />
          </div>

          {/* Left branch — mistake */}
          <div style={branchCol}>
            <span style={branchHeader('#c62828')}>✗ mistake</span>
            <div style={nodeRow}>
              <div style={dot('#c62828', 10)} />
              <span style={strikeLabel}>Turn 4 — wrong approach</span>
            </div>
            <div style={vLine('#c62828', 12)} />
            <div style={{ ...nodeRow, opacity: 0.4 }}>
              <div style={dot('#c62828', 8)} />
              <span style={strikeLabel}>Turn 5 — deeper…</span>
            </div>
          </div>

          {/* Right branch — rollback */}
          <div style={branchCol}>
            <span style={branchHeader('#4caf50')}>✓ rollback</span>
            <div style={nodeRow}>
              <div style={dot('#4caf50', 10)} />
              <span style={branchText}>Turn 4′ — fresh prompt</span>
            </div>
            <div style={vLine('#4caf50', 12)} />
            <div style={nodeRow}>
              <div style={dot('#4caf50', 10)} />
              <span style={branchText}>Turn 5′ — correct path</span>
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
