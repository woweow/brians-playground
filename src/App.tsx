import { AnimatePresence } from 'framer-motion'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Apps } from './pages/Apps'
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
      default:
        return <Home />
    }
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
