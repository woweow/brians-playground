import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, Code2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useNavigationStore } from '@/store/navigation'

export function Home() {
  const { setCurrentPage } = useNavigationStore()

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-block"
        >
          <div className="relative">
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-2xl opacity-30"
            />
            <div className="relative bg-slate-900 p-6 rounded-full border border-slate-800">
              <Sparkles className="w-16 h-16 text-blue-400" />
            </div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
        >
          Welcome to my sandbox
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl mx-auto"
        >
          A place for experimentation and exploration. The Apps section is where my random projects live.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            size="lg"
            onClick={() => setCurrentPage('apps')}
            className="group"
          >
            Explore Apps
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => setCurrentPage('about')}
            className="group"
          >
            About Me
            <Code2 className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>

        {/* Floating elements */}
        <div className="mt-20 flex justify-center gap-8 flex-wrap">
          {['React', 'TypeScript', 'Tailwind'].map((tech, i) => (
            <motion.div
              key={tech}
              initial={{ y: 0 }}
              animate={{ y: [-10, 10, -10] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
              className="px-6 py-3 bg-slate-900/50 border border-slate-800 rounded-lg backdrop-blur"
            >
              <span className="text-slate-400 font-medium">{tech}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
