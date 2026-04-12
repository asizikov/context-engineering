import { useState, useCallback, useMemo } from 'react'

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

export function useNavigation(totalViews: number): NavigationState {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [maxVisited, setMaxVisited] = useState(0)
  const [direction, setDirection] = useState<NavigationDirection>('none')

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
