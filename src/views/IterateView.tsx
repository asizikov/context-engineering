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
  margin: '0 0 40px',
  fontWeight: 400,
}

const cycleBox: CSSProperties = {
  width: '100%',
  maxWidth: 480,
  border: '1.5px solid #e0e0e0',
  borderRadius: 16,
  padding: '32px',
  background: '#fafafa',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 0,
  marginBottom: 36,
}

const cycleStep: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 14,
  padding: '14px 24px',
  width: '100%',
  maxWidth: 340,
}

const stepIcon: CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: '50%',
  background: '#111',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '16px',
  flexShrink: 0,
}

const stepText: CSSProperties = {
  fontSize: '15px',
  fontWeight: 600,
  color: '#333',
}

const stepDesc: CSSProperties = {
  fontSize: '12px',
  color: '#888',
  fontWeight: 400,
}

const arrow: CSSProperties = {
  fontSize: 16,
  color: '#ccc',
  textAlign: 'center',
  width: '100%',
  margin: '2px 0',
}

const callout: CSSProperties = {
  width: '100%',
  maxWidth: 480,
  padding: '20px 24px',
  borderRadius: 12,
  background: '#f8f8f8',
  border: '1.5px solid #e8e8e8',
}

const calloutTitle: CSSProperties = {
  fontSize: '14px',
  fontWeight: 700,
  color: '#111',
  marginBottom: 8,
}

const calloutBody: CSSProperties = {
  fontSize: '13px',
  lineHeight: 1.65,
  color: '#666',
}

const STEPS = [
  { icon: '✍️', title: 'Write instructions', desc: 'Draft your AGENTS.md or project prompts' },
  { icon: '🧪', title: 'Test with real tasks', desc: 'Run the agent on actual work' },
  { icon: '👀', title: 'Observe failures', desc: 'Note where the agent struggles or hallucinates' },
  { icon: '🔄', title: 'Refine & repeat', desc: 'Update instructions, re-evaluate' },
]

export default function IterateView() {
  return (
    <div style={page}>
      <span style={chapterLabel}>Chapter 18</span>
      <h2 style={heading}>Iterate Often</h2>

      <p style={body}>
        Context engineering is not a one-time setup. Models improve, harnesses
        evolve, and your project changes. Treat your instructions as
        <strong> living documents</strong> that improve through regular
        evaluation.
      </p>

      <div style={cycleBox}>
        {STEPS.map((step, i) => (
          <div key={step.title}>
            <div style={cycleStep}>
              <span style={stepIcon}>{step.icon}</span>
              <div>
                <div style={stepText}>{step.title}</div>
                <div style={stepDesc}>{step.desc}</div>
              </div>
            </div>
            {i < STEPS.length - 1 && <div style={arrow}>↓</div>}
          </div>
        ))}
        <div style={{ ...arrow, marginTop: 8, fontSize: 13, color: '#999' }}>↻ repeat</div>
      </div>

      <div style={callout}>
        <div style={calloutTitle}>Keep up with progress</div>
        <div style={calloutBody}>
          New model releases may render old workarounds unnecessary.
          Harness updates bring new tools and strategies. Review your
          instructions after every major update — what was essential last
          month may now be built-in.
        </div>
      </div>
    </div>
  )
}
