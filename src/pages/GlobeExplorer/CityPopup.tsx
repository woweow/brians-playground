import { useEffect } from 'react'
import { X } from 'lucide-react'
import { City } from './data/cities'

interface CityPopupProps {
  city: City
  onClose: () => void
}

export function CityPopup({ city, onClose }: CityPopupProps) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-1">{city.name}</h2>
            <p className="text-blue-100 text-lg">{city.country}</p>
            <p className="text-blue-200 text-sm mt-2">
              Population: {city.population.toLocaleString()}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-140px)]">
          <div className="prose prose-slate max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{city.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
