'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Network, ZoomIn, ZoomOut, Maximize, Share2, Layers, Download, Lock, Activity, Eye, Zap, Database } from 'lucide-react'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import force graph to prevent SSR issues
const ForceGraph3D = dynamic(() => import('react-force-graph-3d'), { ssr: false })

export default function MemoryDNAPage() {
  const [mounted, setMounted] = useState(false)
  const [activeNode, setActiveNode] = useState<any>(null)

  useEffect(() => setMounted(true), [])

  const graphData = {
    nodes: Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      name: i === 0 ? 'You' : `Memory Node ${i}`,
      val: i === 0 ? 30 : Math.random() * 10 + 2,
      color: i === 0 ? '#ff7f1a' : i < 20 ? '#a855f7' : i < 50 ? '#ef4444' : '#3b82f6',
      type: i === 0 ? 'Core' : i < 20 ? 'Audio Log' : i < 50 ? 'Recipe' : 'Location'
    })),
    links: Array.from({ length: 200 }).map(() => ({
      source: Math.floor(Math.random() * 150),
      target: Math.floor(Math.random() * 150),
    })),
  }

  return (
    <div className="h-[calc(100vh-6rem)] w-full relative overflow-hidden bg-[#020617] rounded-[2.5rem] border border-white/10 shadow-2xl flex flex-col z-10">
      
      {/* Top HUD */}
      <div className="absolute top-0 left-0 right-0 p-6 z-20 flex justify-between items-start pointer-events-none">
        <div>
          <div className="flex items-center gap-2 text-bengal-400 text-xs font-bold tracking-widest uppercase mb-2">
            <Network className="w-4 h-4 animate-pulse" /> Memory DNA Cluster
          </div>
          <h1 className="text-3xl font-black text-white font-display pointer-events-auto">Generational Graph</h1>
          <p className="text-white/50 text-sm mt-1">150 Interconnected Neural Nodes</p>
        </div>
        
        <div className="flex gap-2 pointer-events-auto">
          <button className="glass-dark hover:bg-white/10 text-white p-2.5 rounded-xl border border-white/10 transition-colors">
            <ZoomIn className="w-5 h-5" />
          </button>
          <button className="glass-dark hover:bg-white/10 text-white p-2.5 rounded-xl border border-white/10 transition-colors">
            <ZoomOut className="w-5 h-5" />
          </button>
          <button className="glass-dark hover:bg-white/10 text-white p-2.5 rounded-xl border border-white/10 transition-colors">
            <Maximize className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Side Panel HUD */}
      <AnimatePresence>
        {activeNode && (
          <motion.div 
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }}
            className="absolute right-6 top-24 bottom-6 w-80 glass-panel rounded-3xl border border-white/10 shadow-2xl p-6 z-20 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] bg-white/10 px-2 py-1 rounded font-bold uppercase tracking-widest text-white/50">Node Details</span>
              <button onClick={() => setActiveNode(null)} className="text-white/40 hover:text-white">✕</button>
            </div>
            
            <div className="w-16 h-16 rounded-full mx-auto mb-4 border-[3px] border-black shadow-[0_0_20px_rgba(255,255,255,0.2)]" style={{ backgroundColor: activeNode.color }} />
            <h3 className="text-xl font-bold text-white text-center mb-1">{activeNode.name}</h3>
            <p className="text-center text-sm text-white/50 mb-6">{activeNode.type}</p>
            
            <div className="space-y-4">
              <div className="glass-dark p-3 rounded-xl border border-white/5">
                <p className="text-[10px] text-white/40 uppercase font-bold mb-1">Connections</p>
                <p className="text-lg font-bold text-white flex items-center gap-2"><Network className="w-4 h-4 text-heritage-400" /> {Math.floor(Math.random() * 15) + 2} edges</p>
              </div>
              <div className="glass-dark p-3 rounded-xl border border-white/5">
                <p className="text-[10px] text-white/40 uppercase font-bold mb-1">Significance Score</p>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mt-2">
                  <div className="bg-gradient-to-r from-heritage-500 to-bengal-500 h-full w-[85%]" />
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-white/10 hover:bg-white/20 text-white text-xs font-bold py-2 rounded-lg transition-colors">Expand Node</button>
                <button className="flex-1 bg-heritage-500 hover:bg-heritage-400 text-white text-xs font-bold py-2 rounded-lg transition-colors">View Log</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend HUD */}
      <div className="absolute bottom-6 left-6 z-20 pointer-events-auto">
        <div className="glass-dark p-4 rounded-2xl border border-white/10 flex gap-6">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#ff7f1a] shadow-[0_0_10px_#ff7f1a]" /><span className="text-xs text-white/60 font-semibold">Core Identity</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#a855f7] shadow-[0_0_10px_#a855f7]" /><span className="text-xs text-white/60 font-semibold">Audio Logs</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#ef4444] shadow-[0_0_10px_#ef4444]" /><span className="text-xs text-white/60 font-semibold">Recipes</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#3b82f6] shadow-[0_0_10px_#3b82f6]" /><span className="text-xs text-white/60 font-semibold">Locations</span></div>
        </div>
      </div>

      {/* 3D Force Graph */}
      <div className="flex-1 w-full h-full cursor-move">
        {mounted && (
          <ForceGraph3D
            graphData={graphData}
            nodeLabel="name"
            nodeColor="color"
            nodeRelSize={6}
            linkColor={() => 'rgba(255,255,255,0.1)'}
            linkWidth={1}
            backgroundColor="#020617"
            onNodeClick={(node) => setActiveNode(node)}
            enableNodeDrag={false}
          />
        )}
      </div>
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(255,127,26,0.05)_0%,rgba(0,0,0,0)_70%)]" />
    </div>
  )
}
