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

const diagramContainer: CSSProperties = {
  width: '100%',
  maxWidth: 580,
  margin: '0 0 48px',
}

const diagramBox: CSSProperties = {
  border: '1.5px solid #e0e0e0',
  borderRadius: 16,
  padding: '32px',
  background: '#fafafa',
}

const modelsGrid: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
}

const modelRow: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
}

const modelName: CSSProperties = {
  fontSize: '13px',
  fontWeight: 600,
  color: '#333',
  width: 160,
  flexShrink: 0,
  textAlign: 'right',
}

const barTrack: CSSProperties = {
  flex: 1,
  height: 28,
  background: '#efefef',
  borderRadius: 6,
  overflow: 'hidden',
  position: 'relative',
}

const barLabel: CSSProperties = {
  position: 'absolute',
  right: 8,
  top: '50%',
  transform: 'translateY(-50%)',
  fontSize: '11px',
  fontWeight: 600,
  color: '#111',
  pointerEvents: 'none',
}

const legend: CSSProperties = {
  display: 'flex',
  gap: 20,
  justifyContent: 'center',
  marginTop: 20,
  flexWrap: 'wrap',
}

const legendItem: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  fontSize: '12px',
  color: '#666',
}

const legendDot = (color: string): CSSProperties => ({
  width: 10,
  height: 10,
  borderRadius: 2,
  background: color,
  flexShrink: 0,
})

const highlight: CSSProperties = {
  fontSize: 'clamp(15px, 1.8vw, 17px)',
  lineHeight: 1.7,
  color: '#666',
  maxWidth: 540,
  textAlign: 'center',
  fontStyle: 'italic',
}

const INPUT_COLOR = '#4f8ef7'
const OUTPUT_COLOR = '#f4a44a'

const MODELS = [
  { name: 'GPT-5-mini', totalK: 400, outputK: 128 },
  { name: 'GPT-5.4', totalK: 1050, outputK: 128 },
  { name: 'Claude Opus 4.6', totalK: 1000, outputK: 128 },
  { name: 'Gemini 3.1 Pro', totalK: 1048, outputK: 66 },
]

const MAX_K = Math.max(...MODELS.map((m) => m.totalK))

function formatK(k: number) {
  return k >= 1000 ? `${k / 1000}M` : `${k}K`
}

export default function ContextWindowSizeView() {
  return (
    <div style={page}>
      <span style={chapterLabel}>Chapter 02</span>

      <h2 style={heading}>Context Window Size</h2>

      <p style={body}>
        Every model has a <strong>maximum context window</strong> — the total
        number of <strong>tokens</strong> (chunks of text) it can process at
        once. This cap covers everything: your instructions, the conversation
        history, file contents, tool results — and the model's own reply.
      </p>

      <div style={diagramContainer}>
        <div style={diagramBox}>
          <div style={modelsGrid}>
            {MODELS.map(({ name, totalK, outputK }) => {
              const inputK = totalK - outputK
              const inputPct = (inputK / MAX_K) * 100
              const outputPct = (outputK / MAX_K) * 100
              return (
                <div key={name} style={modelRow}>
                  <span style={modelName}>{name}</span>
                  <div style={barTrack}>
                    <div
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        height: '100%',
                        width: `${inputPct}%`,
                        background: INPUT_COLOR,
                        borderRadius: '6px 0 0 6px',
                        transition: 'width 0.3s',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        left: `${inputPct}%`,
                        top: 0,
                        height: '100%',
                        width: `${outputPct}%`,
                        background: OUTPUT_COLOR,
                        borderRadius: outputPct + inputPct >= 99 ? '0 6px 6px 0' : 0,
                        transition: 'width 0.3s',
                      }}
                    />
                    <span style={barLabel}>{formatK(totalK)} tokens</span>
                  </div>
                </div>
              )
            })}
          </div>

          <div style={legend}>
            <span style={legendItem}>
              <span style={legendDot(INPUT_COLOR)} />
              Input (available for context)
            </span>
            <span style={legendItem}>
              <span style={legendDot(OUTPUT_COLOR)} />
              Reserved for model output
            </span>
          </div>
        </div>
      </div>

      <p style={highlight}>
        "A larger context window doesn't mean infinite memory — it means a
        bigger, more expensive buffer that still fills up."
      </p>
    </div>
  )
}
