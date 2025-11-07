import { ReactNode } from 'react'
import { Navigation } from './Navigation'

interface AppLayoutProps {
  children: ReactNode
  showNavigation?: boolean
}

/**
 * Standalone layout for individual apps.
 * Optional menu floater - no background gradients or styling from the main site.
 * Each app using this layout should be completely independent.
 */
export function AppLayout({ children, showNavigation = false }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      {showNavigation && <Navigation />}
      {children}
    </div>
  )
}
