import { motion } from 'framer-motion'
import { Coffee, Zap, Heart, Rocket } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'

export function About() {
  const skills = [
    { name: 'Frontend Development', level: 90 },
    { name: 'React & TypeScript', level: 85 },
    { name: 'UI/UX Design', level: 75 },
    { name: 'Animation & Motion', level: 80 },
  ]

  const values = [
    {
      icon: Coffee,
      title: 'Passion',
      description: 'Driven by curiosity and a love for creating beautiful, functional experiences.',
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Always exploring new technologies and pushing the boundaries of what\'s possible.',
    },
    {
      icon: Heart,
      title: 'Quality',
      description: 'Committed to writing clean, maintainable code and delivering polished products.',
    },
    {
      icon: Rocket,
      title: 'Growth',
      description: 'Constantly learning and evolving to stay ahead in the ever-changing tech landscape.',
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
            About Me
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            A passionate developer crafting exceptional digital experiences with modern web technologies.
          </p>
        </motion.div>

        {/* Bio Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-12"
        >
          <Card className="p-8">
            <h2 className="text-3xl font-bold mb-4 text-slate-50">Hey there! 👋</h2>
            <div className="text-slate-300 space-y-4">
              <p>
                I'm a developer who loves building things for the web. My journey in tech started with a simple
                curiosity about how websites work, and it's evolved into a passion for creating seamless,
                beautiful user experiences.
              </p>
              <p>
                When I'm not coding, you can find me exploring new technologies, contributing to open source,
                or enjoying a good cup of coffee while brainstorming the next big idea.
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold mb-6 text-slate-50">Skills</h2>
          <div className="space-y-4">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-200 font-medium">{skill.name}</span>
                  <span className="text-slate-400 text-sm">{skill.level}%</span>
                </div>
                <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Values Grid */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-slate-50">What I Value</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full hover:border-slate-700 transition-colors">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-blue-400" />
                      </div>
                      <CardTitle>{value.title}</CardTitle>
                      <CardDescription>{value.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
