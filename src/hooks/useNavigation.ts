import { useState, useCallback, useMemo, useEffect } from 'react'

export type NavigationDirection = 'forward' | 'back' | 'none'

export interface NavigationState {
  currentIndex: number
  maxVisited: number
  direction: NavigationDirection
  canGoBack: boolean
  canGoForward: boolean
  goForward: () => void
  goBack: () => void
  goTo: (index: number) => void
}

export interface HashRouting {
  indexToSlug: (index: number) => string | undefined
  slugToIndex: (slug: string) => number | undefined
}

function readHashIndex(routing: HashRouting | undefined): number {
  if (!routing) return 0
  const hash = window.location.hash.replace(/^#/, '')
  if (!hash) return 0
  const index = routing.slugToIndex(hash)
  return index ?? 0
}

export function useNavigation(totalViews: number, hashRouting?: HashRouting): NavigationState {
  const initialIndex = readHashIndex(hashRouting)
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [maxVisited, setMaxVisited] = useState(initialIndex)
  const [direction, setDirection] = useState<NavigationDirection>('none')

  // Sync hash to URL when navigation changes
  useEffect(() => {
    if (!hashRouting) return
    const slug = hashRouting.indexToSlug(currentIndex)
    const newHash = slug ? `#${slug}` : ''
    if (window.location.hash !== newHash) {
      window.history.replaceState(null, '', newHash || window.location.pathname)
    }
  }, [currentIndex, hashRouting])

  // Handle left/right arrow keys for navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return

      const target = e.target as HTMLElement | null
      if (target) {
        const tag = target.tagName
        if (
          tag === 'INPUT' ||
          tag === 'TEXTAREA' ||
          tag === 'SELECT' ||
          target.isContentEditable
        ) {
          return
        }
      }

      setCurrentIndex((prev) => {
        if (e.key === 'ArrowRight') {
          if (prev < totalViews - 1) {
            setDirection('forward')
            const next = prev + 1
            setMaxVisited((m) => Math.max(m, next))
            return next
          }
        } else {
          if (prev > 0) {
            setDirection('back')
            return prev - 1
          }
        }
        return prev
      })
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [totalViews])

  // Handle browser back/forward buttons
  useEffect(() => {
    if (!hashRouting) return
    const onHashChange = () => {
      const index = readHashIndex(hashRouting)
      setCurrentIndex((prev) => {
        if (index !== prev && index >= 0 && index < totalViews) {
          setDirection(index > prev ? 'forward' : 'back')
          setMaxVisited((m) => Math.max(m, index))
          return index
        }
        return prev
      })
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [hashRouting, totalViews])

  const canGoBack = currentIndex > 0
  const canGoForward = currentIndex < totalViews - 1

  const goForward = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev < totalViews - 1) {
        setDirection('forward')
        const next = prev + 1
        setMaxVisited((m) => Math.max(m, next))
        return next
      }
      return prev
    })
  }, [totalViews])

  const goBack = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev > 0) {
        setDirection('back')
        return prev - 1
      }
      return prev
    })
  }, [])

  const goTo = useCallback(
    (index: number) => {
      setCurrentIndex((prev) => {
        if (index >= 0 && index < totalViews && index !== prev) {
          setDirection(index > prev ? 'forward' : 'back')
          setMaxVisited((m) => Math.max(m, index))
          return index
        }
        return prev
      })
    },
    [totalViews],
  )

  return useMemo(
    () => ({
      currentIndex,
      maxVisited,
      direction,
      canGoBack,
      canGoForward,
      goForward,
      goBack,
      goTo,
    }),
    [currentIndex, maxVisited, direction, canGoBack, canGoForward, goForward, goBack, goTo],
  )
}
