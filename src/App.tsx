import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Apps } from './pages/Apps'
import { Calculator } from './pages/Calculator'
import { RatCatcher } from './pages/RatCatcher'
import { Drawsaurus } from './pages/Drawsaurus'
import { useNavigationStore } from './store/navigation'

function App() {
  const { currentPage, initializeFromUrl } = useNavigationStore()

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      initializeFromUrl()
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [initializeFromUrl])

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />
      case 'about':
        return <About />
      case 'apps':
        return <Apps />
      case 'calculator':
        return <Calculator />
      case 'ratcatcher':
        return <RatCatcher />
      case 'drawsaurus':
        return <Drawsaurus />
      default:
        return <Home />
    }
  }

  // App pages (like calculator) use their own AppLayout and shouldn't be wrapped in the main Layout
  const isAppPage = currentPage === 'calculator' || currentPage === 'ratcatcher' || currentPage === 'drawsaurus'

  if (isAppPage) {
    return (
      <AnimatePresence mode="wait">
        <div key={currentPage}>{renderPage()}</div>
      </AnimatePresence>
    )
  }

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <div key={currentPage}>{renderPage()}</div>
      </AnimatePresence>
    </Layout>
  )
}

export default App
