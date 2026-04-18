import { useCallback, useMemo, type ReactNode } from 'react'
import { useNavigation, type HashRouting } from './hooks/useNavigation'
import { useIsMobile } from './hooks/useIsMobile'
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
import Footer from './components/Footer'

const CHAPTERS: Chapter[] = [
  { index: 1, title: 'What is Context', slug: 'what-is-context' },
  { index: 2, title: 'Context Window Size', slug: 'context-window-size' },
  { index: 3, title: 'The Agent Loop', slug: 'the-agent-loop' },
  { index: 4, title: 'Tool Calls', slug: 'tool-calls' },
  { index: 5, title: 'Context Primitives', slug: 'context-primitives' },
  { index: 6, title: 'Agent Loop in Action', slug: 'agent-loop-in-action' },
  { index: 7, title: 'Why Context Grows', slug: 'why-context-grows' },
  { index: 8, title: 'Context Rot', slug: 'context-rot' },
  { index: 9, title: 'Compaction', slug: 'compaction' },
  { index: 10, title: 'Correcting Mistakes', slug: 'correcting-mistakes' },
  { index: 11, title: 'The Goal', slug: 'the-goal' },
  { index: 12, title: 'Harness Techniques', slug: 'harness-techniques' },
  { index: 13, title: 'Sub-Agents', slug: 'sub-agents' },
  { index: 14, title: 'Research without Sub-Agents', slug: 'research-without-sub-agents' },
  { index: 15, title: 'Research with Sub-Agents', slug: 'research-with-sub-agents' },
  { index: 16, title: 'Your Techniques', slug: 'your-techniques' },
  { index: 17, title: 'AGENTS.md', slug: 'agents-md' },
  { index: 18, title: 'Iterate Often', slug: 'iterate-often' },
  { index: 19, title: 'Memory', slug: 'memory' },
  { index: 20, title: 'Cost Optimization', slug: 'cost-optimization' },
  { index: 21, title: 'Additional Tools', slug: 'additional-tools' },
  { index: 22, title: 'Skills in Action', slug: 'skills-in-action' },
  { index: 23, title: 'Security Guardrails', slug: 'security-guardrails' },
  { index: 24, title: 'Observability', slug: 'observability' },
  { index: 25, title: 'Closing', slug: 'closing' },
]

const slugToIndexMap = new Map(CHAPTERS.map((ch) => [ch.slug, ch.index]))
const indexToSlugMap = new Map(CHAPTERS.map((ch) => [ch.index, ch.slug]))

const hashRouting: HashRouting = {
  indexToSlug: (index) => indexToSlugMap.get(index),
  slugToIndex: (slug) => slugToIndexMap.get(slug),
}

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
  const nav = useNavigation(TOTAL_VIEWS, hashRouting)
  const goToStart = useCallback(() => nav.goTo(0), [nav.goTo])
  const views = useViews(nav.goForward, goToStart)
  const hasNavigation = nav.currentIndex !== 0
  const isDrawerMode = useIsMobile(1180, 900)
  const useDrawerNavigation = !hasNavigation || isDrawerMode

  return (
    <div className={useDrawerNavigation ? 'app-shell app-shell--drawer' : 'app-shell'}>
      <Sidebar
        drawerMode={useDrawerNavigation}
        chapters={CHAPTERS}
        currentIndex={nav.currentIndex}
        maxVisited={nav.maxVisited}
        onNavigate={nav.goTo}
      />

      <div className="app-shell__main">
        <ViewTransition
          viewKey={nav.currentIndex}
          direction={nav.direction}
          hasNavigation={hasNavigation}
        >
          {views[nav.currentIndex]}
        </ViewTransition>

        <NavigationBar
          canGoBack={nav.canGoBack}
          canGoForward={nav.canGoForward}
          onBack={nav.goBack}
          onForward={nav.goForward}
          currentIndex={nav.currentIndex}
          drawerMode={useDrawerNavigation}
        />

        <Footer hasNavigation={hasNavigation} />
      </div>
    </div>
  )
}
