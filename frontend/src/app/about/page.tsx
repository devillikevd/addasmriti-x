'use client'

import { motion } from 'framer-motion'
import { Navbar } from '@/components/ui/Navbar'
import { ThreeBackground } from '@/components/ui/ThreeBackground'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 selection:bg-heritage-500/30 overflow-x-hidden pt-32">
      <ThreeBackground />
      <Navbar />
      
      <div className="container mx-auto px-4 relative z-10 pb-32">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 glass px-5 py-2.5 rounded-full mb-8 border border-white/10"
          >
            <span className="text-sm font-medium text-white/90">Our Mission</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 tracking-tight"
          >
            Preserving humanity's <span className="gradient-text">collective memory.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/60 leading-relaxed font-light"
          >
            We believe that every life story is a library of invaluable wisdom. The AddaSmriti Foundation was built to ensure that no voice, no memory, and no cultural nuance is ever lost to time.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-32 max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            className="relative rounded-3xl overflow-hidden glass p-2 border border-white/10 aspect-video shadow-[0_0_50px_rgba(255,127,26,0.15)]"
          >
            <div className="absolute inset-0 bg-heritage-500/20 mix-blend-overlay z-10"></div>
            <div className="w-full h-full bg-neutral-900 rounded-2xl flex items-center justify-center">
                {/* Fallback pattern since we don't have an image */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-heritage-500 via-black to-black"></div>
                <span className="text-white/30 text-lg font-display z-20">Cultural Vault visualization</span>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <h2 className="text-4xl font-display font-bold text-white mb-6">The Genesis</h2>
            <p className="text-lg text-white/60 mb-6 leading-relaxed">
              Born from the concept of the Bengali "Adda" — unstructured, deeply intellectual, and emotional conversations — our platform digitizes this essence.
            </p>
            <p className="text-lg text-white/60 leading-relaxed">
              By combining state-of-the-art LLMs, neural voice cloning, and spatial 3D environments, we've created the world's first OS designed specifically for heritage preservation.
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Footer Placeholder for visual completion */}
      <footer className="border-t border-white/10 bg-black/50 backdrop-blur-xl py-12 relative z-10 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-heritage-500 to-bengal-500 flex items-center justify-center text-white text-sm font-bold">আ</div>
            <span className="font-display text-2xl font-bold text-white">AddaSmriti X</span>
          </div>
          <p className="text-white/40 mb-8">The World's Most Advanced Cultural Preservation Ecosystem.</p>
          <div className="text-white/20 text-sm">© 2026 AddaSmriti Foundation. All systems nominal.</div>
        </div>
      </footer>
    </div>
  )
}
