import * as THREE from 'three'

/**
 * Calculates approximate sun position for Earth lighting.
 * Accuracy: ±1-2 degrees, sufficient for day/night visualization.
 */
export function calculateSunPosition(date: Date = new Date()): THREE.Vector3 {
  const dayOfYear = getDayOfYear(date)
  const hour = date.getUTCHours() + date.getUTCMinutes() / 60

  const n = dayOfYear
  const L = (280.460 + 0.9856474 * n) % 360
  const g = ((357.528 + 0.9856003 * n) % 360) * (Math.PI / 180)

  const lambda = (L + 1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g)) * (Math.PI / 180)
  const epsilon = 23.439 * (Math.PI / 180)
  const declinationRad = Math.asin(Math.sin(epsilon) * Math.sin(lambda))

  const hourAngleDeg = (hour - 12) * 15
  const hourAngleRad = hourAngleDeg * (Math.PI / 180)

  const distance = 50
  const x = distance * Math.cos(declinationRad) * Math.sin(hourAngleRad)
  const y = distance * Math.sin(declinationRad)
  const z = distance * Math.cos(declinationRad) * Math.cos(hourAngleRad)

  return new THREE.Vector3(x, y, z)
}

function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 1)
  const diff = date.getTime() - start.getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1
}
