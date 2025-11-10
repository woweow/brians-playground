import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import * as THREE from 'three'

export function Earth() {
  const [colorMap, bumpMap, specularMap] = useLoader(
    TextureLoader,
    [
      'https://unpkg.com/three-globe@2.31.0/example/img/earth-blue-marble.jpg',
      'https://unpkg.com/three-globe@2.31.0/example/img/earth-topology.png',
      'https://unpkg.com/three-globe@2.31.0/example/img/earth-water.png',
    ],
    (loader) => {
      loader.setCrossOrigin('anonymous')
    },
    (error) => {
      console.error('Failed to load Earth textures:', error)
      throw new Error('Failed to load Earth textures. Please check your internet connection.')
    }
  )

  return (
    <mesh castShadow receiveShadow>
      <sphereGeometry args={[5, 128, 128]} />
      <meshPhongMaterial
        map={colorMap}
        bumpMap={bumpMap}
        bumpScale={0.15}
        specularMap={specularMap}
        specular={new THREE.Color('grey')}
        shininess={5}
      />
    </mesh>
  )
}
