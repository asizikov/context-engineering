import { useCallback, useMemo, type ReactNode } from 'react'
import { useNavigation } from './hooks/useNavigation'
import ViewTransition from './components/ViewTransition'
import NavigationBar from './components/NavigationBar'
import Sidebar, { type Chapter } from './components/Sidebar'
import LandingView from './views/LandingView'
import WhatIsContextView from './views/WhatIsContextView'
import ContextWindowSizeView from './views/ContextWindowSizeView'
import AgentLoopView from './views/AgentLoopView'
import ToolCallsView from './views/ToolCallsView'
import ContextPrimitivesView from './views/ContextPrimitivesView'
import WhyContextGrowsView from './views/WhyContextGrowsView'
import InteractiveAgentLoopView from './views/InteractiveAgentLoopView'
import ContextRotView from './views/ContextRotView'
import CompactionView from './views/CompactionView'
import TheGoalView from './views/TheGoalView'
import HarnessTechniquesView from './views/HarnessTechniquesView'
import SubAgentsView from './views/SubAgentsView'
import ResearchWithoutSubagentsView from './views/ResearchWithoutSubagentsView'
import ResearchWithSubagentsView from './views/ResearchWithSubagentsView'
import UserTechniquesView from './views/UserTechniquesView'
import AgentsMdView from './views/AgentsMdView'
import IterateView from './views/IterateView'
import MemoryView from './views/MemoryView'
import CostOptimizationView from './views/CostOptimizationView'
import AdditionalToolsView from './views/AdditionalToolsView'
import SkillsInActionView from './views/SkillsInActionView'
import SecurityGuardrailsView from './views/SecurityGuardrailsView'
import ObservabilityView from './views/ObservabilityView'
import CorrectingMistakesView from './views/CorrectingMistakesView'
import ClosingQuoteView from './views/ClosingQuoteView'

const CHAPTERS: Chapter[] = [
  { index: 1, title: 'What is Context' },
  { index: 2, title: 'Context Window Size' },
  { index: 3, title: 'The Agent Loop' },
  { index: 4, title: 'Tool Calls' },
  { index: 5, title: 'Context Primitives' },
  { index: 6, title: 'Agent Loop in Action' },
  { index: 7, title: 'Why Context Grows' },
  { index: 8, title: 'Context Rot' },
  { index: 9, title: 'Compaction' },
  { index: 10, title: 'Correcting Mistakes' },
  { index: 11, title: 'The Goal' },
  { index: 12, title: 'Harness Techniques' },
  { index: 13, title: 'Sub-Agents' },
  { index: 14, title: 'Research without Sub-Agents' },
  { index: 15, title: 'Research with Sub-Agents' },
  { index: 16, title: 'Your Techniques' },
  { index: 17, title: 'AGENTS.md' },
  { index: 18, title: 'Iterate Often' },
  { index: 19, title: 'Memory' },
  { index: 20, title: 'Cost Optimization' },
  { index: 21, title: 'Additional Tools' },
  { index: 22, title: 'Skills in Action' },
  { index: 23, title: 'Security Guardrails' },
  { index: 24, title: 'Observability' },
  { index: 25, title: 'Closing' },
]

const TOTAL_VIEWS = 26

function useViews(goForward: () => void, goToStart: () => void): ReactNode[] {
  return useMemo(
    () => [
      <LandingView onStart={goForward} />,
      <WhatIsContextView />,
      <ContextWindowSizeView />,
      <AgentLoopView />,
      <ToolCallsView />,
      <ContextPrimitivesView />,
      <InteractiveAgentLoopView />,
      <WhyContextGrowsView />,
      <ContextRotView />,
      <CompactionView />,
      <CorrectingMistakesView />,
      <TheGoalView />,
      <HarnessTechniquesView />,
      <SubAgentsView />,
      <ResearchWithoutSubagentsView />,
      <ResearchWithSubagentsView />,
      <UserTechniquesView />,
      <AgentsMdView />,
      <IterateView />,
      <MemoryView />,
      <CostOptimizationView />,
      <AdditionalToolsView />,
      <SkillsInActionView />,
      <SecurityGuardrailsView />,
      <ObservabilityView />,
      <ClosingQuoteView onStartAgain={goToStart} />,
    ],
    [goForward, goToStart],
  )
}

export default function App() {
  const nav = useNavigation(TOTAL_VIEWS)
  const goToStart = useCallback(() => nav.goTo(0), [nav.goTo])
  const views = useViews(nav.goForward, goToStart)

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
