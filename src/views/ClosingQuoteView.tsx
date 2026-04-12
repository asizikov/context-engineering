import type { CSSProperties } from 'react'

interface ClosingQuoteViewProps {
  onStartAgain: () => void
}

const page: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100dvh',
  padding: '60px 24px 120px',
  maxWidth: 760,
  margin: '0 auto',
  textAlign: 'center',
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
  margin: '0 0 48px',
  textAlign: 'center',
}

const quoteBlock: CSSProperties = {
  borderLeft: '4px solid #111',
  padding: '24px 32px',
  margin: '0 0 24px',
  maxWidth: 560,
  textAlign: 'left',
}

const quoteText: CSSProperties = {
  fontSize: 'clamp(20px, 3vw, 28px)',
  fontWeight: 600,
  lineHeight: 1.5,
  letterSpacing: '-0.01em',
  color: '#111',
  fontStyle: 'italic',
  margin: 0,
}

const attribution: CSSProperties = {
  fontSize: '15px',
  fontWeight: 600,
  color: '#555',
  margin: '0 0 4px',
}

const role: CSSProperties = {
  fontSize: '13px',
  color: '#999',
  marginTop: 4,
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
  marginBottom: 32,
}

const shareRow: CSSProperties = {
  display: 'flex',
  gap: 12,
  alignItems: 'center',
}

const shareLabel: CSSProperties = {
  fontSize: '13px',
  color: '#999',
  marginRight: 4,
}

const shareBtn: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 40,
  height: 40,
  borderRadius: '50%',
  border: '1.5px solid #e0e0e0',
  background: '#fafafa',
  cursor: 'pointer',
  transition: 'background 0.2s, border-color 0.2s',
  fontSize: '16px',
  color: '#555',
  textDecoration: 'none',
}

const CANONICAL_URL = 'https://blog.cloud-eng.nl/context-engineering/'
const SHARE_URL = encodeURIComponent(CANONICAL_URL)
const SHARE_TEXT = encodeURIComponent(
  "Just completed the Context Engineering interactive tutorial! Great resource for working with AI coding agents."
)

export default function ClosingQuoteView({ onStartAgain }: ClosingQuoteViewProps) {
  return (
    <div style={page}>
      <span style={chapterLabel}>Closing</span>
      <h2 style={heading}>Thank You</h2>

      <div style={quoteBlock}>
        <p style={quoteText}>
          "We're at the cutting edge — emerging patterns of today might be
          obsolete tomorrow, so your best bet is to focus on the foundations.
          Don't overuse the context window!"
        </p>
      </div>

      <p style={attribution}>D. Losert</p>
      <p style={role}>Strategic Technical Architect — GitHub</p>

      <button
        style={startBtn}
        onClick={onStartAgain}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.04)'
          e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        Start Again
      </button>

      <div style={shareRow}>
        <span style={shareLabel}>Share</span>
        <a
          href={`https://x.com/intent/tweet?text=${SHARE_TEXT}&url=${SHARE_URL}`}
          target="_blank"
          rel="noopener noreferrer"
          style={shareBtn}
          title="Share on X"
        >
          𝕏
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${SHARE_URL}`}
          target="_blank"
          rel="noopener noreferrer"
          style={shareBtn}
          title="Share on LinkedIn"
        >
          in
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${SHARE_URL}`}
          target="_blank"
          rel="noopener noreferrer"
          style={shareBtn}
          title="Share on Facebook"
        >
          f
        </a>
      </div>

      <a
        href="https://github.com/asizikov/context-engineering/issues"
        target="_blank"
        rel="noopener noreferrer"
        style={{ marginTop: 20, fontSize: '13px', color: '#999', textDecoration: 'none' }}
      >
        Suggestions? File an issue in the repository
      </a>
    </div>
  )
}
