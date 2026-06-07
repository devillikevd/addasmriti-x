'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Compass, Map as MapIcon, Glasses, Radar, Zap, Navigation, Clock, Globe, Layers, Eye, MapPin, Camera, Headphones, BarChart3, Route } from 'lucide-react'
import { MemoryCard } from '@/components/memory/MemoryCard'
import type { Memory } from '@/types/memory'

const EXPLORE_MEMORIES: Memory[] = [
  {
    id:'e1', userId:'u2', title:'The Last Tram of Calcutta — 1940s Commute',
    content:'My grandfather rode the same tram route every morning. He described the sound of the bell, the smell of rain on the rails, conductors calling out stops in three languages.',
    memoryType:'historical', timePeriod:'1940s', language:'en',
    emotionTags:['nostalgia','wonder'], peopleMentioned:['Grandfather'],
    placesMentioned:['Esplanade', 'Calcutta'],
    location:{ id:'l1', name:'Esplanade Tram Stop', city:'Kolkata', country:'India' },
    images:['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80'],
    culturalSignificance:9, viewCount:1240, likeCount:234, shareCount:67,
    preservationStatus:'published', isPublic:true,
    author:{ id:'u2', email:'r@r.com', fullName:'Ramesh Kumar', isElder:true, preferredLanguage:'bn', createdAt:'2024-01-01' },
    createdAt:'2024-01-08T10:00:00Z', updatedAt:'2024-01-08T10:00:00Z',
  },
  {
    id:'e2', userId:'u3', title:'Grandmother\'s Shorshe Ilish Recipe — 1960s',
    content:'She never wrote it down. The amount of mustard was judged by smell, the turmeric by colour of the oil. I watched her hands move without measuring — pure muscle memory.',
    memoryType:'recipe', timePeriod:'1960s', language:'en',
    emotionTags:['love','nostalgia','gratitude'], peopleMentioned:['Grandmother'],
    placesMentioned:['Dhaka'], images:[],
    culturalSignificance:8, viewCount:892, likeCount:178, shareCount:45,
    preservationStatus:'published', isPublic:true,
    author:{ id:'u3', email:'p@p.com', fullName:'Priya Sharma', isElder:false, preferredLanguage:'en', createdAt:'2024-01-01' },
    createdAt:'2024-01-06T10:00:00Z', updatedAt:'2024-01-06T10:00:00Z',
  },
]

const SPATIAL_MODES = [
  { id: 'vr', title: 'VR Kolkata 1950', desc: 'Walk through old tram routes, coffee houses, and markets in full 3D immersion.', icon: Glasses, color: 'text-bengal-400', bg: 'bg-bengal-500/10', border: 'border-bengal-500/30', stats: '12 locations' },
  { id: 'ar', title: 'AR Spatial Overlay', desc: 'Point your camera at any Kolkata street to see historical overlays and memory hotspots.', icon: Camera, color: 'text-heritage-400', bg: 'bg-heritage-500/10', border: 'border-heritage-500/30', stats: '340 hotspots' },
  { id: 'map', title: 'Interactive GIS Map', desc: 'Explore geo-tagged memories, story heatmaps, and cultural density maps globally.', icon: MapIcon, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30', stats: '1,240 pins' },
  { id: 'globe', title: 'Story Globe', desc: 'Visualize the global distribution of preserved memories as a rotating 3D earth.', icon: Globe, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30', stats: '47 countries' },
]

const HERITAGE_TOURS = [
  { name: 'College Street Book Market Walk', duration: '25 min', stops: 8, era: '1960s', difficulty: 'Easy' },
  { name: 'Kumartuli Artisan Quarter', duration: '40 min', stops: 12, era: '1940s', difficulty: 'Medium' },
  { name: 'Tram Route #3: Esplanade to Howrah', duration: '35 min', stops: 10, era: '1950s', difficulty: 'Easy' },
  { name: 'Coffee House Intellectual Circuit', duration: '30 min', stops: 6, era: '1970s', difficulty: 'Easy' },
]

const MAP_LAYERS = [
  { name: 'Memory Density', active: true, count: '1,240' },
  { name: 'Story Heatmap', active: false, count: '890' },
  { name: 'Heritage Risk Zones', active: false, count: '45' },
  { name: 'Family Migration Routes', active: false, count: '12' },
  { name: 'Festival Locations', active: true, count: '67' },
]

export default function ExplorePage() {
  const [activeLayer, setActiveLayer] = useState('global')

  return (
    <div className="space-y-8 pb-32 relative z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-heritage-400 text-sm mb-2 font-medium tracking-wide uppercase">
            <Radar className="w-4 h-4 animate-spin" style={{ animationDuration: '4s' }} />
            <span>Spatial Engine Online</span>
            <span className="text-[10px] bg-heritage-500/20 text-heritage-300 px-2 py-0.5 rounded-full ml-1 border border-heritage-500/20">Beta</span>
          </div>
          <h1 className="font-display text-4xl font-black text-white flex items-center gap-3">
            <Compass className="w-8 h-8 text-heritage-500" />
            Global Cultural Explore
          </h1>
          <p className="text-white/50 text-lg mt-2 font-light max-w-xl">
            Access the geo-spatial grid. Experience memories through AR overlays, 3D mapping, VR simulations, and the global story globe.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs text-white/40 font-semibold uppercase tracking-wider">
          <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-green-400" /> 1,240 Locations</span>
          <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5 text-blue-400" /> 47 Countries</span>
        </div>
      </div>

      {/* Spatial Modes */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {SPATIAL_MODES.map((mode, i) => (
          <motion.div key={mode.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className={`glass-dark rounded-[2rem] p-6 border ${mode.border} hover:bg-white/5 transition-all cursor-pointer group relative overflow-hidden`}>
            <div className={`absolute inset-0 ${mode.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <mode.icon className={`w-8 h-8 ${mode.color} mb-4 relative z-10 group-hover:scale-110 transition-transform`} />
            <h3 className="text-lg font-bold text-white mb-2 relative z-10">{mode.title}</h3>
            <p className="text-xs text-white/50 font-light relative z-10 mb-4 leading-relaxed">{mode.desc}</p>
            <div className="flex items-center justify-between relative z-10">
              <span className="text-[10px] text-white/30 font-bold uppercase tracking-wider">{mode.stats}</span>
              <button className="text-xs font-bold uppercase tracking-wider text-white/80 bg-white/10 px-4 py-2 rounded-xl group-hover:bg-white group-hover:text-black transition-colors">
                Launch
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Heritage Tours */}
      <div>
        <h2 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-2">
          <Route className="w-5 h-5 text-bengal-400" /> AR Heritage Tours
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {HERITAGE_TOURS.map((tour, i) => (
            <motion.div key={tour.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.08 }}
              className="glass-dark rounded-2xl border border-white/5 p-5 hover:border-white/20 transition-all group cursor-pointer flex items-center gap-5">
              <div className="w-14 h-14 rounded-xl bg-heritage-500/10 border border-heritage-500/30 flex items-center justify-center text-heritage-400 shrink-0 group-hover:scale-110 transition-transform">
                <Navigation className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white text-sm truncate group-hover:text-heritage-400 transition-colors">{tour.name}</h3>
                <div className="flex flex-wrap gap-3 mt-1.5 text-[10px] text-white/40 font-medium uppercase tracking-wider">
                  <span>{tour.duration}</span>
                  <span>{tour.stops} stops</span>
                  <span>{tour.era}</span>
                  <span className={`px-1.5 py-0.5 rounded ${tour.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{tour.difficulty}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Map Layers + Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Map Layers */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="glass-dark rounded-3xl border border-white/10 p-6">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Layers className="w-5 h-5 text-green-400" /> Map Layers</h3>
          <div className="space-y-3">
            {MAP_LAYERS.map(layer => (
              <div key={layer.name} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${layer.active ? 'bg-green-400 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-white/20'}`} />
                  <span className="text-sm text-white/70 font-medium">{layer.name}</span>
                </div>
                <span className="text-xs text-white/30 font-mono">{layer.count}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Global Feed */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
              <Navigation className="w-5 h-5 text-heritage-500" /> Live Geospatial Feed
            </h2>
            <div className="flex bg-black/40 border border-white/10 rounded-full p-1">
              {['Global', 'Local', 'Time Travel'].map(layer => (
                <button key={layer} onClick={() => setActiveLayer(layer.toLowerCase())} 
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${activeLayer === layer.toLowerCase() ? 'bg-white text-black shadow-lg' : 'text-white/50 hover:text-white'}`}>
                  {layer}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {EXPLORE_MEMORIES.map((memory, i) => (
              <motion.div key={memory.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + i * 0.1 }}>
                <MemoryCard memory={memory} />
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            className="glass-dark border border-heritage-500/30 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center text-center mt-5">
            <div className="w-16 h-16 rounded-full bg-heritage-500/20 flex items-center justify-center mb-4">
              <Clock className="w-8 h-8 text-heritage-400 animate-spin" style={{ animationDuration: '4s' }} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Decrypting Spatial Data...</h3>
            <p className="text-sm text-white/50 max-w-sm">The AI is currently processing 1,240 new memories uploaded from 47 countries for the global heritage map.</p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
