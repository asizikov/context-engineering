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

const diagramBox: CSSProperties = {
  width: '100%',
  maxWidth: 520,
  border: '1.5px solid #e0e0e0',
  borderRadius: 16,
  padding: '32px',
  background: '#fafafa',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 16,
}

const loopStep = (highlight: boolean): CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  gap: 14,
  padding: '14px 24px',
  borderRadius: 10,
  border: highlight ? '2px solid #111' : '2px solid #e8e8e8',
  background: highlight ? '#111' : '#fff',
  color: highlight ? '#fff' : '#555',
  fontSize: '15px',
  fontWeight: 600,
  width: '100%',
  maxWidth: 340,
  transition: 'all 0.3s',
})

const stepNum: CSSProperties = {
  width: 28,
  height: 28,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '13px',
  fontWeight: 700,
  border: '1.5px solid currentColor',
  flexShrink: 0,
}

const arrow: CSSProperties = {
  fontSize: 18,
  color: '#ccc',
}

const caption: CSSProperties = {
  fontSize: '14px',
  color: '#888',
  fontStyle: 'italic',
  marginTop: 8,
}

const STEPS = [
  'Receive prompt + context',
  'Reason & plan',
  'Call a tool (or respond)',
  'Observe tool result',
  'Loop back to step 2',
]

export default function AgentLoopView() {
  return (
    <div style={page}>
      <span style={chapterLabel}>Chapter 03</span>
      <h2 style={heading}>The Agent Loop</h2>

      <p style={body}>
        An AI coding agent doesn't just answer once — it <strong>loops</strong>.
        It reads context, reasons, acts via tools, observes the result, and
        decides what to do next. This loop continues until the task is complete.
      </p>

      <div style={diagramBox}>
        {STEPS.map((step, i) => (
          <div key={i}>
            <div style={loopStep(i === 2)}>
              <span style={stepNum}>{i + 1}</span>
              {step}
            </div>
            {i < STEPS.length - 1 && <div style={{ textAlign: 'center' }}><span style={arrow}>↓</span></div>}
          </div>
        ))}
        <p style={caption}>The loop repeats until the agent produces a final response.</p>
      </div>
    </div>
  )
}
