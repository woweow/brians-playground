import { create } from 'zustand'

export type Page = 'home' | 'about' | 'apps'

interface NavigationState {
  currentPage: Page
  setCurrentPage: (page: Page) => void
  isMenuOpen: boolean
  setIsMenuOpen: (isOpen: boolean) => void
  toggleMenu: () => void
}

export const useNavigationStore = create<NavigationState>((set) => ({
  currentPage: 'home',
  setCurrentPage: (page) => set({ currentPage: page, isMenuOpen: false }),
  isMenuOpen: false,
  setIsMenuOpen: (isOpen) => set({ isMenuOpen: isOpen }),
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
}))
