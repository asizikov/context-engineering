import { useMemo, type ReactNode } from 'react'
import { useNavigation } from './hooks/useNavigation'
import ViewTransition from './components/ViewTransition'
import NavigationBar from './components/NavigationBar'
import LandingView from './views/LandingView'
import WhatIsContextView from './views/WhatIsContextView'
import AgentLoopView from './views/AgentLoopView'
import ToolCallsView from './views/ToolCallsView'
import ContextPrimitivesView from './views/ContextPrimitivesView'
import WhyContextGrowsView from './views/WhyContextGrowsView'
import InteractiveAgentLoopView from './views/InteractiveAgentLoopView'
import ContextRotView from './views/ContextRotView'
import CompactionView from './views/CompactionView'

const TOTAL_VIEWS = 9

function useViews(goForward: () => void): ReactNode[] {
  return useMemo(
    () => [
      <LandingView onStart={goForward} />,
      <WhatIsContextView />,
      <AgentLoopView />,
      <ToolCallsView />,
      <ContextPrimitivesView />,
      <WhyContextGrowsView />,
      <InteractiveAgentLoopView />,
      <ContextRotView />,
      <CompactionView />,
    ],
    [goForward],
  )
}

export default function App() {
  const nav = useNavigation(TOTAL_VIEWS)
  const views = useViews(nav.goForward)

  return (
    <>
      <ViewTransition viewKey={nav.currentIndex} direction={nav.direction}>
        {views[nav.currentIndex]}
      </ViewTransition>

      <NavigationBar
        canGoBack={nav.canGoBack}
        canGoForward={nav.canGoForward}
        onBack={nav.goBack}
        onForward={nav.goForward}
        currentIndex={nav.currentIndex}
        totalViews={TOTAL_VIEWS}
      />
    </>
  )
}
