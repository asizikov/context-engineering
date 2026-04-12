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

const list: CSSProperties = {
  width: '100%',
  maxWidth: 540,
  display: 'flex',
  flexDirection: 'column',
  gap: 14,
}

interface ToolGroupProps {
  icon: string
  title: string
  subtitle: string
  description: string
  examples: string[]
}

function ToolGroup({ icon, title, subtitle, description, examples }: ToolGroupProps) {
  return (
    <div style={{
      border: '1.5px solid #e0e0e0',
      borderRadius: 14,
      padding: '22px 24px',
      background: '#fafafa',
      display: 'flex',
      gap: 18,
      alignItems: 'flex-start',
    }}>
      <span style={{ fontSize: 28, flexShrink: 0 }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '16px', fontWeight: 700, color: '#111' }}>{title}</div>
        <div style={{ fontSize: '12px', fontWeight: 600, color: '#999', letterSpacing: '0.05em', marginBottom: 6 }}>
          {subtitle}
        </div>
        <div style={{ fontSize: '13px', lineHeight: 1.6, color: '#666', marginBottom: 10 }}>
          {description}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {examples.map((ex) => (
            <span key={ex} style={{
              fontSize: '11px',
              fontWeight: 600,
              fontFamily: '"SF Mono", "Fira Code", monospace',
              padding: '4px 10px',
              borderRadius: 6,
              background: '#111',
              color: '#a8e6a3',
            }}>
              {ex}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

const TOOL_GROUPS: ToolGroupProps[] = [
  {
    icon: '🔌',
    title: 'MCP Servers',
    subtitle: 'Model Context Protocol',
    description: 'A standard protocol for connecting agents to external data sources and services. MCP servers expose tools that any compatible agent can discover and call.',
    examples: ['github-mcp', 'postgres-mcp', 'filesystem-mcp'],
  },
  {
    icon: '✨',
    title: 'Skills',
    subtitle: 'Composable capabilities',
    description: 'Higher-level workflows that combine multiple tools into a single invocable action. Skills encapsulate domain expertise — like reviewing code, generating PDFs, or managing deployments.',
    examples: ['code-review', 'pdf', 'customize-agent'],
  },
  {
    icon: '⌨️',
    title: 'CLI Tools',
    subtitle: 'System-level access',
    description: 'Shell commands, package managers, build tools, linters, formatters — the full development toolchain available directly to the agent through bash.',
    examples: ['git', 'npm', 'curl', 'gh'],
  },
]

export default function AdditionalToolsView() {
  return (
    <div style={page}>
      <span style={chapterLabel}>Chapter 17</span>
      <h2 style={heading}>Additional Tools</h2>

      <p style={body}>
        Beyond built-in tools, agents can access an expanding ecosystem of
        <strong> external capabilities</strong> — from standardized protocols
        to system-level CLIs.
      </p>

      <div style={list}>
        {TOOL_GROUPS.map((g) => (
          <ToolGroup key={g.title} {...g} />
        ))}
      </div>
    </div>
  )
}
