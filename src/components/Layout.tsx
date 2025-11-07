import { ReactNode } from 'react'
import { Navigation } from './Navigation'
import { motion } from 'framer-motion'

interface LayoutProps {
  children: ReactNode
  showNavigation?: boolean
}

export function Layout({ children, showNavigation = true }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 -left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {showNavigation && <Navigation />}

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        {children}
      </motion.main>
    </div>
  )
}
