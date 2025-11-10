import * as THREE from 'three'

/**
 * Converts lat/lng to 3D sphere position.
 * Clamps latitude to ±89.99° to avoid pole singularities.
 */
export function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const clampedLat = Math.max(-89.99, Math.min(89.99, lat))
  const phi = (90 - clampedLat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)

  const x = -radius * Math.sin(phi) * Math.cos(theta)
  const y = radius * Math.cos(phi)
  const z = radius * Math.sin(phi) * Math.sin(theta)

  return new THREE.Vector3(x, y, z)
}

export function calculateDistance(camera: THREE.Camera, position: THREE.Vector3): number {
  return camera.position.distanceTo(position)
}

export function calculateOpacity(distance: number, minDistance: number, maxDistance: number): number {
  if (distance < minDistance) return 1
  if (distance > maxDistance) return 0.2
  const normalized = (distance - minDistance) / (maxDistance - minDistance)
  return 1 - normalized * 0.8
}
