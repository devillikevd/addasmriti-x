'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Plus, Search, MapPin, Radio, Mic, Users as UsersIcon, Network, Calendar, Trophy, Globe, Activity, Headphones, Sparkles, MessageSquare, Clock } from 'lucide-react'

const COMMUNITIES = [
  { id:'1', name:'Kolkata Heritage Circle', emoji:'🏛️', members:1240, memories:3800, city:'Kolkata', type:'City Heritage', joined:true, live: true, lang: 'Bengali' },
  { id:'2', name:'Bengali Food Traditions', emoji:'🍛', members:890, memories:1200, city:'Global', type:'Food & Culture', joined:false, live: false, lang: 'English' },
  { id:'3', name:'Partition Memories 1947', emoji:'📜', members:456, memories:670, city:'Global', type:'History', joined:false, live: false, lang: 'Hindi' },
  { id:'4', name:'Durga Puja Chronicles', emoji:'🎉', members:2100, memories:5400, city:'Global', type:'Festival', joined:true, live: true, lang: 'Bengali' },
  { id:'5', name:'Rabindranath & Literature', emoji:'✍️', members:780, memories:920, city:'Global', type:'Literature', joined:false, live: false, lang: 'Bengali' },
  { id:'6', name:'Baul & Folk Music', emoji:'🎵', members:340, memories:480, city:'West Bengal', type:'Music', joined:false, live: true, lang: 'Bengali' },
  { id:'7', name:'Old Dhaka Narratives', emoji:'🕌', members:620, memories:890, city:'Dhaka', type:'City Heritage', joined:false, live: false, lang: 'Bengali' },
  { id:'8', name:'Diaspora Stories (UK/US)', emoji:'✈️', members:1500, memories:2100, city:'Global', type:'Migration', joined:false, live: false, lang: 'English' },
]

const UPCOMING_EVENTS = [
  { title: 'Global Durga Puja Sync', date: 'Tomorrow, 6 PM', type: 'VR Event', attendees: 450 },
  { title: 'Preserving Grandma\'s Recipes', date: 'Oct 15, 4 PM', type: 'Audio Workshop', attendees: 120 },
  { title: 'The Great Partition Archive', date: 'Oct 20, 8 PM', type: 'Story Sharing', attendees: 890 },
]

export default function CommunitiesPage() {
  const [search, setSearch] = useState('')
  const filtered = COMMUNITIES.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-8 pb-32 relative z-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-purple-400 text-sm mb-2 font-medium tracking-wide uppercase">
            <Radio className="w-4 h-4 animate-pulse" />
            <span>Network Nodes Active</span>
          </div>
          <h1 className="font-display text-4xl font-black text-white flex items-center gap-3">
            <Network className="w-8 h-8 text-heritage-500" />
            Virtual Adda Rooms
          </h1>
          <p className="text-white/50 text-lg mt-2 font-light max-w-2xl">
            Connect with preservation nodes globally. Join live audio instances, collaborate on heritage challenges, and explore community archives.
          </p>
        </div>
        <button className="bg-white hover:bg-neutral-200 text-black font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] shrink-0">
          <Plus className="w-5 h-5" /> Initialize New Room
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Global Nodes', value: '47', icon: Globe, color: 'text-blue-400' },
          { label: 'Active Listeners', value: '1.2K', icon: Headphones, color: 'text-purple-400' },
          { label: 'Live Rooms', value: '3', icon: Radio, color: 'text-red-400' },
          { label: 'Memory Challenges', value: '5', icon: Trophy, color: 'text-heritage-400' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="glass-dark rounded-2xl border border-white/10 p-5 hover:border-white/20 transition-all text-center group">
            <s.icon className={`w-6 h-6 mx-auto mb-3 ${s.color} group-hover:scale-110 transition-transform`} />
            <div className="text-3xl font-black text-white mb-1">{s.value}</div>
            <div className="text-[10px] font-medium uppercase tracking-wider text-white/40">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
              placeholder="Scan global community nodes..." 
              className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-14 pr-4 text-white text-lg placeholder:text-white/30 focus:outline-none focus:border-heritage-500/50 focus:bg-white/5 transition-all shadow-xl backdrop-blur-md"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <AnimatePresence>
              {filtered.map((c, i) => (
                <motion.div key={c.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.05 }}
                  className="glass-dark rounded-[2rem] border border-white/10 p-6 hover:border-white/20 transition-all hover:bg-white/5 group relative overflow-hidden flex flex-col">
                  
                  <div className="absolute inset-0 bg-gradient-to-br from-heritage-500/0 to-transparent opacity-0 group-hover:opacity-100 group-hover:from-heritage-500/5 transition-all duration-500" />

                  <div className="flex items-start gap-4 mb-4 relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform shrink-0">
                      {c.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-white text-lg leading-tight mb-1 truncate group-hover:text-heritage-400 transition-colors">{c.name}</h3>
                        {c.live && (
                          <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full shrink-0 animate-pulse">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-400" /> Live
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-[10px] text-white/50 bg-black/40 px-2 py-0.5 rounded-md border border-white/5">{c.type}</span>
                        <span className="text-[10px] text-white/50 bg-black/40 px-2 py-0.5 rounded-md border border-white/5">{c.lang}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 text-xs text-white/40 mb-6 font-medium relative z-10 mt-auto">
                    <span className="flex items-center gap-1"><UsersIcon className="w-3.5 h-3.5" />{c.members.toLocaleString()}</span>
                    <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" />{c.memories.toLocaleString()} logs</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{c.city}</span>
                  </div>

                  <button className={`w-full py-3 rounded-xl font-bold transition-all relative z-10 flex items-center justify-center gap-2 ${
                    c.joined 
                      ? c.live ? 'bg-heritage-500 hover:bg-heritage-400 text-white shadow-[0_0_20px_rgba(255,127,26,0.3)]' : 'bg-white/10 hover:bg-white/20 text-white'
                      : 'bg-transparent border border-white/20 text-white hover:bg-white/10'
                  }`}>
                    {c.joined && c.live ? <><Mic className="w-4 h-4" /> Join Live Adda</> : c.joined ? 'Enter Archive' : 'Connect to Node'}
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <div className="glass-dark rounded-3xl border border-white/10 p-6">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Calendar className="w-5 h-5 text-bengal-400" /> Scheduled Addas</h3>
            <div className="space-y-4">
              {UPCOMING_EVENTS.map((event, i) => (
                <div key={i} className="group p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-white/10">
                  <h4 className="font-semibold text-white text-sm mb-1 group-hover:text-bengal-400 transition-colors">{event.title}</h4>
                  <div className="flex items-center justify-between text-xs text-white/50">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{event.date}</span>
                    <span>{event.attendees} going</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-xs font-bold uppercase tracking-wider text-white/50 hover:text-white transition-colors py-2 border border-white/10 rounded-xl hover:bg-white/5">
              View Calendar
            </button>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="glass-dark border border-heritage-500/30 rounded-3xl p-6 relative overflow-hidden text-center">
            <div className="absolute inset-0 bg-heritage-500/5 animate-pulse" />
            <Sparkles className="w-8 h-8 text-heritage-400 mx-auto mb-3" />
            <h3 className="font-bold text-white mb-2">Heritage Challenge</h3>
            <p className="text-sm text-white/60 mb-4">Record a memory about "Monsoon in the 1980s" to earn the Historian Badge and 50 points.</p>
            <button className="w-full bg-heritage-500 hover:bg-heritage-400 text-white text-sm font-bold py-2.5 rounded-xl transition-colors shadow-[0_0_15px_rgba(255,127,26,0.3)]">
              Accept Challenge
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
