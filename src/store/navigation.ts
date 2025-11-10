import { create } from 'zustand'

type Page = 'home' | 'about' | 'apps' | 'calculator' | 'ratcatcher' | 'drawsaurus' | 'globeexplorer'

interface NavigationState {
  currentPage: Page
  isMenuOpen: boolean
  setCurrentPage: (page: Page) => void
  toggleMenu: () => void
  closeMenu: () => void
  initializeFromUrl: () => void
}

// Helper function to get page from URL hash
const getPageFromHash = (): Page => {
  const hash = window.location.hash.slice(1) // Remove #
  const validPages: Page[] = ['home', 'about', 'apps', 'calculator', 'ratcatcher', 'drawsaurus', 'globeexplorer']
  return validPages.includes(hash as Page) ? (hash as Page) : 'home'
}

// Helper function to update URL hash
const updateHash = (page: Page) => {
  window.location.hash = page
}

export const useNavigationStore = create<NavigationState>((set) => ({
  currentPage: getPageFromHash(),
  isMenuOpen: false,
  setCurrentPage: (page) => {
    updateHash(page)
    set({ currentPage: page, isMenuOpen: false })
  },
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  closeMenu: () => set({ isMenuOpen: false }),
  initializeFromUrl: () => {
    const page = getPageFromHash()
    set({ currentPage: page })
  },
}))
