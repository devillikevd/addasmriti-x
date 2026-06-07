'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Sparkles, BookOpen, Clock, FileText, ArrowRight, CornerDownLeft, Loader2 } from 'lucide-react'

export default function AISearchPage() {
  const [query, setQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsSearching(true)
    setResult(null)

    // Simulate AI thinking and searching through 10,000 pages of Bengali literature
    setTimeout(() => {
      setIsSearching(false)
      setResult(`Based on 4 verified memory logs and cross-referencing with 12 historical archives from the 1960s:

Durga Puja in North Kolkata during 1965 was characterized by the traditional 'Ekahari' style of idol making, mostly centered around Kumartuli. Your grandfather's audio log (Log ID: 492) mentions the massive procession from Bagbazar to the Hooghly river. The streets were illuminated with gas lamps, and the primary mode of transport for families was the hand-pulled rickshaw or the tram.

Key cultural touchpoints from your family vault:
- The 'Dhunuchi Naach' was performed by your great-uncle.
- Traditional 'Bhog' consisting of Khichuri and Labra.
`)
    }, 3000)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-32">
      <div className="text-center mt-10 mb-12">
        <div className="inline-flex items-center gap-2 text-heritage-400 text-sm mb-4 font-medium tracking-wide uppercase px-4 py-1.5 rounded-full bg-heritage-500/10 border border-heritage-500/20">
          <Sparkles className="w-4 h-4" />
          <span>Heritage GPT Engine</span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-black text-white mb-4">
          Ask the Cultural Oracle
        </h1>
        <p className="text-white/50 text-lg max-w-2xl mx-auto font-light">
          Powered by a specialized LLM trained on 100,000+ pages of Bengali literature, oral histories, and your personal Legacy Vault.
        </p>
      </div>

      <form onSubmit={handleSearch} className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-heritage-500/20 to-bengal-500/20 rounded-2xl blur-xl group-focus-within:blur-2xl transition-all duration-500 opacity-50" />
        <div className="relative flex items-center glass-dark rounded-2xl border border-white/10 p-2 shadow-2xl">
          <Search className="w-6 h-6 text-white/40 ml-4 mr-2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask anything... e.g., 'How was Durga Puja in North Kolkata in 1965?'"
            className="flex-1 bg-transparent text-white text-lg placeholder:text-white/30 outline-none py-4 px-2"
          />
          <button 
            disabled={!query.trim() || isSearching}
            className="bg-heritage-500 hover:bg-heritage-400 disabled:bg-white/10 disabled:text-white/30 text-white p-3 rounded-xl transition-colors"
          >
            {isSearching ? <Loader2 className="w-6 h-6 animate-spin" /> : <CornerDownLeft className="w-6 h-6" />}
          </button>
        </div>
      </form>

      {/* Suggested Queries */}
      {!result && !isSearching && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {[
            { icon: BookOpen, text: "Summarize my grandfather's childhood stories" },
            { icon: Clock, text: "What was my Para like in 1962?" },
            { icon: FileText, text: "Extract all recipes from the family vault" },
            { icon: Sparkles, text: "Generate a documentary script about our migration" }
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}
              onClick={() => setQuery(item.text)}
              className="flex items-center gap-4 glass-dark p-4 rounded-xl border border-white/5 hover:border-white/20 cursor-pointer transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/50 group-hover:text-heritage-400 group-hover:bg-heritage-500/10 transition-colors">
                <item.icon className="w-5 h-5" />
              </div>
              <span className="text-white/70 group-hover:text-white text-sm font-medium">{item.text}</span>
            </motion.div>
          ))}
        </div>
      )}

      {/* Results Section */}
      <AnimatePresence>
        {isSearching && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-4">
            <div className="flex items-center gap-3 text-heritage-400 text-sm font-medium">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Scanning 10,000 pages of Bengali literature...</span>
            </div>
            <div className="flex items-center gap-3 text-bengal-400 text-sm font-medium">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Cross-referencing with Legacy Vault Log #492...</span>
            </div>
          </motion.div>
        )}

        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-dark rounded-3xl border border-white/10 p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-heritage-500 to-bengal-500" />
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
              <Sparkles className="w-6 h-6 text-heritage-400" />
              <h3 className="text-xl font-bold text-white">Oracle Response</h3>
            </div>
            <div className="prose prose-invert prose-p:leading-relaxed prose-p:text-white/80 max-w-none">
              {result.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <h4 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4">Sources Cited</h4>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-xs text-white/70 hover:bg-white/10 cursor-pointer">
                  <FileText className="w-3 h-3 text-heritage-400" /> Grandfather's Log #492
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-xs text-white/70 hover:bg-white/10 cursor-pointer">
                  <BookOpen className="w-3 h-3 text-bengal-400" /> Kumartuli Archives (1960-1970)
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
