import { useNavigationStore } from './store/navigation'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Apps } from './pages/Apps'
import { NotFound } from './pages/NotFound'
import { AnimatePresence, motion } from 'framer-motion'

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
        return <NotFound />
    }
  }

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4,
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentPage}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
      >
        {renderPage()}
      </motion.div>
    </AnimatePresence>
  )
}

export default App
