import { AnimatePresence } from 'framer-motion'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Apps } from './pages/Apps'
import { Calculator } from './pages/Calculator'
import { RatCatcher } from './pages/RatCatcher'
import { useNavigationStore } from './store/navigation'

function App() {
  const { currentPage } = useNavigationStore()

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
      default:
        return <Home />
    }
  }

  // App pages (like calculator) use their own AppLayout and shouldn't be wrapped in the main Layout
  const isAppPage = currentPage === 'calculator' || currentPage === 'ratcatcher'

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
