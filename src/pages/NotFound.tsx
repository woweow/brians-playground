import { motion } from 'framer-motion'
import { Layout } from '@/components/Layout'
import { Button } from '@/components/ui/Button'
import { useNavigationStore } from '@/store/navigation'
import { Home, ArrowLeft, Search } from 'lucide-react'

export function NotFound() {
  const { setCurrentPage } = useNavigationStore()

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* 404 Icon */}
            <motion.div
              className="inline-flex items-center justify-center w-32 h-32 mb-8 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-blue-500/30"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Search size={64} className="text-blue-400" />
            </motion.div>

            {/* 404 Title */}
            <h1 className="text-8xl sm:text-9xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              404
            </h1>

            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Page Not Found
            </h2>

            {/* Description */}
            <p className="text-xl text-slate-400 mb-12 max-w-lg mx-auto">
              Oops! The page you&rsquo;re looking for doesn&rsquo;t exist. It might have been moved or deleted.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  onClick={() => setCurrentPage('home')}
                  className="gap-2"
                  aria-label="Go to home page"
                >
                  <Home size={20} />
                  Go to Home
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => window.history.back()}
                  className="gap-2"
                  aria-label="Go back to previous page"
                >
                  <ArrowLeft size={20} />
                  Go Back
                </Button>
              </motion.div>
            </div>

            {/* Helpful Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-16 p-6 rounded-xl bg-slate-900/50 border border-slate-800"
            >
              <h3 className="text-lg font-semibold text-white mb-4">
                You might be looking for:
              </h3>
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={() => setCurrentPage('home')}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors text-sm"
                >
                  Home
                </button>
                <button
                  onClick={() => setCurrentPage('about')}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors text-sm"
                >
                  About
                </button>
                <button
                  onClick={() => setCurrentPage('apps')}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors text-sm"
                >
                  Apps
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}
