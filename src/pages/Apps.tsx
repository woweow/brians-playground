import { motion } from 'framer-motion'
import { Calculator, ExternalLink, Cat } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useNavigationStore } from '@/store/navigation'

export function Apps() {
  const { setCurrentPage } = useNavigationStore()

  const projects = [
    {
      icon: Calculator,
      title: 'Cyber Calc',
      description: 'A futuristic cyberpunk calculator with neon glows, particle effects, glass morphism, and smooth animations. Try calculating 69 or 420 for a surprise! 🧩',
      color: 'from-cyan-500 to-purple-500',
      tags: ['React', 'TypeScript'],
      page: 'calculator' as const,
    },
    {
      icon: Cat,
      title: 'Rat Catcher',
      description: 'A fun, interactive game where you control a cat to catch rats. Test your reflexes and beat your high score!',
      color: 'from-emerald-500 to-teal-500',
      tags: ['React', 'TypeScript', 'Game'],
      page: 'ratcatcher' as const,
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

        <div className="grid grid-cols-1 gap-6 max-w-md mx-auto">
          {projects.map((project, index) => {
            const Icon = project.icon
            return (
              <motion.div
                key={project.title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -8 }}
                onClick={() => setCurrentPage(project.page)}
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

      </div>
    </div>
  )
}
