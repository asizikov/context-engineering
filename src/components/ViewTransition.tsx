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
  hasNavigation: boolean
  sidebarOffset?: number
}

type Phase = 'enter' | 'active' | 'exit'

interface Layer {
  key: number
  content: ReactNode
  phase: Phase
}

const DURATION = 500

function getStyle(phase: Phase, direction: NavigationDirection): CSSProperties {
  const transition = `opacity ${DURATION}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`

  if (phase === 'active') {
    return {
      position: 'relative',
      transition,
      willChange: 'opacity, transform',
      opacity: 1,
      transform: 'translateY(0)',
    }
  }

  const offset = phase === 'enter'
    ? (direction === 'back' ? '-40px' : '40px')
    : (direction === 'back' ? '40px' : '-40px')

  return {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    pointerEvents: 'none',
    transition,
    willChange: 'opacity, transform',
    opacity: 0,
    transform: `translateY(${offset})`,
  }
}

export default function ViewTransition({
  viewKey,
  direction,
  children,
  hasNavigation,
  sidebarOffset = 0,
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

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [viewKey])

  return (
    <div
      className={hasNavigation ? 'view-transition view-transition--with-nav' : 'view-transition'}
      style={{ position: 'relative', width: '100%', flex: 1, overflowX: 'hidden', paddingLeft: sidebarOffset }}
    >
      {layers.map((layer) => (
        <div key={layer.key} className="view-layer" style={getStyle(layer.phase, direction)}>
          {layer.content}
        </div>
      ))}
    </div>
  )
}
