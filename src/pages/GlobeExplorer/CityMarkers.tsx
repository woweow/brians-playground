import { useMemo, useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { cities, City } from './data/cities'
import { latLngToVector3, calculateDistance, calculateOpacity } from './utils/coordinates'

interface CityMarkersProps {
  onCityClick: (city: City) => void
}

const MIN_INTERACTION_DISTANCE = 10

export function CityMarkers({ onCityClick }: CityMarkersProps) {
  const { camera } = useThree()
  const opacitiesRef = useRef<{ [key: string]: number }>({})
  const htmlRefsRef = useRef<Map<string, HTMLDivElement>>(new Map())
  const markerRefsRef = useRef<Map<string, THREE.Mesh>>(new Map())
  const timeoutIdsRef = useRef<Set<NodeJS.Timeout>>(new Set())

  const cityData = useMemo(
    () =>
      cities.map((city) => ({
        city,
        position: latLngToVector3(city.lat, city.lng, 5),
      })),
    []
  )

  useEffect(() => {
    const timeoutIds = timeoutIdsRef.current
    const htmlRefs = htmlRefsRef.current
    const markerRefs = markerRefsRef.current

    return () => {
      timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId))
      timeoutIds.clear()
      htmlRefs.clear()
      markerRefs.clear()
    }
  }, [])

  const handleCityClick = (city: City, position: THREE.Vector3) => {
    const distance = calculateDistance(camera, position)
    if (distance > MIN_INTERACTION_DISTANCE) {
      const htmlElement = htmlRefsRef.current.get(city.name)
      if (htmlElement) {
        htmlElement.style.color = '#fbbf24'
        const timeoutId = setTimeout(() => {
          htmlElement.style.color = ''
          timeoutIdsRef.current.delete(timeoutId)
        }, 500)
        timeoutIdsRef.current.add(timeoutId)
      }
    } else {
      onCityClick(city)
    }
  }

  useFrame(() => {
    cityData.forEach(({ city, position }) => {
      const distance = calculateDistance(camera, position)
      const opacity = calculateOpacity(distance, 8, 20)

      if (Math.abs((opacitiesRef.current[city.name] || 1) - opacity) > 0.01) {
        opacitiesRef.current[city.name] = opacity
        const htmlElement = htmlRefsRef.current.get(city.name)
        if (htmlElement) {
          htmlElement.style.opacity = opacity.toString()
        }
      }

      const markerMesh = markerRefsRef.current.get(city.name)
      if (markerMesh) {
        markerMesh.userData.cursor = distance > MIN_INTERACTION_DISTANCE ? 'not-allowed' : 'pointer'
      }
    })
  })

  return (
    <>
      {cityData.map(({ city, position }) => (
        <group key={city.name} position={position}>
          <mesh
            ref={(el) => {
              if (el) markerRefsRef.current.set(city.name, el)
            }}
            onClick={() => handleCityClick(city, position)}
            onPointerOver={(e) => {
              e.stopPropagation()
              const mesh = e.object as THREE.Mesh
              document.body.style.cursor = mesh.userData.cursor || 'pointer'
            }}
            onPointerOut={() => {
              document.body.style.cursor = 'auto'
            }}
          >
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshBasicMaterial color="#ef4444" />
          </mesh>
          <mesh
            position={[0, 0.15, 0]}
            onClick={() => handleCityClick(city, position)}
            onPointerOver={(e) => {
              e.stopPropagation()
              document.body.style.cursor = markerRefsRef.current.get(city.name)?.userData.cursor || 'pointer'
            }}
            onPointerOut={() => {
              document.body.style.cursor = 'auto'
            }}
          >
            <coneGeometry args={[0.04, 0.15, 8]} />
            <meshBasicMaterial color="#ef4444" />
          </mesh>
          <Html
            position={[0, 0.25, 0]}
            center
            distanceFactor={5}
            occlude
            style={{
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            <div
              ref={(el) => {
                if (el) {
                  htmlRefsRef.current.set(city.name, el)
                }
              }}
              className="text-white font-semibold whitespace-nowrap px-2 py-1 rounded text-sm"
              style={{
                textShadow: '1px 1px 2px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.8)',
                background: 'rgba(0,0,0,0.3)',
                backdropFilter: 'blur(4px)',
                opacity: 1,
                transition: 'opacity 0.2s',
              }}
            >
              {city.name}
            </div>
          </Html>
        </group>
      ))}
    </>
  )
}
