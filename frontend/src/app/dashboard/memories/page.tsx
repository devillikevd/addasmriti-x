'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Plus, Search, Grid, List, Mic, Database, Shield, Archive } from 'lucide-react'
import { MemoryCard } from '@/components/memory/MemoryCard'
import type { Memory } from '@/types/memory'

const DEMO_MEMORIES: Memory[] = [
  {
    id: '1', userId: 'u1', title: 'Durga Puja 1985 - Park Street Celebrations',
    content: 'The pandals stretched for miles. Dadu would take us every Ashtami to see the immersion procession. The drums, the crowd, the smell of dhunuchi — it was magical.',
    memoryType: 'festival', timePeriod: '1985', language: 'en',
    emotionTags: ['nostalgia', 'joy', 'love'], peopleMentioned: ['Dadu', 'Ma'],
    placesMentioned: ['Park Street', 'Kolkata'],
    location: { id: 'l1', name: 'Park Street', city: 'Kolkata', country: 'India' },
    images: ['https://images.unsplash.com/photo-1604313032867-b82c09793be5?w=600&q=80'],
    culturalSignificance: 9, viewCount: 234, likeCount: 47, shareCount: 12,
    preservationStatus: 'published', isPublic: true,
    author: { id: 'u1', email: 'demo@test.com', fullName: 'Ramesh Kumar', isElder: true, preferredLanguage: 'bn', createdAt: '2024-01-01' },
    createdAt: '2024-01-15T10:00:00Z', updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2', userId: 'u1', title: 'Dadi\'s Authentic Machher Jhol Recipe',
    content: 'She would wake up at 5am to buy fresh rohu from the Gariahat market. The mustard paste had to be ground by hand — never the blender she said.',
    memoryType: 'recipe', timePeriod: '1990s', language: 'en',
    emotionTags: ['love', 'nostalgia', 'gratitude'], peopleMentioned: ['Dadi'],
    placesMentioned: ['Gariahat', 'Kolkata'],
    images: [],
    culturalSignificance: 7, viewCount: 89, likeCount: 23, shareCount: 5,
    preservationStatus: 'published', isPublic: true,
    author: { id: 'u1', email: 'demo@test.com', fullName: 'Priya Chakraborty', isElder: false, preferredLanguage: 'en', createdAt: '2024-01-01' },
    createdAt: '2024-01-12T10:00:00Z', updatedAt: '2024-01-12T10:00:00Z',
  },
  {
    id: '3', userId: 'u1', title: 'The Great Flood of 1978 - Our Neighbourhood',
    content: 'Water came up to the first floor. Neighbours shared food from balcony to balcony. Uncle rowed a makeshift boat made from oil drums.',
    memoryType: 'historical', timePeriod: '1978', language: 'en',
    emotionTags: ['pride', 'wonder', 'humor'], peopleMentioned: ['Uncle'],
    placesMentioned: ['North Kolkata'],
    images: [],
    culturalSignificance: 8, viewCount: 156, likeCount: 31, shareCount: 8,
    preservationStatus: 'published', isPublic: true,
    author: { id: 'u1', email: 'demo@test.com', fullName: 'Ramesh Kumar', isElder: true, preferredLanguage: 'bn', createdAt: '2024-01-01' },
    createdAt: '2024-01-10T10:00:00Z', updatedAt: '2024-01-10T10:00:00Z',
  },
]

export default function MemoriesPage() {
  const [search, setSearch] = useState('')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [filter, setFilter] = useState('all')

  const filtered = DEMO_MEMORIES.filter(m =>
    m.title.toLowerCase().includes(search.toLowerCase()) ||
    m.content.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-8 pb-20 relative z-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-bengal-400 text-sm mb-2 font-medium tracking-wide uppercase">
            <Shield className="w-4 h-4" />
            <span>Encrypted Storage Active</span>
          </div>
          <h1 className="font-display text-4xl font-black text-white flex items-center gap-3">
            <Archive className="w-8 h-8 text-heritage-500" />
            Family Legacy Vault
          </h1>
          <p className="text-white/50 text-lg mt-2 font-light">
            {DEMO_MEMORIES.length} verified neural logs preserved in cold storage.
          </p>
        </div>
        <Link href="/dashboard/memories/new">
          <button className="bg-heritage-500 hover:bg-heritage-400 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(255,127,26,0.3)] hover:shadow-[0_0_30px_rgba(255,127,26,0.5)]">
            <Mic className="w-5 h-5" /> Initialize Log
          </button>
        </Link>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col lg:flex-row gap-4 glass-dark p-3 rounded-[1.5rem] border border-white/10 shadow-xl">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            placeholder="Query memory banks..." 
            className="w-full bg-black/40 border border-white/5 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-heritage-500/50 focus:bg-white/5 transition-all"
          />
        </div>
        <div className="flex gap-2">
          <select value={filter} onChange={e => setFilter(e.target.value)}
            className="bg-black/40 border border-white/5 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-heritage-500/50 transition-all appearance-none cursor-pointer">
            <option value="all">All Data Types</option>
            <option value="story">Visual Stories</option>
            <option value="festival">Festivals</option>
            <option value="recipe">Culinary Codes</option>
            <option value="historical">Historical Archives</option>
          </select>
          <div className="flex bg-black/40 border border-white/5 rounded-xl overflow-hidden p-1">
            <button onClick={() => setView('grid')} className={`px-4 py-2 rounded-lg transition-all ${view === 'grid' ? 'bg-white/20 text-white shadow-md' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
              <Grid className="w-4 h-4" />
            </button>
            <button onClick={() => setView('list')} className={`px-4 py-2 rounded-lg transition-all ${view === 'list' ? 'bg-white/20 text-white shadow-md' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <AnimatePresence mode="popLayout">
        {filtered.length > 0 ? (
          <div className={view === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-6'}>
            {filtered.map((memory, i) => (
              <motion.div key={memory.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: i * 0.05, duration: 0.3 }}>
                <MemoryCard memory={memory} onLike={() => {}} onShare={() => {}} />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-32 glass-dark border border-white/5 rounded-3xl">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-white/10">
              <Database className="w-10 h-10 text-white/30" />
            </div>
            <h3 className="text-2xl font-display font-bold text-white mb-3">Memory Banks Empty</h3>
            <p className="text-white/50 mb-8 max-w-sm mx-auto font-light">Your legacy vault currently has no records matching this query. Initialize a new neural log to begin preservation.</p>
            <Link href="/dashboard/memories/new">
              <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl gap-2 flex items-center mx-auto transition-colors">
                <Mic className="w-5 h-5" /> Start Recording
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
