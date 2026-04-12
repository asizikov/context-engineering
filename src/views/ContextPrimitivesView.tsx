import { useState, type CSSProperties } from 'react'

interface BlockData {
  id: string
  label: string
  bg: string
  fg: string
  dotted?: boolean
  description: Array<{ heading: string; text: string }>
}

const BLOCKS: BlockData[] = [
  {
    id: 'system-prompt',
    label: 'System Prompt',
    bg: '#e8f0fe',
    fg: '#1a3a6b',
    description: [
      { heading: 'What it contains', text: 'Role definition, persona, behavioral constraints, output format rules, and safety guidelines. Written by the developer or harness — not the user.' },
      { heading: 'Why it exists', text: "Anchors the model's identity for the entire session. Without it, every response starts from scratch with no stable character, constraints, or goals." },
      { heading: 'Token cost', text: 'Typically 500–4,000 tokens. Consumed on every single request, even if the user only says "ok".' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    bg: '#f3e8ff',
    fg: '#4a1a7a',
    description: [
      { heading: 'What it contains', text: 'JSON schema definitions for every function the model can invoke — name, description, and parameter types. Examples: read_file, bash, search_web, create_pr.' },
      { heading: 'Why it exists', text: "The model needs to know what actions are available before it can decide to use one. Tool definitions live in context, not in the model's weights." },
      { heading: 'Token cost', text: "~200–600 tokens per tool. With 20 tools that's 4,000–12,000 tokens consumed before the user says a word." },
    ],
  },
  {
    id: 'skills',
    label: 'Skills',
    bg: '#e8fff3',
    fg: '#1a5c3a',
    description: [
      { heading: 'What it contains', text: 'Specialized instruction modules injected by the harness — coding standards, domain knowledge, workflow procedures, or multi-step playbooks.' },
      { heading: 'Why it exists', text: 'Separates reusable capability definitions from the core system prompt. Skills can be swapped in and out per task without rewriting the whole system prompt.' },
      { heading: 'Token cost', text: 'Highly variable. A simple skill: ~200 tokens. A complex workflow playbook: 2,000+ tokens per skill loaded.' },
    ],
  },
  {
    id: 'project-prompt',
    label: 'Project Prompt',
    bg: '#fff8e8',
    fg: '#6b4a00',
    description: [
      { heading: 'What it contains', text: 'Repository context: README, architecture notes, coding guidelines, file tree snapshots, AGENTS.md. Specific to the current project or workspace.' },
      { heading: 'Why it exists', text: "Gives the model grounding in the actual codebase. Without it, the model writes generic code that may not fit the project's patterns or naming conventions." },
      { heading: 'Token cost', text: 'Can be large. A detailed AGENTS.md or architecture doc easily consumes 2,000–10,000 tokens injected once per session.' },
    ],
  },
  {
    id: 'user-prompt',
    label: 'User Prompt',
    bg: '#fde8e8',
    fg: '#7a1a1a',
    description: [
      { heading: 'What it contains', text: 'The actual user message: what they asked for, any attached files, pasted code, screenshots, clarifications, and follow-up instructions.' },
      { heading: 'Why it exists', text: "It's the request. Everything else in the context exists to help the model respond to this well." },
      { heading: 'Token cost', text: 'Usually the smallest piece — a few dozen to a few hundred tokens for a typical message. But pasted files or images can make it very large very fast.' },
    ],
  },
  {
    id: 'session-buffer',
    label: 'Session Buffer',
    bg: '#f7f7f7',
    fg: '#444',
    dotted: true,
    description: [
      { heading: 'What it contains', text: 'The entire accumulated conversation: prior user messages, assistant replies, tool call requests, tool results, retrieved file contents, and search results.' },
      { heading: 'Why it exists', text: "The model has no persistent memory — it only knows what's in the current context. The session buffer is its working memory for the ongoing task." },
      { heading: 'Token cost', text: 'The main reason context fills up. Every tool call adds its result. Every reply adds the full message. It compounds with every turn of the conversation.' },
    ],
  },
  {
    id: 'reserved-output',
    label: 'Reserved Output',
    bg: '#e8e8e8',
    fg: '#555',
    description: [
      { heading: 'What it contains', text: "Space reserved at the end of the context window for the model's response. Not actual content — it's headroom the model writes into." },
      { heading: 'Why it exists', text: "If your input consumes 99% of the window, the model can only produce a tiny reply before hitting the limit. This reservation ensures there's room to respond fully." },
      { heading: 'Token cost', text: 'Typically 2,000–32,000 tokens held back. The larger the expected output, the more you must leave free — reducing the room for everything else.' },
    ],
  },
]

interface Group {
  id: string
  label: string
  borderColor: string
  labelColor: string
  blockIds: string[]
}

const GROUPS: Group[] = [
  { id: 'static', label: 'Static', borderColor: '#b0c4e8', labelColor: '#4a6a9a', blockIds: ['system-prompt', 'tools', 'skills', 'project-prompt'] },
  { id: 'dynamic', label: 'Dynamic', borderColor: '#f0b87a', labelColor: '#a06020', blockIds: ['user-prompt', 'session-buffer'] },
  { id: 'reserved', label: 'Reserved', borderColor: '#bbb', labelColor: '#888', blockIds: ['reserved-output'] },
]

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
  alignItems: 'start',
}

/* ── Shared panel ── */

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

const windowBody: CSSProperties = {
  padding: '14px',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
}

const groupWrapperStyle = (borderColor: string): CSSProperties => ({
  border: `1.5px solid ${borderColor}`,
  borderRadius: 10,
  padding: '14px 8px 8px',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
})

const groupLabelStyle = (color: string): CSSProperties => ({
  position: 'absolute',
  top: -9,
  left: 10,
  background: '#fafafa',
  padding: '0 6px',
  fontSize: '10px',
  fontWeight: 700,
  letterSpacing: '0.13em',
  textTransform: 'uppercase',
  color,
})

const blockStyle = (bg: string, fg: string, dotted?: boolean, selected?: boolean, hovered?: boolean): CSSProperties => ({
  borderRadius: 8,
  padding: '9px 14px',
  fontSize: '13px',
  fontWeight: 600,
  background: dotted ? 'transparent' : bg,
  color: fg,
  letterSpacing: '0.01em',
  border: dotted
    ? `1.5px dashed ${selected ? fg : '#aaa'}`
    : selected ? `2px solid ${fg}` : '2px solid transparent',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
  userSelect: 'none',
  opacity: hovered || selected ? 1 : 0.8,
  filter: hovered && !selected ? 'brightness(0.96)' : 'none',
  transition: 'border 0.15s, opacity 0.15s, filter 0.15s',
})

const infoIconStyle = (fg: string, selected?: boolean): CSSProperties => ({
  width: 18,
  height: 18,
  borderRadius: '50%',
  border: `1.5px solid ${fg}`,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '11px',
  fontWeight: 700,
  flexShrink: 0,
  lineHeight: 1,
  opacity: selected ? 1 : 0.55,
  transition: 'opacity 0.15s',
})

const summaryBody: CSSProperties = {
  padding: '20px 22px',
  flex: 1,
}

const defaultHint: CSSProperties = {
  fontSize: '14px',
  lineHeight: 1.75,
  color: '#777',
  margin: 0,
}

export default function ContextPrimitivesView() {
  const [selected, setSelected] = useState<string | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)

  const selectedBlock = BLOCKS.find((b) => b.id === selected)
  const handleSelect = (id: string) => setSelected((prev) => (prev === id ? null : id))

  return (
    <div style={page}>
      <span style={chapterLabel}>Chapter 05</span>
      <h2 style={heading}>Context Primitives</h2>
      <p style={subtitle}>
        Every agent interaction is built from the same <strong>building blocks</strong>. These
        primitives compose the context window — each shaping what the model knows and how it
        behaves. Click any block to learn more.
      </p>

      <div style={splitLayout}>
        {/* Left: Context Window */}
        <div style={panelStyle}>
          <div style={panelHeader('#fff')}>
            <span style={panelTitle}>Context Window</span>
            {selected && (
              <button
                onClick={() => setSelected(null)}
                style={{ background: 'none', border: 'none', fontSize: '12px', color: '#aaa', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}
              >
                clear 
              </button>
            )}
          </div>
          <div style={windowBody}>
            {GROUPS.map((group) => (
              <div key={group.id} style={groupWrapperStyle(group.borderColor)}>
                <span style={groupLabelStyle(group.labelColor)}>{group.label}</span>
                {group.blockIds.map((id) => {
                  const b = BLOCKS.find((block) => block.id === id)!
                  const isSelected = selected === b.id
                  const isHovered = hovered === b.id
                  return (
                    <div
                      key={b.id}
                      style={blockStyle(b.bg, b.fg, b.dotted, isSelected, isHovered)}
                      onClick={() => handleSelect(b.id)}
                      onMouseEnter={() => setHovered(b.id)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      <span>{b.label}</span>
                      <span style={infoIconStyle(b.fg, isSelected)}>i</span>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Summary */}
        <div style={panelStyle}>
          <div style={panelHeader('#f8f8f8')}>
            <span style={panelTitle}>{selectedBlock ? selectedBlock.label : 'Summary'}</span>
          </div>
          <div style={summaryBody}>
            {!selectedBlock ? (
              <p style={defaultHint}>
                The context window is split into <strong>static</strong> and <strong>dynamic</strong> regions.
                <br /><br />
                <strong>Static blocks</strong> — System Prompt, Tools, Skills, and Project Prompt —
                are loaded once and stay constant for the entire session.
                <br /><br />
                <strong>Dynamic blocks</strong> — User Prompt and Session Buffer — grow with every
                turn as the conversation accumulates.
                <br /><br />
                <strong>Reserved Output</strong> is headroom held back so the model always has room to reply.
                <br /><br />
                <span style={{ color: '#bbb' }}>← Click any block to learn more.</span>
              </p>
            ) : (
              <div style={{ animation: 'fadeIn 0.22s ease-out' }}>
                <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>
                <div style={{ fontSize: '18px', fontWeight: 700, color: selectedBlock.fg, marginBottom: 20 }}>
                  {selectedBlock.label}
                </div>
                {selectedBlock.description.map((section) => (
                  <div key={section.heading} style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: selectedBlock.fg, opacity: 0.6, marginBottom: 5 }}>
                      {section.heading}
                    </div>
                    <p style={{ fontSize: '14px', lineHeight: 1.65, color: selectedBlock.fg, margin: 0, opacity: 0.9 }}>
                      {section.text}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
