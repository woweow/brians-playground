import { Menu, X, Home, User, Boxes } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigationStore } from '@/store/navigation'
import { cn } from '@/lib/utils'

export function Navigation() {
  const { currentPage, isMenuOpen, setCurrentPage, toggleMenu } = useNavigationStore()

  const menuItems = [
    { id: 'home' as const, label: 'Home', icon: Home },
    { id: 'about' as const, label: 'About', icon: User },
    { id: 'apps' as const, label: 'Apps', icon: Boxes },
  ]

  return (
    <Dialog.Root open={isMenuOpen} onOpenChange={toggleMenu}>
      {/* Menu Button */}
      <Dialog.Trigger asChild>
        <button
          className="fixed top-6 left-6 z-50 p-3 rounded-lg bg-slate-800/80 backdrop-blur-sm border border-slate-700 hover:bg-slate-700 transition-colors"
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            {isMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </Dialog.Trigger>

      {/* Menu Overlay & Content */}
      <Dialog.Portal>
        <Dialog.Overlay asChild>
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        </Dialog.Overlay>

        <Dialog.Content asChild>
          <motion.div
            className="fixed left-0 top-0 h-full w-80 bg-slate-900 border-r border-slate-800 z-50 p-8 flex flex-col"
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          >
            <Dialog.Title className="text-2xl font-bold mb-8 mt-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Brian's Playground
            </Dialog.Title>

            <nav className="flex flex-col space-y-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon
                const isActive = currentPage === item.id

                return (
                  <motion.button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className={cn(
                      'flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors',
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-slate-800 text-slate-300'
                    )}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-lg font-medium">{item.label}</span>
                  </motion.button>
                )
              })}
            </nav>

            <div className="mt-auto pt-8 border-t border-slate-800">
              <p className="text-sm text-slate-500 text-center">
                Built with React & TypeScript
              </p>
            </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
