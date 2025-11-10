import { Suspense, useState } from 'react'
import { AppLayout } from '@/components/AppLayout'
import { Globe } from './Globe'
import { CityPopup } from './CityPopup'
import { LoadingScreen } from './LoadingScreen'
import { ErrorBoundary } from './ErrorBoundary'
import { City } from './data/cities'

export function GlobeExplorer() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null)

  return (
    <AppLayout showNavigation={false}>
      <div className="w-full h-screen">
        <ErrorBoundary>
          <Suspense
            fallback={<LoadingScreen />}
          >
            <Globe onCityClick={setSelectedCity} />
          </Suspense>
        </ErrorBoundary>
        {selectedCity && <CityPopup city={selectedCity} onClose={() => setSelectedCity(null)} />}
      </div>
    </AppLayout>
  )
}
