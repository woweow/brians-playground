# Brian's Playground - Project Specification

## Project Overview
A modern, minimal personal website serving as an "about me" portfolio. This is a fully self-contained static website with no backend dependencies, designed to showcase interactive UI components and smooth user experiences.

**Project Name:** brians-playground

**Style:** Modern/minimal aesthetic with a darker color palette

**Pages:**
- Home
- About
- Apps

## Instructions for AI Agent

**IMPORTANT:** This spec requires human interaction at several points. When you reach steps marked with **"⏸️ HUMAN ACTION REQUIRED"**, you MUST:
1. Stop and clearly explain what the human needs to do
2. Provide the exact steps and any necessary information (URLs, commands, etc.)
3. Wait for the human to confirm they've completed the action before continuing
4. Do NOT attempt to automate UI interactions (clicking buttons in GitHub/Vercel, etc.)

**Human interaction points:**
- Creating the GitHub repository (manual UI interaction)
- Pushing code to GitHub (human runs git commands)
- Connecting repository to Vercel (manual UI interaction)
- Verifying the live deployment (human visits URL)

## Technology Stack

### Core
- **React** (v18.3.1) - UI framework
- **TypeScript** (v5.6.3) - Type-safe development
- **Vite** (v6.x) - Build tool and dev server

### UI & Styling
- **Tailwind CSS** (v4.x) - Utility-first CSS framework
- **Radix UI** - Accessible component primitives (dialogs, dropdowns, navigation menu, etc.)
- **Lucide React** - Icon library
- **Framer Motion** - Animation library for smooth transitions
- **clsx** + **tailwind-merge** - Conditional className utilities

### State Management
- **Zustand** (v5.x) - Lightweight state management (for navigation state, theme preferences, etc.)

## Project Structure

```
brians-playground/
├── public/
│   └── (static assets)
├── src/
│   ├── components/
│   │   ├── Navigation.tsx      # Menu icon + navigation drawer/menu
│   │   ├── Layout.tsx          # Main layout wrapper
│   │   └── ui/                 # Reusable UI components (buttons, cards, etc.)
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   └── Apps.tsx
│   ├── lib/
│   │   └── utils.ts            # Utility functions (cn() for className merging)
│   ├── store/
│   │   └── navigation.ts       # Zustand store for navigation state
│   ├── App.tsx                 # Main app with routing
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles + Tailwind imports
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Setup Instructions

### Initial Setup
```bash
# Create new Vite project with React + TypeScript
npm create vite@latest brians-playground -- --template react-ts
cd brians-playground

# Install dependencies
npm install

# Install UI libraries
npm install @radix-ui/react-navigation-menu @radix-ui/react-dialog @radix-ui/react-dropdown-menu
npm install lucide-react framer-motion zustand clsx tailwind-merge

# Install Tailwind CSS v4 (with Vite plugin)
npm install tailwindcss@next @tailwindcss/vite@next

# Install additional dev dependencies if needed
npm install -D @types/node
```

### Configuration Files

**vite.config.ts** - Configure Vite with Tailwind plugin
**tsconfig.json** - TypeScript configuration with path aliases (@/ for src/)
**tailwind.config.js** - Tailwind configuration with dark mode and custom theme
**postcss.config.js** - PostCSS configuration for Tailwind

## Page Descriptions

### Home Page
- Landing page with a welcoming introduction
- Eye-catching hero section
- Brief tagline or personal statement
- Content: TODO/filler text is fine
- Should feel inviting and set the tone for the site

### About Page
- Personal information and background
- Content: TODO/filler text is fine
- Use cards, sections, or creative layouts to present information
- Be creative with presentation

### Apps Page
- Showcase of mini-apps, projects, or interactive demos
- Could include simple interactive components, code examples, or project cards
- Content: TODO/filler - create 3-4 placeholder apps/projects
- Be creative with how these are displayed

## UI/UX Guidelines

### Navigation
- **Menu Icon** (hamburger or similar) that opens a navigation menu/drawer
- Navigation should be accessible from all pages
- Use Radix UI's Navigation Menu or Dialog component
- Consider mobile-first design

### Design System
- **Color Palette:** Modern/minimal with darker tones
  - Dark background (e.g., slate-900, zinc-900, or similar)
  - Light text for contrast
  - Subtle accent colors for interactive elements
  - Use Tailwind's built-in dark color scales
- **Typography:** Clean, readable fonts (system fonts or web-safe)
- **Spacing:** Generous whitespace, breathing room between elements
- **Components:** Use Radix UI primitives styled with Tailwind

### Interactivity
- **Be creative** with interactive features and animations
- Use Framer Motion for page transitions, hover effects, and micro-interactions
- Smooth, polished user experience
- Consider subtle animations that enhance UX without being distracting

### Responsiveness
- Mobile-first design
- Ensure all pages work well on mobile, tablet, and desktop
- Navigation should adapt to screen size

## Content Guidelines
- All content can be **TODO/filler text** (Lorem ipsum, placeholder text, etc.)
- Focus on structure and interaction rather than real content
- Use placeholder images if needed (or simple colored divs)
- The goal is to demonstrate the UI/UX capabilities

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Type checking
npm run tsc
```

## Deployment to Vercel via GitHub

### When to Deploy
Deploy **AFTER** you've completed building the site and tested it locally:
1. Build the project successfully (`npm run build`)
2. Test it works locally (`npm run preview`)
3. Fix any errors or issues
4. Then follow the deployment steps below

### Prerequisites
1. **GitHub Account** - Create one at [github.com](https://github.com) if you don't have one
2. **Vercel Account** - Sign up at [vercel.com](https://vercel.com) - **IMPORTANT:** Use the "Sign in with GitHub" option to link accounts from the start

### First-Time Setup (One-Time Only)

Before deploying your first project, you need to authorize Vercel to access your GitHub repositories:

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign in with GitHub"
3. Authorize Vercel to access your GitHub account (you'll see a GitHub permissions screen)
4. This creates the connection between Vercel and GitHub

**You only need to do this once!** After this, Vercel can access your repositories.

### Deployment Steps

#### 1. Initialize Git Repository (in your project directory)
The AI agent can run these commands:
```bash
git init
git add .
git commit -m "Initial commit: Brian's Playground"
```

#### 2. ⏸️ HUMAN ACTION REQUIRED: Create GitHub Repository

**AI Agent:** Stop here and ask the human to create the GitHub repository. Provide these instructions:

---
**Instructions for human:**

1. Go to [github.com](https://github.com) and sign in
2. Click the **"+"** icon (top-right) → **"New repository"**
3. Repository name: `brians-playground`
4. **IMPORTANT:** Do NOT check any boxes (no README, .gitignore, or license) - keep it completely empty
5. Click **"Create repository"**
6. **Copy the repository URL** from the "...or push an existing repository from the command line" section
   - It will look like: `https://github.com/YOUR_USERNAME/brians-playground.git`
7. Come back here and provide the repository URL

**AI Agent:** Wait for the human to provide the repository URL before continuing.

---

#### 3. ⏸️ HUMAN ACTION REQUIRED: Push Code to GitHub

**AI Agent:** Once you have the repository URL from the human, provide these commands for them to run:

```bash
git remote add origin <REPOSITORY_URL_FROM_HUMAN>
git branch -M main
git push -u origin main
```

Replace `<REPOSITORY_URL_FROM_HUMAN>` with the actual URL they provided.

**AI Agent:** Ask the human to run these commands in their terminal and confirm when the push is complete.

---

#### 4. ⏸️ HUMAN ACTION REQUIRED: Deploy to Vercel

**AI Agent:** Once the code is pushed to GitHub, ask the human to connect it to Vercel. Provide these instructions:

---
**Instructions for human:**

1. Go to [vercel.com](https://vercel.com) and sign in (use "Sign in with GitHub" if first time)
2. Click **"Add New..."** → **"Project"**
3. You'll see a list of your GitHub repositories
4. Find `brians-playground` and click **"Import"**
5. Vercel will auto-detect settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
6. **Don't change anything** - click **"Deploy"**
7. Wait 1-2 minutes for the build to complete
8. **Copy the deployment URL** (will look like: `https://brians-playground.vercel.app`)
9. Come back here and share the URL

**AI Agent:** Wait for the human to provide the deployment URL.

---

#### 5. ⏸️ HUMAN ACTION REQUIRED: Verify Deployment

**AI Agent:** Ask the human to visit the deployment URL and confirm the site is working correctly.

---
**Instructions for human:**

1. Visit your deployment URL: `<URL_FROM_PREVIOUS_STEP>`
2. Verify the site loads correctly
3. Test navigation between pages (Home, About, Apps)
4. Confirm the menu icon works
5. Report any issues you see

**AI Agent:** If there are issues, help debug. If everything works, congratulations! The deployment is complete.

---

### How Automatic Deployments Work (After Initial Setup)

**You only do step 4 once!** After that:

- Every time you `git push` to the `main` branch → Vercel automatically rebuilds and deploys
- Pull requests get **preview URLs** (unique URL for each PR to test before merging)
- View deployment status, logs, and history in your Vercel dashboard

**Workflow:**
```bash
# Make changes to your code
# ...

# Commit and push
git add .
git commit -m "Update homepage styling"
git push

# Vercel automatically deploys - that's it! ✨
```

### Viewing Deployments
- Go to [vercel.com](https://vercel.com) → Your project
- See all deployments, their status, and logs
- Click any deployment to see a preview
- Production deployments (from `main` branch) automatically go live

### Vercel Configuration (Optional)
Create `vercel.json` in project root for custom settings:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

## Additional Notes

### Build Output
- Vite builds the project into the `dist/` directory
- All assets are bundled and optimized for production
- The site is fully static - no server-side rendering needed

### Environment
- No environment variables needed for this static site
- No backend API endpoints
- No database connections
- Fully self-contained frontend application

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ JavaScript features via Vite
- CSS Grid and Flexbox for layouts

## Success Criteria

The completed project should:
1. ✅ Build successfully with `npm run build`
2. ✅ Run locally with `npm run dev`
3. ✅ Have three distinct pages (Home, About, Apps)
4. ✅ Include a menu icon navigation system
5. ✅ Use all specified technologies appropriately
6. ✅ Have a cohesive modern/minimal dark aesthetic
7. ✅ Be fully responsive (mobile, tablet, desktop)
8. ✅ Include creative interactive elements and animations
9. ✅ Deploy successfully to Vercel
10. ✅ Have no runtime errors or console warnings

## File Naming Conventions
- React components: PascalCase (e.g., `Navigation.tsx`, `HomePage.tsx`)
- Utility files: camelCase (e.g., `utils.ts`, `navigation.ts`)
- Config files: kebab-case (e.g., `vite.config.ts`, `tailwind.config.js`)

## Code Quality
- Use TypeScript for type safety
- Prefer functional components with hooks
- Use proper React patterns (composition, props, state management)
- Keep components focused and reusable
- Comment complex logic
- Use meaningful variable and function names

---

**End of Specification**

This document provides all necessary information to bootstrap the project from an empty directory. An AI agent should be able to read this specification and create a fully functional personal website ready for deployment to Vercel.
