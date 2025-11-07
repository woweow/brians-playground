import { motion } from 'framer-motion'
import { Calculator, Palette, Github, ExternalLink } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export function Apps() {
  const projects = [
    {
      icon: Calculator,
      title: 'Smart Calculator',
      description: 'An advanced calculator with history tracking, scientific functions, and a beautiful interface.',
      color: 'from-blue-500 to-cyan-500',
      tags: ['React', 'TypeScript', 'Math.js'],
    },
    {
      icon: Palette,
      title: 'Color Palette Generator',
      description: 'Generate beautiful color palettes, explore color theory, and export for your projects.',
      color: 'from-purple-500 to-pink-500',
      tags: ['React', 'Color Theory', 'Export'],
    },
    {
      icon: Github,
      title: 'GitHub Explorer',
      description: 'Browse GitHub repositories, view stats, and discover trending projects with an intuitive UI.',
      color: 'from-green-500 to-emerald-500',
      tags: ['React', 'GitHub API', 'Charts'],
    },
    {
      icon: ExternalLink,
      title: 'Link Shortener',
      description: 'Create short, memorable links with custom aliases, QR codes, and click analytics.',
      color: 'from-orange-500 to-red-500',
      tags: ['React', 'Analytics', 'QR Codes'],
    },
  ]

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Apps & Projects
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            A collection of interactive applications and experiments. Click on any project to learn more.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => {
            const Icon = project.icon
            return (
              <motion.div
                key={project.title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card className="h-full hover:border-slate-700 transition-all cursor-pointer group">
                  <CardHeader>
                    <motion.div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center mb-4`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </motion.div>
                    <CardTitle className="group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-medium bg-slate-800 text-slate-300 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Button variant="ghost" size="sm" className="w-full group-hover:bg-slate-800">
                      View Project
                      <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Interactive Demo Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16"
        >
          <Card className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4 text-slate-50">More Coming Soon!</h2>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              I'm constantly working on new projects and experiments. Check back regularly to see what's new,
              or follow me on GitHub to stay updated with the latest developments.
            </p>
            <Button size="lg">
              <Github className="mr-2 w-5 h-5" />
              Follow on GitHub
            </Button>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
