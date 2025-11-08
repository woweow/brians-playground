import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigationStore, type Page } from '@/store/navigation'
import { cn } from '@/lib/utils'
import { useRef, useEffect } from 'react'

interface NavigationProps {
  className?: string
}

export function Navigation({ className }: NavigationProps) {
  const { isMenuOpen, toggleMenu, setCurrentPage, currentPage } = useNavigationStore()
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  const navItems: { label: string; page: Page }[] = [
    { label: 'Home', page: 'home' },
    { label: 'About', page: 'about' },
    { label: 'Apps', page: 'apps' },
  ]

  const handleNavClick = (page: Page) => {
    setCurrentPage(page)
  }

  // Restore focus to menu button when menu closes
  useEffect(() => {
    if (!isMenuOpen && menuButtonRef.current) {
      menuButtonRef.current.focus()
    }
  }, [isMenuOpen])

  return (
    <>
      {/* Menu Button */}
      <button
        ref={menuButtonRef}
        onClick={toggleMenu}
        className={cn(
          'fixed top-6 right-6 z-50 p-3 rounded-full bg-slate-800/80 backdrop-blur-sm border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white transition-all duration-200 shadow-lg',
          className
        )}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Navigation Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={toggleMenu}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-80 bg-slate-900 border-l border-slate-800 z-40 shadow-2xl"
            >
              <div className="flex flex-col h-full p-8 pt-24">
                <nav className="flex flex-col space-y-2">
                  {navItems.map((item) => (
                    <motion.button
                      key={item.page}
                      onClick={() => handleNavClick(item.page)}
                      className={cn(
                        'text-left px-6 py-4 rounded-lg text-lg font-medium transition-all duration-200',
                        currentPage === item.page
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      )}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </nav>

                {/* Footer */}
                <div className="mt-auto pt-8 border-t border-slate-800">
                  <p className="text-sm text-slate-500 text-center">
                    Brian&rsquo;s Playground
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
