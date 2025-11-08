import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AppLayout } from '@/components/AppLayout'
import { Home, Trash2, Palette } from 'lucide-react'
import { useNavigationStore } from '@/store/navigation'
import { cn } from '@/lib/utils'

const COLORS = [
  { name: 'Black', value: '#000000' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Red', value: '#EF4444' },
  { name: 'Orange', value: '#F97316' },
  { name: 'Yellow', value: '#EAB308' },
  { name: 'Green', value: '#22C55E' },
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Purple', value: '#A855F7' },
  { name: 'Pink', value: '#EC4899' },
  { name: 'Brown', value: '#92400E' },
]

export function Drawsaurus() {
  const { setCurrentPage } = useNavigationStore()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [selectedColor, setSelectedColor] = useState(COLORS[0].value)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      const container = canvas.parentElement
      if (!container) return

      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height

      // Fill with white background
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    return () => window.removeEventListener('resize', resizeCanvas)
  }, [])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    setIsDrawing(true)
    const pos = getMousePos(canvas, e)
    ctx.beginPath()
    ctx.moveTo(pos.x, pos.y)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const pos = getMousePos(canvas, e)
    ctx.lineTo(pos.x, pos.y)
    ctx.strokeStyle = selectedColor
    ctx.lineWidth = 4
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const getMousePos = (canvas: HTMLCanvasElement, e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const rect = canvas.getBoundingClientRect()

    if ('touches' in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      }
    }

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              {/* Back button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage('apps')}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
              >
                <Home className="w-5 h-5" />
                <span className="font-medium">Back</span>
              </motion.button>

              {/* Title */}
              <div className="flex items-center gap-3">
                <Palette className="w-7 h-7 text-purple-600" />
                <h1 className="text-2xl font-bold text-gray-800">Drawsaurus</h1>
              </div>

              {/* Clear button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearCanvas}
                className="flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-lg text-red-700 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
                <span className="font-medium">Clear</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-6">
            {/* Color palette sidebar */}
            <div className="bg-white rounded-xl shadow-lg p-4 h-fit">
              <h2 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Colors</h2>
              <div className="space-y-2">
                {COLORS.map((color) => (
                  <motion.button
                    key={color.value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedColor(color.value)}
                    className={cn(
                      'w-full h-12 rounded-lg border-2 transition-all flex items-center justify-center',
                      selectedColor === color.value
                        ? 'border-purple-600 ring-2 ring-purple-200 shadow-md'
                        : 'border-gray-300 hover:border-gray-400'
                    )}
                    style={{ backgroundColor: color.value }}
                  >
                    {selectedColor === color.value && (
                      <div className={cn(
                        'w-6 h-6 rounded-full border-2',
                        color.value === '#000000' ? 'border-white' : 'border-black'
                      )} />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Canvas area */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden" style={{ height: 'calc(100vh - 250px)' }}>
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="w-full h-full cursor-crosshair touch-none"
              />
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-6 bg-white rounded-xl shadow-lg p-4">
            <p className="text-sm text-gray-600 text-center">
              Click or tap on the canvas to start drawing! Select a color from the palette on the left.
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
