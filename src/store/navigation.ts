import { create } from 'zustand'

type Page = 'home' | 'about' | 'apps' | 'calculator'

interface NavigationState {
  currentPage: Page
  isMenuOpen: boolean
  setCurrentPage: (page: Page) => void
  toggleMenu: () => void
  closeMenu: () => void
}

export const useNavigationStore = create<NavigationState>((set) => ({
  currentPage: 'home',
  isMenuOpen: false,
  setCurrentPage: (page) => set({ currentPage: page, isMenuOpen: false }),
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  closeMenu: () => set({ isMenuOpen: false }),
}))
