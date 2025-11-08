# Brian's Playground

A modern, minimal personal website built with React, TypeScript, and Tailwind CSS. This is a fully self-contained static website designed to showcase interactive UI components and smooth user experiences.

## Features

- **Modern Design**: Clean, minimal aesthetic with a dark color palette
- **Smooth Animations**: Powered by Framer Motion for delightful interactions
- **Responsive**: Mobile-first design that works on all devices
- **Type-Safe**: Built with TypeScript for robust development
- **Fast**: Vite-powered development and optimized production builds

## Tech Stack

### Core
- **React** 18.3.1 - UI framework
- **TypeScript** 5.6.3 - Type-safe development
- **Vite** 6.x - Build tool and dev server

### UI & Styling
- **Tailwind CSS** 4.x - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **Framer Motion** - Animation library
- **clsx + tailwind-merge** - Conditional className utilities

### State Management
- **Zustand** 5.x - Lightweight state management

## Project Structure

```
brians-playground/
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI components (Button, Card)
│   │   ├── Navigation.tsx   # Navigation menu with hamburger icon
│   │   └── Layout.tsx       # Main layout wrapper
│   ├── pages/
│   │   ├── Home.tsx         # Landing page
│   │   ├── About.tsx        # About page
│   │   └── Apps.tsx         # Apps showcase page
│   ├── lib/
│   │   └── utils.ts         # Utility functions
│   ├── store/
│   │   └── navigation.ts    # Zustand store for navigation
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
└── Configuration files
```

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd brians-playground
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Available Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Pages

### Home
Landing page with a welcoming hero section, tagline, and feature highlights.

### About
Personal information page with skills, experience timeline, and social links.

### Apps
Showcase of mini-apps and interactive projects with placeholder content.

## Development

The project uses:
- Custom client-side routing via Zustand (no React Router)
- Path aliases (`@/` maps to `src/`)
- Strict TypeScript configuration
- Modern ES2020+ JavaScript features

## Building for Production

```bash
npm run build
```

The build output will be in the `dist/` directory, ready for deployment to any static hosting service (Vercel, Netlify, GitHub Pages, etc.).

## License

MIT
