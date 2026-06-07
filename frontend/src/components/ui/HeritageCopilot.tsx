'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, X, MessageSquare, Mic, ArrowUp } from 'lucide-react'

export function HeritageCopilot() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] glass-dark rounded-3xl p-5 z-50 shadow-2xl border border-white/10"
          >
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2 text-white">
                <Sparkles className="w-5 h-5 text-heritage-400" />
                <span className="font-medium text-lg">Heritage Copilot</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="h-64 overflow-y-auto scrollbar-hide mb-4 space-y-4 text-sm">
              <div className="bg-white/5 rounded-2xl p-4 text-white/90 rounded-tl-sm border border-white/5">
                Namaskar! I am your Heritage Copilot. I can help you preserve memories, search historical archives, or generate a family documentary. What would you like to do?
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {["Search Kolkata 1950", "Talk to Digital Twin", "Generate Podcast"].map(chip => (
                  <button key={chip} className="bg-heritage-500/20 hover:bg-heritage-500/30 text-heritage-200 border border-heritage-500/30 px-3 py-1.5 rounded-full transition-colors">
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about your heritage..."
                className="w-full bg-black/40 border border-white/10 rounded-full pl-4 pr-12 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-heritage-500/50 focus:ring-1 focus:ring-heritage-500/50 transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-heritage-500 rounded-full text-white hover:bg-heritage-400 transition-colors">
                {query ? <ArrowUp className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-heritage-500 flex items-center justify-center text-white shadow-[0_0_30px_rgba(255,127,26,0.4)] hover:shadow-[0_0_40px_rgba(255,127,26,0.6)] transition-all z-50 border border-white/20"
      >
        <Sparkles className="w-6 h-6" />
      </motion.button>
    </>
  )
}
