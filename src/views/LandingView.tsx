import type { CSSProperties } from 'react'

interface LandingViewProps {
  onStart: () => void
}

const container: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100dvh',
  padding: '40px 24px',
  textAlign: 'center',
  maxWidth: 720,
  margin: '0 auto',
}

const label: CSSProperties = {
  fontSize: '13px',
  fontWeight: 500,
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: '#999',
  marginBottom: 24,
}

const heading: CSSProperties = {
  fontSize: 'clamp(40px, 7vw, 72px)',
  fontWeight: 700,
  lineHeight: 1.05,
  letterSpacing: '-0.03em',
  color: '#111',
  margin: '0 0 32px',
}

const subtitle: CSSProperties = {
  fontSize: 'clamp(17px, 2.2vw, 21px)',
  lineHeight: 1.65,
  color: '#555',
  maxWidth: 560,
  margin: '0 0 56px',
  fontWeight: 400,
}

const startBtn: CSSProperties = {
  background: '#111',
  color: '#fff',
  border: 'none',
  padding: '18px 48px',
  fontSize: '16px',
  fontWeight: 600,
  fontFamily: 'inherit',
  letterSpacing: '0.04em',
  borderRadius: 60,
  cursor: 'pointer',
  transition: 'transform 0.2s, box-shadow 0.2s',
}

const footer: CSSProperties = {
  position: 'absolute',
  bottom: 32,
  fontSize: '13px',
  color: '#bbb',
  letterSpacing: '0.05em',
}

export default function LandingView({ onStart }: LandingViewProps) {
  return (
    <div style={container}>
      <span style={label}>Interactive Tutorial</span>

      <h1 style={heading}>
        Context
        <br />
        Engineering
      </h1>

      <p style={subtitle}>
        Learn how to design, structure, and deliver the right context to AI
        coding agents — from foundational principles to advanced techniques
        that unlock their full potential.
      </p>

      <button
        style={startBtn}
        onClick={onStart}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.04)'
          e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        Begin Tutorial
      </button>

      <a
        href="https://github.com/asizikov/context-engineering/issues"
        target="_blank"
        rel="noopener noreferrer"
        style={{ marginTop: 20, fontSize: '13px', color: '#999', textDecoration: 'none' }}
      >
        Suggestions? File an issue in the repository
      </a>

      <span style={footer}>Scroll-free, one idea at a time</span>
    </div>
  )
}
