# Brian's Playground - Developer Guide

## Tech Stack
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS (utility-first)
- **Animations**: Framer Motion
- **State**: Zustand (lightweight store)
- **UI Primitives**: Radix UI
- **Icons**: Lucide React

## Project Structure
```
src/
├── components/
│   ├── ui/           # Base components (Button, Card)
│   ├── Layout.tsx    # Main site layout (w/ nav + gradients)
│   ├── AppLayout.tsx # Standalone app layout (minimal)
│   └── Navigation.tsx
├── pages/            # Page components
├── store/            # Zustand stores
└── lib/              # Utilities
```

## Routing
Custom client-side routing via Zustand (no React Router). Pages defined in `store/navigation.ts`.

## Adding a New App

**CRITICAL**: Apps are **stylistically independent** - they don't inherit any styling from the main site.

### Step 1: Create App Page
```tsx
// src/pages/YourApp.tsx
import { AppLayout } from '@/components/AppLayout'

export function YourApp() {
  return (
    <AppLayout showNavigation={false}> {/* No nav by default */}
      {/* Your completely independent app UI */}
      <div className="p-8">
        <h1>Your App</h1>
        {/* Style this however you want - no inheritance */}
      </div>
    </AppLayout>
  )
}
```

### Step 2: Add Route Type
```tsx
// src/store/navigation.ts
type Page = 'home' | 'about' | 'apps' | 'calculator' | 'yourapp'
```

### Step 3: Register Route
```tsx
// src/App.tsx
import { YourApp } from './pages/YourApp'

// Add to renderPage() switch:
case 'yourapp':
  return <YourApp />

// Add to isAppPage check:
const isAppPage = currentPage === 'calculator' || currentPage === 'yourapp'
```

### Step 4: Add to Apps Gallery
```tsx
// src/pages/Apps.tsx
const projects = [
  // ... existing projects
  {
    icon: YourIcon,
    title: 'Your App',
    description: 'Description here',
    color: 'from-blue-500 to-cyan-500', // Gradient colors
    tags: ['React', 'TypeScript'],
    page: 'yourapp' as const,
  },
]
```

## Layout Components

### AppLayout (for apps)
- **Purpose**: Standalone apps
- **Styling**: Minimal - white background, no gradients
- **Navigation**: `showNavigation` prop (default: `false`)
- **Use when**: Building independent apps

### Layout (for site pages)
- **Purpose**: Main site pages (Home, About, Apps)
- **Styling**: Dark theme, animated gradients, full styling
- **Navigation**: `showNavigation` prop (default: `true`)
- **Use when**: Site content pages

## Key Patterns

### Path Aliases
```tsx
import { Button } from '@/components/ui/Button'  // ✓
import { Button } from '../components/ui/Button' // ✗
```

### Class Name Merging
```tsx
import { cn } from '@/lib/utils'

<div className={cn('base-classes', condition && 'conditional-classes')} />
```

### Component Variants (Button example)
```tsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
```

### Animations
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  whileHover={{ scale: 1.05 }}
/>
```

### State Access
```tsx
const { currentPage, setCurrentPage } = useNavigationStore()
```

## Styling Guidelines

### Dark Theme (Main Site)
- Background: `bg-slate-950`
- Text: `text-slate-300`, `text-white`
- Borders: `border-slate-800`, `border-slate-700`
- Gradients: Blue/purple/pink combinations

### Apps (Independent)
- Style however you want
- No inherited colors or themes
- Completely blank canvas (white bg by default)

## Development

```bash
npm run dev      # Start dev server (Vite HMR)
npm run build    # Type check + production build
npm run preview  # Preview production build
```

## Configuration

- **Vite**: `vite.config.ts` (React plugin, path aliases)
- **TypeScript**: `tsconfig.json` (strict mode, ES2020)
- **Tailwind**: `tailwind.config.js` (dark mode: class)
- **Vercel**: `vercel.json` (SPA rewrites)

## Important Notes

1. **Apps vs Pages**: Apps use `AppLayout` (minimal), pages use `Layout` (full styling)
2. **No Router**: Custom routing via Zustand state (simpler for this use case)
3. **Type Safety**: All routes/pages typed via TypeScript unions
4. **Radix UI**: Accessible primitives for dialogs, dropdowns, etc.
5. **Framer Motion**: Used for all animations and page transitions
