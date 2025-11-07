import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AppLayout } from '@/components/AppLayout'
import { Cat, Rat } from 'lucide-react'

interface Position {
  x: number
  y: number
}

interface RatState {
  initial: Position  // Where rat enters from (off-screen edge)
  final: Position    // Where rat settles (on-screen)
}

export function RatCatcher() {
  const [score, setScore] = useState(0)
  const [catPosition, setCatPosition] = useState<Position>({ x: 0, y: 0 })
  const [ratState, setRatState] = useState<RatState>({
    initial: { x: 0, y: 0 },
    final: { x: 0, y: 0 }
  })
  const [catchAnimation, setCatchAnimation] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [highScore, setHighScore] = useState(0)
  const gameAreaRef = useRef<HTMLDivElement>(null)
  const isTouching = useRef(false)
  const hasBeenCaught = useRef(false)

  // Load high score from localStorage
  useEffect(() => {
    const savedHighScore = localStorage.getItem('ratCatcherHighScore')
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10))
    }
  }, [])

  // Update high score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score)
      localStorage.setItem('ratCatcherHighScore', score.toString())
    }
  }, [score, highScore])

  // Generate random position for rat (final position on screen)
  const generateRandomPosition = useCallback((): Position => {
    if (!gameAreaRef.current) return { x: 0, y: 0 }

    const rect = gameAreaRef.current.getBoundingClientRect()
    const padding = 60 // Keep rat away from edges

    return {
      x: Math.random() * (rect.width - padding * 2) + padding,
      y: Math.random() * (rect.height - padding * 2) + padding,
    }
  }, [])

  // Generate random edge position for rat to enter from
  const generateEdgePosition = useCallback((): Position => {
    if (!gameAreaRef.current) return { x: -100, y: 0 }

    const rect = gameAreaRef.current.getBoundingClientRect()
    const edge = Math.floor(Math.random() * 4) // 0: top, 1: right, 2: bottom, 3: left
    const offset = 100 // How far off-screen to start

    switch (edge) {
      case 0: // Top edge
        return {
          x: Math.random() * rect.width,
          y: -offset
        }
      case 1: // Right edge
        return {
          x: rect.width + offset,
          y: Math.random() * rect.height
        }
      case 2: // Bottom edge
        return {
          x: Math.random() * rect.width,
          y: rect.height + offset
        }
      case 3: // Left edge
      default:
        return {
          x: -offset,
          y: Math.random() * rect.height
        }
    }
  }, [])

  // Generate complete rat state (initial edge position + final on-screen position)
  const generateRatState = useCallback((): RatState => {
    return {
      initial: generateEdgePosition(),
      final: generateRandomPosition()
    }
  }, [generateEdgePosition, generateRandomPosition])

  // Initialize rat state
  useEffect(() => {
    setRatState(generateRatState())
  }, [generateRatState])

  // Check collision between cat and rat
  const checkCollision = useCallback(() => {
    const distance = Math.sqrt(
      Math.pow(catPosition.x - ratState.final.x, 2) +
      Math.pow(catPosition.y - ratState.final.y, 2)
    )

    // Collision threshold (size of cat + rat icons)
    return distance < 45
  }, [catPosition, ratState.final])

  // Handle mouse movement
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!gameAreaRef.current) return

    const rect = gameAreaRef.current.getBoundingClientRect()
    setCatPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })

    if (!gameStarted) setGameStarted(true)
  }, [gameStarted])

  // Handle touch movement
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!gameAreaRef.current || !isTouching.current) return

    e.preventDefault()
    const touch = e.touches[0]
    const rect = gameAreaRef.current.getBoundingClientRect()

    setCatPosition({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    })

    if (!gameStarted) setGameStarted(true)
  }, [gameStarted])

  // Handle touch start
  const handleTouchStart = useCallback((e: TouchEvent) => {
    isTouching.current = true
    if (!gameAreaRef.current) return

    const touch = e.touches[0]
    const rect = gameAreaRef.current.getBoundingClientRect()

    setCatPosition({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    })

    if (!gameStarted) setGameStarted(true)
  }, [gameStarted])

  // Handle touch end
  const handleTouchEnd = useCallback(() => {
    isTouching.current = false
  }, [])

  // Add event listeners
  useEffect(() => {
    const gameArea = gameAreaRef.current
    if (!gameArea) return

    gameArea.addEventListener('mousemove', handleMouseMove)
    gameArea.addEventListener('touchstart', handleTouchStart, { passive: false })
    gameArea.addEventListener('touchmove', handleTouchMove, { passive: false })
    gameArea.addEventListener('touchend', handleTouchEnd)

    return () => {
      gameArea.removeEventListener('mousemove', handleMouseMove)
      gameArea.removeEventListener('touchstart', handleTouchStart)
      gameArea.removeEventListener('touchmove', handleTouchMove)
      gameArea.removeEventListener('touchend', handleTouchEnd)
    }
  }, [handleMouseMove, handleTouchMove, handleTouchStart, handleTouchEnd])

  // Check for collisions
  useEffect(() => {
    if (!gameStarted) return

    if (checkCollision() && !hasBeenCaught.current) {
      // Mark this rat as caught to prevent multiple increments
      hasBeenCaught.current = true

      // Trigger catch animation
      setCatchAnimation(true)

      // Increment score by exactly 1
      setScore((prev) => prev + 1)

      // Generate new rat state after a short delay
      setTimeout(() => {
        setRatState(generateRatState())
        setCatchAnimation(false)
        hasBeenCaught.current = false // Reset for next rat
      }, 200)
    }
  }, [catPosition, checkCollision, generateRatState, gameStarted])

  // Reset game
  const resetGame = () => {
    setScore(0)
    setGameStarted(false)
    setRatState(generateRatState())
    hasBeenCaught.current = false
  }

  return (
    <AppLayout>
      <div
        ref={gameAreaRef}
        className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 cursor-none select-none touch-none"
        style={{ touchAction: 'none' }}
      >
        {/* Score Display */}
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="absolute top-6 left-6 z-20 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border-2 border-emerald-200"
        >
          <div className="flex flex-col gap-2">
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">Score</div>
              <div className="text-4xl font-bold text-emerald-600">{score}</div>
            </div>
            <div className="border-t border-gray-200 pt-2">
              <div className="text-xs font-medium text-gray-400">High Score</div>
              <div className="text-xl font-bold text-gray-600">{highScore}</div>
            </div>
          </div>
        </motion.div>

        {/* Reset Button */}
        <motion.button
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          onClick={resetGame}
          className="absolute top-6 right-6 z-20 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg px-6 py-3 border-2 border-rose-200 hover:bg-rose-50 transition-colors font-semibold text-rose-600"
        >
          Reset Game
        </motion.button>

        {/* Instructions */}
        {!gameStarted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-2 border-emerald-300 max-w-md text-center"
          >
            <Cat className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Rat Catcher</h2>
            <p className="text-gray-600 mb-2">
              Move your mouse (or touch and drag) to control the cat.
            </p>
            <p className="text-gray-600 mb-4">
              Catch the rats to earn points!
            </p>
            <div className="text-sm text-gray-500 bg-emerald-50 rounded-lg p-3">
              Start moving to begin playing
            </div>
          </motion.div>
        )}

        {/* Rat */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`rat-${ratState.final.x}-${ratState.final.y}`}
            initial={{
              scale: 0.5,
              rotate: -180,
              x: ratState.initial.x - 20,
              y: ratState.initial.y - 20,
            }}
            animate={{
              scale: catchAnimation ? 0 : 1,
              rotate: catchAnimation ? 180 : 0,
              x: ratState.final.x - 20,
              y: ratState.final.y - 20,
            }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20,
            }}
            className="absolute z-10 pointer-events-none"
          >
            <motion.div
              animate={{
                rotate: [0, -10, 10, -10, 0],
                y: [0, -3, 0, -3, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Rat className="w-10 h-10 text-gray-700 drop-shadow-lg" />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Cat Cursor */}
        {gameStarted && (
          <motion.div
            animate={{
              x: catPosition.x - 24,
              y: catPosition.y - 24,
            }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
              mass: 0.5,
            }}
            className="absolute z-20 pointer-events-none"
          >
            <motion.div
              animate={{
                rotate: catchAnimation ? [0, -20, 20, -20, 20, 0] : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <Cat className="w-12 h-12 text-emerald-600 drop-shadow-xl" />
            </motion.div>
          </motion.div>
        )}

        {/* Catch Effect */}
        <AnimatePresence>
          {catchAnimation && (
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute z-15 pointer-events-none"
              style={{
                left: ratState.final.x - 30,
                top: ratState.final.y - 30,
              }}
            >
              <div className="w-16 h-16 rounded-full bg-emerald-400/50 blur-xl" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Score Pop Animation */}
        <AnimatePresence>
          {catchAnimation && (
            <motion.div
              initial={{ y: 0, opacity: 1, scale: 1 }}
              animate={{ y: -50, opacity: 0, scale: 1.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute z-25 pointer-events-none font-bold text-3xl text-emerald-600"
              style={{
                left: ratState.final.x - 20,
                top: ratState.final.y - 40,
              }}
            >
              +1
            </motion.div>
          )}
        </AnimatePresence>

        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-emerald-300/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
