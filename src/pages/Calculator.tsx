import { useState, useCallback, memo, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AppLayout } from '@/components/AppLayout'
import { Home, Zap } from 'lucide-react'
import { useNavigationStore } from '@/store/navigation'
import { cn } from '@/lib/utils'
import html2canvas from 'html2canvas'

// Helper functions for crack generation
const generateCrackLines = (centerX: number, centerY: number, width: number, _height: number) => {
  const lines: Array<{path: string, delay: number}> = []
  const numMainCracks = 8 + Math.floor(Math.random() * 4) // 8-11 main cracks

  for (let i = 0; i < numMainCracks; i++) {
    const angle = (i / numMainCracks) * Math.PI * 2 + (Math.random() - 0.5) * 0.3
    const length = (width * 0.4) + Math.random() * (width * 0.3)
    const endX = centerX + Math.cos(angle) * length
    const endY = centerY + Math.sin(angle) * length

    // Create jagged path
    const segments = 5 + Math.floor(Math.random() * 3)
    let path = `M ${centerX} ${centerY}`

    for (let j = 1; j <= segments; j++) {
      const progress = j / segments
      const x = centerX + (endX - centerX) * progress + (Math.random() - 0.5) * 20
      const y = centerY + (endY - centerY) * progress + (Math.random() - 0.5) * 20
      path += ` L ${x} ${y}`
    }

    lines.push({ path, delay: i * 0.015 })

    // Add branching cracks
    if (Math.random() > 0.5) {
      const branchProgress = 0.4 + Math.random() * 0.3
      const branchX = centerX + (endX - centerX) * branchProgress
      const branchY = centerY + (endY - centerY) * branchProgress
      const branchAngle = angle + (Math.random() - 0.5) * Math.PI / 2
      const branchLength = length * (0.3 + Math.random() * 0.3)

      let branchPath = `M ${branchX} ${branchY}`
      const branchSegments = 3
      for (let k = 1; k <= branchSegments; k++) {
        const bProgress = k / branchSegments
        const bx = branchX + Math.cos(branchAngle) * branchLength * bProgress + (Math.random() - 0.5) * 15
        const by = branchY + Math.sin(branchAngle) * branchLength * bProgress + (Math.random() - 0.5) * 15
        branchPath += ` L ${bx} ${by}`
      }
      lines.push({ path: branchPath, delay: i * 0.015 + 0.05 })
    }
  }

  return lines
}

// Generate irregular polygon pieces for shattering
const generateShatterPieces = (width: number, height: number, imageData: string) => {
  const pieces: Array<{
    id: number
    clipPath: string
    centerX: number
    centerY: number
    rotation: number
    velocity: {x: number, y: number}
    imageData: string
  }> = []

  // Create a Voronoi-like pattern with random seed points
  const numPieces = 16 + Math.floor(Math.random() * 6) // 16-21 pieces
  const seedPoints: Array<{x: number, y: number}> = []

  // Generate seed points in a grid-ish pattern with randomness
  const gridSize = Math.ceil(Math.sqrt(numPieces))
  for (let i = 0; i < numPieces; i++) {
    const row = Math.floor(i / gridSize)
    const col = i % gridSize
    const x = (col / gridSize) * width + (Math.random() - 0.5) * (width / gridSize) * 0.8
    const y = (row / gridSize) * height + (Math.random() - 0.5) * (height / gridSize) * 0.8
    seedPoints.push({ x: Math.max(0, Math.min(width, x)), y: Math.max(0, Math.min(height, y)) })
  }

  // Create polygon for each seed point using simplified Voronoi
  seedPoints.forEach((seed, idx) => {
    // Create irregular polygon around seed point
    const numVertices = 5 + Math.floor(Math.random() * 3) // 5-7 vertices
    const vertices: Array<{x: number, y: number}> = []
    const baseRadius = Math.min(width, height) / gridSize * 0.8

    for (let i = 0; i < numVertices; i++) {
      const angle = (i / numVertices) * Math.PI * 2
      const radius = baseRadius * (0.7 + Math.random() * 0.6)
      const x = seed.x + Math.cos(angle) * radius
      const y = seed.y + Math.sin(angle) * radius
      vertices.push({
        x: Math.max(0, Math.min(width, x)),
        y: Math.max(0, Math.min(height, y))
      })
    }

    // Create clip-path polygon
    const clipPath = vertices.map(v => `${(v.x / width * 100).toFixed(2)}% ${(v.y / height * 100).toFixed(2)}%`).join(', ')

    // Calculate explosion velocity from center
    const centerX = width / 2
    const centerY = height / 2
    const angle = Math.atan2(seed.y - centerY, seed.x - centerX)
    const velocityMagnitude = 300 + Math.random() * 400

    pieces.push({
      id: idx,
      clipPath: `polygon(${clipPath})`,
      centerX: (seed.x / width * 100),
      centerY: (seed.y / height * 100),
      rotation: (Math.random() - 0.5) * 720,
      velocity: {
        x: Math.cos(angle) * velocityMagnitude,
        y: Math.sin(angle) * velocityMagnitude - 200 // Initial upward thrust
      },
      imageData
    })
  })

  return pieces
}

export function Calculator() {
  const { setCurrentPage } = useNavigationStore()
  const calculatorRef = useRef<HTMLDivElement>(null)
  const shatterTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [display, setDisplay] = useState('0')
  const [equation, setEquation] = useState('')
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false)

  // New shatter animation state
  const [_capturedImage, setCapturedImage] = useState<string | null>(null)
  const [crackLines, setCrackLines] = useState<Array<{path: string, delay: number}> | null>(null)
  const [shatterPieces, setShatterPieces] = useState<Array<{
    id: number
    clipPath: string
    centerX: number
    centerY: number
    rotation: number
    velocity: {x: number, y: number}
    imageData: string
  }> | null>(null)
  const [isShattered, setIsShattered] = useState(false)
  const [showCracks, setShowCracks] = useState(false)

  useEffect(() => {
    return () => {
      if (shatterTimeoutRef.current) {
        clearTimeout(shatterTimeoutRef.current)
        shatterTimeoutRef.current = null
      }
    }
  }, [])

  const handleNumber = useCallback((num: string) => {
    setDisplay(prev => {
      if (shouldResetDisplay) {
        setShouldResetDisplay(false)
        return num
      }
      return prev === '0' ? num : prev + num
    })
  }, [shouldResetDisplay])

  const handleEquals = useCallback(async () => {
    if (previousValue === null || operation === null) return

    const current = parseFloat(display)
    let result = 0

    switch (operation) {
      case '+':
        result = previousValue + current
        break
      case '-':
        result = previousValue - current
        break
      case '*':
        result = previousValue * current
        break
      case '/':
        result = previousValue / current
        break
    }

    setDisplay(String(result))
    setEquation(`${previousValue} ${operation} ${current} =`)
    setPreviousValue(null)
    setOperation(null)
    setShouldResetDisplay(true)

    if (result === 69 || result === 420) {
      if (calculatorRef.current) {
        try {
          const canvas = await html2canvas(calculatorRef.current, {
            backgroundColor: 'transparent',
            scale: 2,
            logging: false,
          })
          const imageData = canvas.toDataURL('image/png')
          setCapturedImage(imageData)

          const rect = calculatorRef.current.getBoundingClientRect()
          const centerX = rect.width / 2
          const centerY = rect.height / 2

          const cracks = generateCrackLines(centerX, centerY, rect.width, rect.height)
          setCrackLines(cracks)
          setShowCracks(true)

          if (shatterTimeoutRef.current) {
            clearTimeout(shatterTimeoutRef.current)
          }

          shatterTimeoutRef.current = setTimeout(() => {
            const pieces = generateShatterPieces(rect.width, rect.height, imageData)
            setShatterPieces(pieces)
            setIsShattered(true)
            setShowCracks(false)
            shatterTimeoutRef.current = null
          }, 400)
        } catch (error) {
          console.error('Failed to capture calculator:', error)
        }
      }
    }
  }, [previousValue, operation, display])

  const handleOperation = useCallback((op: string) => {
    const current = parseFloat(display)

    if (previousValue !== null && operation && !shouldResetDisplay) {
      handleEquals()
    } else {
      setPreviousValue(current)
      setOperation(op)
      setEquation(`${current} ${op}`)
      setShouldResetDisplay(true)
    }
  }, [display, previousValue, operation, shouldResetDisplay, handleEquals])

  const handleClear = useCallback(() => {
    setDisplay('0')
    setEquation('')
    setPreviousValue(null)
    setOperation(null)
    setShouldResetDisplay(false)
  }, [])

  const handleDecimal = useCallback(() => {
    setDisplay(prev => {
      if (shouldResetDisplay) {
        setShouldResetDisplay(false)
        return '0.'
      }
      return prev.includes('.') ? prev : prev + '.'
    })
  }, [shouldResetDisplay])

  const handleBackspace = useCallback(() => {
    setDisplay(prev => prev.length === 1 ? '0' : prev.slice(0, -1))
  }, [])

  const CalcButton = memo(({
    children,
    onClick,
    className,
    variant = 'default'
  }: {
    children: React.ReactNode
    onClick: (e: React.MouseEvent) => void
    className?: string
    variant?: 'default' | 'operator' | 'equals' | 'clear'
  }) => {
    const variants = {
      default: 'bg-slate-800/50 hover:bg-slate-700/50 text-cyan-100 border-cyan-500/30 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]',
      operator: 'bg-purple-900/50 hover:bg-purple-800/50 text-purple-100 border-purple-500/30 hover:border-purple-400/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]',
      equals: 'bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.5)] hover:shadow-[0_0_40px_rgba(34,211,238,0.7)]',
      clear: 'bg-red-900/50 hover:bg-red-800/50 text-red-100 border-red-500/30 hover:border-red-400/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]',
    }

    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.1 }}
        onClick={onClick}
        className={cn(
          'relative overflow-hidden rounded-xl border-2 p-4 text-xl font-bold transition-all duration-150 backdrop-blur-sm',
          variants[variant],
          className
        )}
      >
        {children}
      </motion.button>
    )
  })

  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 relative overflow-hidden" style={{pointerEvents: isShattered ? 'none' : 'auto'}}>
        {/* PHASE 1: CRACK LINES ANIMATION */}
        {showCracks && crackLines && calculatorRef.current && (
          <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
            <svg
              width={calculatorRef.current.offsetWidth}
              height={calculatorRef.current.offsetHeight}
              className="absolute"
              style={{
                filter: 'drop-shadow(0 0 8px rgba(34,211,238,0.8))',
              }}
            >
              {crackLines.map((crack, idx) => (
                <motion.path
                  key={idx}
                  d={crack.path}
                  stroke="rgba(255,255,255,0.9)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    pathLength: { duration: 0.3, delay: crack.delay, ease: 'easeOut' },
                    opacity: { duration: 0.1, delay: crack.delay }
                  }}
                />
              ))}
            </svg>
          </div>
        )}

        {/* PHASE 2 & 3: SHATTER AND FALL */}
        {isShattered && shatterPieces && calculatorRef.current && (
          <>
            {/* Bright flash burst */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 2, 3] }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none"
              style={{
                width: '500px',
                height: '500px',
                background: 'radial-gradient(circle, rgba(34,211,238,0.9), transparent)',
                filter: 'blur(60px)',
              }}
            />

            {/* Shattered pieces with actual calculator content */}
            {shatterPieces.map(piece => {
              const rect = calculatorRef.current!.getBoundingClientRect()
              const startX = rect.left
              const startY = rect.top

              return (
                <motion.div
                  key={piece.id}
                  initial={{
                    x: startX,
                    y: startY,
                    opacity: 1,
                    rotate: 0,
                  }}
                  animate={{
                    x: startX + piece.velocity.x,
                    y: [
                      startY,
                      startY + piece.velocity.y,
                      startY + piece.velocity.y + window.innerHeight * 1.5 // Fall off screen
                    ],
                    opacity: [1, 1, 0.7, 0],
                    rotate: piece.rotation,
                  }}
                  transition={{
                    duration: 2.5,
                    delay: piece.id * 0.02,
                    ease: 'easeIn',
                    y: {
                      duration: 2.5,
                      ease: [0.25, 0.46, 0.45, 0.94], // Gravity easing
                    },
                    opacity: {
                      times: [0, 0.3, 0.7, 1],
                      duration: 2.5
                    }
                  }}
                  className="fixed pointer-events-none z-50"
                  style={{
                    width: rect.width,
                    height: rect.height,
                    transformOrigin: `${piece.centerX}% ${piece.centerY}%`,
                  }}
                >
                  <div
                    className="w-full h-full"
                    style={{
                      clipPath: piece.clipPath,
                      backgroundImage: `url(${piece.imageData})`,
                      backgroundSize: `${rect.width}px ${rect.height}px`,
                      backgroundPosition: '0 0',
                      backgroundRepeat: 'no-repeat',
                      filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))',
                    }}
                  />
                </motion.div>
              )
            })}
          </>
        )}

        {/* Hide calculator when shattered */}
        {!isShattered && (
          <>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-500/10 to-transparent rounded-full blur-3xl" />
        </div>

        {/* Home button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setCurrentPage('apps')}
          className="absolute top-8 left-8 z-10 flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-md border border-cyan-500/30 rounded-lg text-cyan-100 hover:bg-slate-700/50 hover:border-cyan-400/50 transition-all hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
        >
          <Home className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </motion.button>

        {/* Main calculator container */}
        <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            {/* Title */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Zap className="w-8 h-8 text-cyan-400" />
                <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  CYBER CALC
                </h1>
                <Zap className="w-8 h-8 text-purple-400" />
              </div>
              <p className="text-cyan-300/60 text-sm tracking-widest font-mono">
                QUANTUM COMPUTING INTERFACE
              </p>
            </div>

            {/* Calculator body */}
            <motion.div
              ref={calculatorRef}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative bg-slate-900/50 backdrop-blur-xl rounded-3xl p-6 border-2 border-cyan-500/30 shadow-[0_0_50px_rgba(34,211,238,0.2)]"
            >
              {/* Glowing corners */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-cyan-400 rounded-tl-3xl" />
              <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-purple-400 rounded-tr-3xl" />
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-purple-400 rounded-bl-3xl" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-cyan-400 rounded-br-3xl" />

              {/* Display */}
              <div className="mb-6 relative">
                {/* Equation display */}
                <div className="h-8 mb-2 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={equation}
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 10, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="text-cyan-300/50 text-right text-sm font-mono pr-4"
                    >
                      {equation || '\u00A0'}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Main display */}
                <div className="bg-slate-950/80 rounded-2xl border-2 border-cyan-500/40 p-6 shadow-[0_0_20px_rgba(34,211,238,0.3)] shadow-inner relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5" />
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={display}
                      initial={{ scale: 1.05, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.95, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="text-right text-4xl font-bold font-mono text-cyan-100 relative z-10 tracking-wider"
                      style={{
                        textShadow: '0 0 10px rgba(34,211,238,0.5)',
                      }}
                    >
                      {display}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Buttons Grid */}
              <div className="grid grid-cols-4 gap-3">
                <CalcButton variant="clear" onClick={handleClear} className="col-span-2">
                  CLEAR
                </CalcButton>
                <CalcButton variant="operator" onClick={handleBackspace}>
                  ←
                </CalcButton>
                <CalcButton variant="operator" onClick={() => handleOperation('/')}>
                  ÷
                </CalcButton>

                <CalcButton onClick={() => handleNumber('7')}>7</CalcButton>
                <CalcButton onClick={() => handleNumber('8')}>8</CalcButton>
                <CalcButton onClick={() => handleNumber('9')}>9</CalcButton>
                <CalcButton variant="operator" onClick={() => handleOperation('*')}>
                  ×
                </CalcButton>

                <CalcButton onClick={() => handleNumber('4')}>4</CalcButton>
                <CalcButton onClick={() => handleNumber('5')}>5</CalcButton>
                <CalcButton onClick={() => handleNumber('6')}>6</CalcButton>
                <CalcButton variant="operator" onClick={() => handleOperation('-')}>
                  −
                </CalcButton>

                <CalcButton onClick={() => handleNumber('1')}>1</CalcButton>
                <CalcButton onClick={() => handleNumber('2')}>2</CalcButton>
                <CalcButton onClick={() => handleNumber('3')}>3</CalcButton>
                <CalcButton variant="operator" onClick={() => handleOperation('+')}>
                  +
                </CalcButton>

                <CalcButton onClick={() => handleNumber('0')} className="col-span-2">
                  0
                </CalcButton>
                <CalcButton onClick={handleDecimal}>.</CalcButton>
                <CalcButton variant="equals" onClick={handleEquals}>
                  =
                </CalcButton>
              </div>
            </motion.div>

            {/* Bottom text */}
            <div className="mt-4 text-center">
              <p className="text-cyan-300/40 text-xs font-mono tracking-widest">
                POWERED BY QUANTUM FLUX PROCESSORS
              </p>
            </div>
          </motion.div>
        </div>
          </>
        )}
      </div>
    </AppLayout>
  )
}
