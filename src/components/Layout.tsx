import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Navigation } from './Navigation'
import { cn } from '@/lib/utils'

interface LayoutProps {
  children: ReactNode
  showNavigation?: boolean
  className?: string
}

export function Layout({ children, showNavigation = true, className }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950 relative overflow-x-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <motion.div
          className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-lime-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-lime-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Content */}
      <div className={cn('relative z-10', className)}>
        {children}
      </div>

      {/* Navigation */}
      {showNavigation && <Navigation />}
    </div>
  )
}
