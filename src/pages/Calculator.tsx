import { useState, useCallback, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AppLayout } from '@/components/AppLayout'
import { Home, Zap } from 'lucide-react'
import { useNavigationStore } from '@/store/navigation'
import { cn } from '@/lib/utils'

export function Calculator() {
  const { setCurrentPage } = useNavigationStore()
  const [display, setDisplay] = useState('0')
  const [equation, setEquation] = useState('')
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false)

  const handleNumber = useCallback((num: string) => {
    setDisplay(prev => {
      if (shouldResetDisplay) {
        setShouldResetDisplay(false)
        return num
      }
      return prev === '0' ? num : prev + num
    })
  }, [shouldResetDisplay])

  const handleEquals = useCallback(() => {
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
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 relative overflow-hidden">
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
      </div>
    </AppLayout>
  )
}
