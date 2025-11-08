import { motion } from 'framer-motion'
import { Layout } from '@/components/Layout'
import { Button } from '@/components/ui/Button'
import { useNavigationStore } from '@/store/navigation'
import { ArrowRight, Code2, Sparkles, Palette, Zap, Rocket } from 'lucide-react'

export function Home() {
  const { setCurrentPage } = useNavigationStore()

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Icon */}
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 mb-8 rounded-full bg-gradient-to-br from-lime-400 to-lime-500"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <Code2 size={40} className="text-slate-950" />
            </motion.div>

            {/* Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-lime-300 via-lime-400 to-lime-500 bg-clip-text text-transparent">
              Welcome to Brian&rsquo;s Playground
            </h1>

            {/* Tagline */}
            <p className="text-xl sm:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto">
              A modern, minimal personal space for exploring creative ideas, interactive components, and experimental projects.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  onClick={() => setCurrentPage('about')}
                  className="gap-2"
                >
                  Learn More
                  <ArrowRight size={20} />
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => setCurrentPage('apps')}
                  className="gap-2"
                >
                  <Sparkles size={20} />
                  Explore Apps
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {[
              {
                icon: Palette,
                title: 'Modern Design',
                description: 'Clean, minimal aesthetic with smooth animations',
              },
              {
                icon: Zap,
                title: 'Fast & Responsive',
                description: 'Optimized for all devices and screen sizes',
              },
              {
                icon: Rocket,
                title: 'Interactive',
                description: 'Engaging UI components and experiences',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm hover:border-lime-400/30 transition-colors duration-300"
              >
                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-gradient-to-br from-lime-400 to-lime-500">
                  <feature.icon size={24} className="text-slate-950" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}
