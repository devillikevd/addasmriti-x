'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function MemoryParticles(props: any) {
  const ref = useRef<THREE.Points>(null)
  
  // Generate random points in a sphere
  const sphere = useMemo(() => {
    const temp = new Float32Array(3000 * 3)
    for (let i = 0; i < 3000; i++) {
      const r = 2.5 * Math.cbrt(Math.random())
      const theta = Math.random() * 2 * Math.PI
      const phi = Math.acos(2 * Math.random() - 1)
      temp[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      temp[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      temp[i * 3 + 2] = r * Math.cos(phi)
    }
    return temp
  }, [])

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10
      ref.current.rotation.y -= delta / 15
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#FF7F1A"
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  )
}

export function ThreeBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <MemoryParticles />
      </Canvas>
    </div>
  )
}
