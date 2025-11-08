import { motion } from 'framer-motion'
import { Layout } from '@/components/Layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Github, Linkedin, Mail, Twitter } from 'lucide-react'

export function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const skills = [
    { category: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'] },
    { category: 'Backend', items: ['Node.js', 'Python', 'PostgreSQL', 'GraphQL'] },
    { category: 'Tools', items: ['Git', 'Docker', 'Vite', 'Figma'] },
    { category: 'Interests', items: ['UI/UX Design', 'Animation', 'Web Performance', 'Accessibility'] },
  ]

  const socialLinks = [
    { icon: Github, label: 'GitHub' },
    { icon: Twitter, label: 'Twitter' },
    { icon: Linkedin, label: 'LinkedIn' },
    { icon: Mail, label: 'Email' },
  ]

  const handleSocialClick = (label: string) => {
    alert(`${label} link - Coming soon! Add your profile link in About.tsx`)
  }

  return (
    <Layout>
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-lime-300 via-lime-400 to-lime-500 bg-clip-text text-transparent">
              About Me
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              TODO: Add your personal story, background, and what drives you as a developer.
            </p>
          </motion.div>

          {/* Bio Section */}
          <motion.div variants={itemVariants} className="mb-12">
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Who I Am</CardTitle>
                <CardDescription>A brief introduction</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-slate-300">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                </p>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Skills Grid */}
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Skills & Expertise</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {skills.map((skillGroup) => (
                <motion.div
                  key={skillGroup.category}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">{skillGroup.category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((item) => (
                          <span
                            key={item}
                            className="px-3 py-1.5 rounded-full bg-lime-400/10 text-lime-300 text-sm border border-lime-400/30"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Experience/Timeline */}
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Experience</h2>
            <Card variant="elevated">
              <CardContent className="pt-6">
                <div className="space-y-8">
                  {[
                    {
                      title: 'Senior Developer',
                      company: 'Tech Company',
                      period: '2022 - Present',
                      description: 'TODO: Add your experience and achievements here.',
                    },
                    {
                      title: 'Developer',
                      company: 'Startup Inc',
                      period: '2020 - 2022',
                      description: 'TODO: Describe your role and accomplishments.',
                    },
                    {
                      title: 'Junior Developer',
                      company: 'Digital Agency',
                      period: '2018 - 2020',
                      description: 'TODO: Share what you learned and built.',
                    },
                  ].map((job, index) => (
                    <div key={index} className="relative pl-8 border-l-2 border-lime-400/30">
                      <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-lime-400" />
                      <h3 className="text-xl font-semibold text-white">{job.title}</h3>
                      <p className="text-lime-400 mb-2">{job.company} • {job.period}</p>
                      <p className="text-slate-400">{job.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Let&rsquo;s Connect</h2>
            <div className="flex justify-center gap-4 flex-wrap">
              {socialLinks.map((social) => (
                <motion.button
                  key={social.label}
                  onClick={() => handleSocialClick(social.label)}
                  whileHover={{ scale: 1.1, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-800 text-slate-300 hover:bg-lime-400 hover:text-slate-950 transition-colors duration-200 border border-slate-700 hover:border-lime-400"
                  aria-label={`Connect on ${social.label}`}
                >
                  <social.icon size={20} aria-hidden="true" />
                  <span>{social.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  )
}
