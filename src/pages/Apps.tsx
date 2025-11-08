import { motion } from 'framer-motion'
import { Layout } from '@/components/Layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Calculator, Palette, GamepadIcon, Zap } from 'lucide-react'

export function Apps() {
  const handleAppClick = (title: string, status: string) => {
    if (status === 'TODO') {
      alert(`${title} - Coming soon! This app is currently in development.`)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const projects = [
    {
      icon: Calculator,
      title: 'Calculator Pro',
      description: 'A modern, feature-rich calculator with advanced mathematical functions and a beautiful interface.',
      tags: ['React', 'TypeScript', 'Tailwind'],
      color: 'from-blue-500 to-cyan-500',
      status: 'TODO',
    },
    {
      icon: Palette,
      title: 'Color Studio',
      description: 'Interactive color palette generator with real-time preview and export capabilities.',
      tags: ['React', 'Color Theory', 'UI/UX'],
      color: 'from-purple-500 to-pink-500',
      status: 'TODO',
    },
    {
      icon: GamepadIcon,
      title: 'Mini Game Hub',
      description: 'Collection of fun, interactive mini-games built with modern web technologies.',
      tags: ['React', 'Canvas API', 'Game Dev'],
      color: 'from-green-500 to-emerald-500',
      status: 'TODO',
    },
    {
      icon: Zap,
      title: 'Performance Analyzer',
      description: 'Web performance analysis tool with real-time metrics and optimization suggestions.',
      tags: ['Performance', 'Analytics', 'DevTools'],
      color: 'from-orange-500 to-red-500',
      status: 'TODO',
    },
  ]

  return (
    <Layout>
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Apps & Projects
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              A showcase of interactive applications and experimental projects. Click on any card to explore.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
          >
            {projects.map((project) => (
              <motion.div
                key={project.title}
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -8 }}
                transition={{ type: 'spring', stiffness: 300 }}
                role="button"
                tabIndex={0}
                onClick={() => handleAppClick(project.title, project.status)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleAppClick(project.title, project.status)
                  }
                }}
                aria-label={`${project.title} - ${project.description}. Status: ${project.status}`}
              >
                <Card variant="elevated" className="h-full cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${project.color}`}>
                        <project.icon size={28} className="text-white" aria-hidden="true" />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-400 text-xs font-medium border border-slate-700">
                        {project.status}
                      </span>
                    </div>
                    <CardTitle className="group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full bg-slate-800/50 text-slate-300 text-xs border border-slate-700/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div variants={itemVariants} className="text-center mt-16">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-semibold text-white mb-3">
                  More Coming Soon!
                </h3>
                <p className="text-slate-400 mb-6">
                  This is just the beginning. New apps and projects are constantly being added to the playground.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  {['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Zustand'].map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-sm border border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  )
}
