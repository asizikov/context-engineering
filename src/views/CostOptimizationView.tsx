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

const grid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: 14,
  width: '100%',
  maxWidth: 540,
}

interface StrategyProps {
  icon: string
  title: string
  description: string
  saving: string
}

function StrategyCard({ icon, title, description, saving }: StrategyProps) {
  return (
    <div style={{
      border: '1.5px solid #e0e0e0',
      borderRadius: 14,
      padding: '22px 20px',
      background: '#fafafa',
      textAlign: 'left',
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
    }}>
      <div style={{ fontSize: 22 }}>{icon}</div>
      <div style={{ fontSize: '15px', fontWeight: 700, color: '#111' }}>{title}</div>
      <div style={{ fontSize: '13px', lineHeight: 1.6, color: '#777', flex: 1 }}>{description}</div>
      <div style={{
        marginTop: 8,
        fontSize: '12px',
        fontWeight: 700,
        color: '#22c55e',
        background: '#f0fdf4',
        padding: '4px 10px',
        borderRadius: 20,
        alignSelf: 'flex-start',
      }}>
        {saving}
      </div>
    </div>
  )
}

const STRATEGIES: StrategyProps[] = [
  {
    icon: '💾',
    title: 'Prompt Caching',
    description: 'Identical prefixes (system prompt, tools, project context) are cached and reused across requests — paying full price only once.',
    saving: 'Up to 90% off cached tokens',
  },
  {
    icon: '🎯',
    title: 'Load Only What\'s Needed',
    description: 'Let the agent discover files via search tools instead of stuffing the prompt with every file upfront. Less context = fewer tokens.',
    saving: 'Fewer input tokens per turn',
  },
  {
    icon: '⚖️',
    title: 'Balance Reasoning Effort',
    description: 'Not every task needs deep thinking. Use extended thinking for architecture, standard for implementation, and low effort for simple edits.',
    saving: 'Lower output token costs',
  },
  {
    icon: '🔀',
    title: 'Switch Models',
    description: 'Use fast, cheap models (Haiku, GPT-4.1 mini) for exploration and sub-agents. Reserve premium models (Opus, GPT-5) for complex reasoning.',
    saving: '3-10× cheaper sub-tasks',
  },
]

const footer: CSSProperties = {
  fontSize: 'clamp(15px, 1.8vw, 17px)',
  lineHeight: 1.7,
  color: '#666',
  maxWidth: 500,
  textAlign: 'center',
  fontStyle: 'italic',
  marginTop: 32,
}

export default function CostOptimizationView() {
  return (
    <div style={page}>
      <span style={chapterLabel}>Chapter 15</span>
      <h2 style={heading}>Cost Optimization</h2>

      <p style={body}>
        Context engineering isn't just about quality — it's about
        <strong> efficiency</strong>. Every token has a cost. Smart context
        management can dramatically reduce spend without sacrificing output.
      </p>

      <div style={grid}>
        {STRATEGIES.map((s) => (
          <StrategyCard key={s.title} {...s} />
        ))}
      </div>

      <p style={footer}>
        The cheapest token is the one you never send.
      </p>
    </div>
  )
}
