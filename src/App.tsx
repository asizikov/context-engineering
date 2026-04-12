import { useMemo, type ReactNode } from 'react'
import { useNavigation } from './hooks/useNavigation'
import ViewTransition from './components/ViewTransition'
import NavigationBar from './components/NavigationBar'
import Sidebar, { type Chapter } from './components/Sidebar'
import LandingView from './views/LandingView'
import WhatIsContextView from './views/WhatIsContextView'
import AgentLoopView from './views/AgentLoopView'
import ToolCallsView from './views/ToolCallsView'
import ContextPrimitivesView from './views/ContextPrimitivesView'
import WhyContextGrowsView from './views/WhyContextGrowsView'
import InteractiveAgentLoopView from './views/InteractiveAgentLoopView'
import ContextRotView from './views/ContextRotView'
import CompactionView from './views/CompactionView'
import TheGoalView from './views/TheGoalView'
import HarnessTechniquesView from './views/HarnessTechniquesView'
import UserTechniquesView from './views/UserTechniquesView'
import AgentsMdView from './views/AgentsMdView'
import IterateView from './views/IterateView'
import MemoryView from './views/MemoryView'
import CostOptimizationView from './views/CostOptimizationView'
import AdditionalToolsView from './views/AdditionalToolsView'
import SecurityGuardrailsView from './views/SecurityGuardrailsView'

const CHAPTERS: Chapter[] = [
  { index: 1, title: 'What is Context' },
  { index: 2, title: 'The Agent Loop' },
  { index: 3, title: 'Tool Calls' },
  { index: 4, title: 'Context Primitives' },
  { index: 5, title: 'Agent Loop in Action' },
  { index: 6, title: 'Why Context Grows' },
  { index: 7, title: 'Context Rot' },
  { index: 8, title: 'Compaction' },
  { index: 9, title: 'The Goal' },
  { index: 10, title: 'Harness Techniques' },
  { index: 11, title: 'Your Techniques' },
  { index: 12, title: 'AGENTS.md' },
  { index: 13, title: 'Iterate Often' },
  { index: 14, title: 'Memory' },
  { index: 15, title: 'Cost Optimization' },
  { index: 16, title: 'Additional Tools' },
  { index: 17, title: 'Security Guardrails' },
]

const TOTAL_VIEWS = 18

function useViews(goForward: () => void): ReactNode[] {
  return useMemo(
    () => [
      <LandingView onStart={goForward} />,
      <WhatIsContextView />,
      <AgentLoopView />,
      <ToolCallsView />,
      <ContextPrimitivesView />,
      <InteractiveAgentLoopView />,
      <WhyContextGrowsView />,
      <ContextRotView />,
      <CompactionView />,
      <TheGoalView />,
      <HarnessTechniquesView />,
      <UserTechniquesView />,
      <AgentsMdView />,
      <IterateView />,
      <MemoryView />,
      <CostOptimizationView />,
      <AdditionalToolsView />,
      <SecurityGuardrailsView />,
    ],
    [goForward],
  )
}

export default function App() {
  const nav = useNavigation(TOTAL_VIEWS)
  const views = useViews(nav.goForward)

  return (
    <>
      <Sidebar
        chapters={CHAPTERS}
        currentIndex={nav.currentIndex}
        maxVisited={nav.maxVisited}
        onNavigate={nav.goTo}
      />

      <ViewTransition viewKey={nav.currentIndex} direction={nav.direction}>
        {views[nav.currentIndex]}
      </ViewTransition>

      <NavigationBar
        canGoBack={nav.canGoBack}
        canGoForward={nav.canGoForward}
        onBack={nav.goBack}
        onForward={nav.goForward}
        currentIndex={nav.currentIndex}
      />
    </>
  )
}
