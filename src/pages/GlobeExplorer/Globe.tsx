import { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { OrbitControls } from '@react-three/drei'
import { Earth } from './Earth'
import { CityMarkers } from './CityMarkers'
import { City } from './data/cities'
import { latLngToVector3 } from './utils/coordinates'

interface GlobeProps {
  onCityClick: (city: City) => void
}

export function Globe({ onCityClick }: GlobeProps) {
  const controlsRef = useRef<OrbitControlsImpl>(null)
  const [autoRotate, setAutoRotate] = useState(false)
  const lastInteractionRef = useRef(Date.now())

  const seattlePosition = latLngToVector3(47.6062, -122.3321, 5)
  const initialCameraPosition = seattlePosition.clone().normalize().multiplyScalar(12)

  useEffect(() => {
    const handleInteraction = () => {
      lastInteractionRef.current = Date.now()
      setAutoRotate(false)
    }

    window.addEventListener('mousedown', handleInteraction, { passive: true })
    window.addEventListener('touchstart', handleInteraction, { passive: true })
    window.addEventListener('wheel', handleInteraction, { passive: true })

    const checkInactivity = setInterval(() => {
      if (Date.now() - lastInteractionRef.current > 10000) {
        setAutoRotate(true)
      }
    }, 1000)

    return () => {
      window.removeEventListener('mousedown', handleInteraction)
      window.removeEventListener('touchstart', handleInteraction)
      window.removeEventListener('wheel', handleInteraction)
      clearInterval(checkInactivity)
    }
  }, [])

  return (
    <Canvas
      camera={{
        position: [initialCameraPosition.x, initialCameraPosition.y, initialCameraPosition.z],
        fov: 45,
      }}
      shadows
    >
      <color attach="background" args={['#000000']} />

      <ambientLight intensity={2.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, -5, -5]} intensity={0.5} />

      <Earth />
      <CityMarkers onCityClick={onCityClick} />

      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        minDistance={7}
        maxDistance={25}
        autoRotate={autoRotate}
        autoRotateSpeed={0.5}
        enableDamping
        dampingFactor={0.05}
        target={[0, 0, 0]}
      />
    </Canvas>
  )
}
