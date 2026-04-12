import {
  useState,
  useEffect,
  type ReactNode,
  type CSSProperties,
} from 'react'
import type { NavigationDirection } from '../hooks/useNavigation'

interface ViewTransitionProps {
  viewKey: number
  direction: NavigationDirection
  children: ReactNode
}

type Phase = 'enter' | 'active' | 'exit'

interface Layer {
  key: number
  content: ReactNode
  phase: Phase
}

const DURATION = 500

function getStyle(phase: Phase, direction: NavigationDirection): CSSProperties {
  const base: CSSProperties = {
    position: 'absolute',
    inset: 0,
    transition: `opacity ${DURATION}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`,
    willChange: 'opacity, transform',
  }

  if (phase === 'active') {
    return { ...base, opacity: 1, transform: 'translateY(0)' }
  }

  if (phase === 'enter') {
    const offset = direction === 'back' ? '-40px' : '40px'
    return { ...base, opacity: 0, transform: `translateY(${offset})` }
  }

  const exitOffset = direction === 'back' ? '40px' : '-40px'
  return { ...base, opacity: 0, transform: `translateY(${exitOffset})` }
}

export default function ViewTransition({
  viewKey,
  direction,
  children,
}: ViewTransitionProps) {
  const [layers, setLayers] = useState<Layer[]>([
    { key: viewKey, content: children, phase: 'active' },
  ])

  // When viewKey changes, start the transition
  useEffect(() => {
    setLayers((prev) => {
      const active = prev.find((l) => l.phase === 'active')
      if (active && active.key === viewKey) return prev

      const exiting: Layer[] = active
        ? [{ ...active, phase: 'exit' }]
        : []
      return [...exiting, { key: viewKey, content: children, phase: 'enter' }]
    })

    // Promote entering layer to active on next frame
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => {
        setLayers((prev) =>
          prev.map((l) => (l.phase === 'enter' ? { ...l, phase: 'active' } : l)),
        )
      })
      // store raf2 for cleanup in the timeout path — not critical
      void raf2
    })

    // Remove exited layers after animation completes
    const timeout = setTimeout(() => {
      setLayers((prev) => prev.filter((l) => l.phase !== 'exit'))
    }, DURATION + 50)

    return () => {
      cancelAnimationFrame(raf1)
      clearTimeout(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewKey])

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100dvh', overflow: 'hidden' }}>
      {layers.map((layer) => (
        <div key={layer.key} style={getStyle(layer.phase, direction)}>
          {layer.content}
        </div>
      ))}
    </div>
  )
}
