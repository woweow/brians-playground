import { ReactNode } from 'react'
import { Navigation } from './Navigation'

interface AppLayoutProps {
  children: ReactNode
  showNavigation?: boolean
}

export function AppLayout({ children, showNavigation = false }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {showNavigation && <Navigation />}
      <main className="w-full">{children}</main>
    </div>
  )
}
