'use client'

import { useRef, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import * as THREE from 'three'
import SpriteText from 'three-spritetext'

const ForceGraph3D = dynamic(() => import('react-force-graph-3d'), { ssr: false })

export function MemoryGraph3D() {
  const fgRef = useRef<any>()
  const [mounted, setMounted] = useState(false)

  // Mock data for the Memory DNA
  const data = {
    nodes: [
      { id: '1', name: 'Demo User', val: 10, group: 1, color: '#0EA5E9' },
      { id: '2', name: 'Durga Puja 1985', val: 6, group: 2, color: '#FF7F1A' },
      { id: '3', name: 'Dadi\'s Recipe', val: 5, group: 3, color: '#8B5CF6' },
      { id: '4', name: 'Jadavpur Univ', val: 4, group: 4, color: '#10B981' },
      { id: '5', name: 'Park Street', val: 4, group: 2, color: '#FF7F1A' },
      { id: '6', name: 'Childhood Home', val: 5, group: 3, color: '#8B5CF6' },
      { id: '7', name: '1971 Liberation', val: 8, group: 5, color: '#EF4444' },
      { id: '8', name: 'First Camera', val: 3, group: 4, color: '#10B981' },
      { id: '9', name: 'College Fest', val: 3, group: 4, color: '#10B981' },
      { id: '10', name: 'Dada', val: 6, group: 1, color: '#0EA5E9' },
    ],
    links: [
      { source: '1', target: '2' },
      { source: '1', target: '3' },
      { source: '1', target: '4' },
      { source: '1', target: '10' },
      { source: '2', target: '5' },
      { source: '3', target: '6' },
      { source: '10', target: '7' },
      { source: '4', target: '8' },
      { source: '4', target: '9' },
      { source: '2', target: '10' },
    ]
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="w-full h-[600px] flex items-center justify-center text-white/50">Initializing Memory DNA...</div>

  return (
    <div className="w-full h-[600px] rounded-3xl overflow-hidden glass-dark border border-white/10 shadow-[0_0_50px_rgba(255,127,26,0.1)]">
      <ForceGraph3D
        ref={fgRef}
        graphData={data}
        backgroundColor="#020617"
        nodeThreeObject={(node: any) => {
          const sprite = new SpriteText(node.name)
          sprite.color = node.color || '#fff'
          sprite.textHeight = 4 + (node.val || 1)
          sprite.padding = 4
          sprite.backgroundColor = 'rgba(0,0,0,0.4)'
          sprite.borderRadius = 4
          sprite.borderColor = node.color
          sprite.borderWidth = 0.5
          return sprite
        }}
        linkColor={() => 'rgba(255,127,26,0.4)'}
        linkWidth={1.5}
        linkResolution={6}
        nodeResolution={16}
        showNavInfo={false}
        onNodeClick={(node: any) => {
          const distance = 40
          const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z)
          fgRef.current.cameraPosition(
            { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio },
            node,
            3000
          )
        }}
      />
    </div>
  )
}
