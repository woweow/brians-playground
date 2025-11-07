import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'

export function About() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            About Me
          </h1>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card className="p-8">
            <div className="text-slate-300 space-y-4">
              <p className="text-xl">
                I'm an AI enthusiast who works at SoFi.
              </p>
              <p className="text-slate-400">
                Follow me on Twitter:{' '}
                <a
                  href="https://twitter.com/brianfell_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  @brianfell_
                </a>
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
