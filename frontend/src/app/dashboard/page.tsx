'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Mic, Bot, Users, TrendingUp, Clock, Star, ArrowRight, Sparkles, Globe, Map, Video, Shield, Brain, Zap, Award, Activity, Radio, Database, BarChart3, Headphones, Languages, Eye, BookOpen, Network } from 'lucide-react'

const QUICK_ACTIONS = [
  { href: '/dashboard/memories/new', icon: Mic, label: 'Initialize Memory', emoji: '🎤', desc: 'Record a new neural log' },
  { href: '/dashboard/digital-twin', icon: Bot, label: 'Talk to Twin', emoji: '🤖', desc: 'Neural chat interface' },
  { href: '/dashboard/ai-search', icon: Sparkles, label: 'Heritage AI', emoji: '🧠', desc: 'Ask the cultural oracle' },
  { href: '/dashboard/explore', icon: Globe, label: 'VR Kolkata 1950', emoji: '🥽', desc: 'Spatial exploration' },
  { href: '/dashboard/dna', icon: Network, label: 'Memory DNA', emoji: '🧬', desc: '3D galaxy visualization' },
  { href: '/dashboard/communities', icon: Users, label: 'Adda Rooms', emoji: '📡', desc: 'Live voice communities' },
]

const RECENT_MEMORIES = [
  { id: '1', title: 'Durga Puja 1985 - Park Street', type: 'festival', time: '2 hours ago', significance: 99, emotions: ['nostalgia', 'joy'] },
  { id: '2', title: 'Dadi\'s Fish Curry Recipe', type: 'recipe', time: 'Yesterday', significance: 85, emotions: ['love', 'gratitude'] },
  { id: '3', title: 'First Day at Jadavpur University', type: 'personal', time: '3 days ago', significance: 92, emotions: ['pride', 'wonder'] },
  { id: '4', title: 'The Great Flood of 1978', type: 'historical', time: '5 days ago', significance: 88, emotions: ['pride', 'humor'] },
  { id: '5', title: 'Grandmother\'s Lullaby - Audio Log', type: 'song', time: '1 week ago', significance: 95, emotions: ['love', 'nostalgia'] },
]

const AI_AGENTS = [
  { name: 'Family Historian', status: 'Active', icon: '📚', task: 'Mapping generational tree...', color: 'text-blue-400' },
  { name: 'Story Curator', status: 'Active', icon: '✍️', task: 'Organizing festival memories...', color: 'text-purple-400' },
  { name: 'Translation Agent', status: 'Idle', icon: '🌐', task: 'Awaiting new Bengali input...', color: 'text-green-400' },
  { name: 'Fact Verifier', status: 'Active', icon: '🔍', task: 'Cross-referencing archive #492...', color: 'text-heritage-400' },
]

const ACTIVITY_FEED = [
  { icon: '🧬', text: 'Memory DNA graph updated with 3 new neural connections.', time: '12m ago' },
  { icon: '🤖', text: 'Digital Twin "Ramesh Ji" completed voice training batch #7.', time: '1h ago' },
  { icon: '🎤', text: 'Voice clone accuracy improved to 94.2% after new sample.', time: '3h ago' },
  { icon: '📡', text: 'Kolkata Heritage Circle community reached 1,240 members.', time: '6h ago' },
  { icon: '🎬', text: 'AI Documentary "Durga Puja 1985" rendering complete.', time: '12h ago' },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8 relative z-10 pb-20">
      {/* Welcome Banner */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl glass-panel p-8 md:p-10 shadow-2xl border border-white/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-heritage-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-20 w-64 h-64 bg-bengal-500/20 rounded-full blur-[80px] translate-y-1/2 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row gap-10">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-heritage-400 text-sm mb-3 font-medium tracking-wide uppercase">
              <Activity className="w-4 h-4" />
              <span>Neural Link Established</span>
              <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full ml-2 border border-green-500/30">All Systems Online</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-black mb-4 text-white">নমস্কার, Demo! 👋</h1>
            <p className="text-white/60 mb-8 max-w-xl text-lg font-light leading-relaxed">
              Your Legacy Vault contains <span className="text-white font-semibold">12</span> verified memories. Your Digital Twin is <span className="text-green-400 font-medium">Online</span> with 91% personality accuracy. <span className="text-heritage-400 font-medium">4 AI agents</span> are actively processing your heritage data.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/dashboard/memories/new"
                className="inline-flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-neutral-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                <Mic className="w-5 h-5" /> Record Neural Log
              </Link>
              <Link href="/dashboard/dna"
                className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 font-semibold px-6 py-3 rounded-full hover:bg-white/20 transition-colors backdrop-blur-md">
                <Globe className="w-5 h-5 text-heritage-400" /> View Memory DNA
              </Link>
            </div>
          </div>

          {/* Initialization Checklist */}
          <div className="w-full md:w-72 shrink-0 glass-dark rounded-2xl border border-white/10 p-5 hidden lg:block">
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Initialization Progress</h3>
            <div className="space-y-4">
              {[
                { label: 'Create Account', done: true },
                { label: 'Record First Memory', done: true },
                { label: 'Initialize Digital Twin', done: true },
                { label: 'Upload Voice Sample', done: false },
                { label: 'Join a Community Node', done: false },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${item.done ? 'bg-green-500 border-green-500 text-[#020617]' : 'border-white/20'}`}>
                    {item.done && <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                  </div>
                  <span className={`text-sm ${item.done ? 'text-white/40 line-through' : 'text-white/80'}`}>{item.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white/50">Completion</span>
                <span className="text-heritage-400 font-bold">60%</span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-heritage-500 to-bengal-500 h-full w-[60%]" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Daily Fact / AI Insight */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="glass-dark border border-heritage-500/20 rounded-2xl p-4 flex flex-col md:flex-row items-center gap-4 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-heritage-500" />
        <div className="w-10 h-10 rounded-full bg-heritage-500/20 flex items-center justify-center shrink-0">
          <BookOpen className="w-5 h-5 text-heritage-400" />
        </div>
        <div className="flex-1">
          <p className="text-xs text-heritage-400 font-bold uppercase tracking-wider mb-1">Today in Heritage</p>
          <p className="text-sm text-white/80">The first passenger train in Eastern India ran from Howrah to Hooghly on August 15, 1854. This revolutionized travel and the exchange of culture across the Bengal presidency.</p>
        </div>
        <button className="text-xs font-semibold px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors shrink-0 border border-white/10">
          Save to Vault
        </button>
      </motion.div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-2">
          <Zap className="w-5 h-5 text-heritage-500" /> Quick Commands
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {QUICK_ACTIONS.map((action, i) => (
            <motion.div key={action.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <Link href={action.href}>
                <div className="group p-5 glass-dark rounded-2xl border border-white/5 hover:border-heritage-500/50 hover:bg-white/5 transition-all cursor-pointer text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-heritage-500/0 to-heritage-500/0 group-hover:from-heritage-500/10 group-hover:to-transparent transition-all duration-500" />
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl mb-3 mx-auto group-hover:scale-110 group-hover:bg-white/10 transition-transform duration-300 shadow-lg relative z-10">
                    {action.emoji}
                  </div>
                  <p className="text-sm font-semibold text-white/90 relative z-10 mb-1">{action.label}</p>
                  <p className="text-[10px] text-white/30 relative z-10">{action.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Memories */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-bold text-white">Recent Neural Logs</h2>
              <Link href="/dashboard/memories" className="text-sm text-heritage-400 font-medium flex items-center gap-1 hover:gap-2 transition-all">
                View Archive <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-3">
              {RECENT_MEMORIES.map((mem, i) => (
                <motion.div key={mem.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                  <Link href={`/dashboard/memories/${mem.id}`}>
                    <div className="group flex items-center gap-5 p-4 glass-dark rounded-2xl border border-white/5 hover:border-white/20 transition-all cursor-pointer">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl group-hover:bg-white/10 transition-colors shrink-0">
                        {mem.type === 'festival' ? '🎉' : mem.type === 'recipe' ? '🍛' : mem.type === 'song' ? '🎵' : mem.type === 'historical' ? '🏛️' : '📖'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white truncate group-hover:text-heritage-400 transition-colors">{mem.title}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-white/40 flex items-center gap-1"><Clock className="w-3 h-3" />{mem.time}</span>
                          <div className="flex gap-1">{mem.emotions.slice(0,2).map(e => <span key={e} className="text-[10px] bg-white/5 text-white/50 px-1.5 py-0.5 rounded">{e}</span>)}</div>
                        </div>
                      </div>
                      <div className="text-xs font-bold bg-heritage-500/20 border border-heritage-500/30 text-heritage-300 px-3 py-1.5 rounded-full flex items-center gap-1 shadow-[0_0_10px_rgba(255,127,26,0.2)] shrink-0">
                        <Star className="w-3 h-3 fill-current" /> {mem.significance}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* AI Agents Grid */}
          <div>
            <h2 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-bengal-400" /> Active AI Agents
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {AI_AGENTS.map((agent, i) => (
                <motion.div key={agent.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.08 }}
                  className="glass-dark rounded-2xl border border-white/5 p-5 hover:border-white/20 transition-all group">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{agent.icon}</span>
                      <h3 className="font-semibold text-white text-sm">{agent.name}</h3>
                    </div>
                    <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border ${agent.status === 'Active' ? 'bg-green-500/20 text-green-400 border-green-500/30 animate-pulse' : 'bg-white/10 text-white/40 border-white/10'}`}>
                      {agent.status}
                    </span>
                  </div>
                  <p className="text-xs text-white/40 font-mono">{agent.task}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <h2 className="text-xl font-display font-bold text-white mb-2">System Status</h2>
          {[
            { label: 'Total Memories', value: '12', icon: Mic, delta: '+2 this week', color: 'text-blue-400' },
            { label: 'Digital Twin Sync', value: '91%', icon: Bot, delta: 'Optimal', color: 'text-green-400' },
            { label: 'Cultural Impact', value: '1.2K', icon: TrendingUp, delta: 'Top 5% Globally', color: 'text-heritage-400' },
            { label: 'Voice Accuracy', value: '94%', icon: Headphones, delta: '+3% this batch', color: 'text-purple-400' },
            { label: 'Graph Nodes', value: '47', icon: Network, delta: '12 connections', color: 'text-bengal-400' },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + i * 0.08 }}
              className="glass-dark rounded-2xl border border-white/5 p-5 hover:bg-white/5 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-white/50 font-medium uppercase tracking-wider">{stat.label}</p>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <p className="text-3xl font-black text-white mb-1">{stat.value}</p>
              <p className={`text-xs font-medium ${stat.color}`}>{stat.delta}</p>
            </motion.div>
          ))}
          
          {/* Documentary Card */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="glass-dark rounded-2xl border border-heritage-500/30 p-6 relative overflow-hidden">
             <div className="absolute inset-0 bg-heritage-500/5 animate-pulse" />
             <div className="relative z-10 text-center">
               <Video className="w-8 h-8 text-heritage-400 mx-auto mb-3" />
               <h3 className="font-bold text-white mb-2">AI Documentary Ready</h3>
               <p className="text-xs text-white/60 mb-4">Your AI generated documentary "Durga Puja 1985" is ready to view.</p>
               <button className="w-full bg-white/10 hover:bg-white/20 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors border border-white/10">
                 Watch Now
               </button>
             </div>
          </motion.div>

          {/* Activity Feed */}
          <div>
            <h3 className="text-sm font-bold text-white/50 uppercase tracking-wider mb-4">Live Activity Feed</h3>
            <div className="space-y-3">
              {ACTIVITY_FEED.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 + i * 0.05 }}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                  <span className="text-lg shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-xs text-white/60 leading-relaxed">{item.text}</p>
                    <p className="text-[10px] text-white/30 mt-1">{item.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Gamification */}
          <div className="glass-dark rounded-2xl border border-white/5 p-5">
            <h3 className="text-sm font-bold text-white/50 uppercase tracking-wider mb-4 flex items-center gap-2"><Award className="w-4 h-4 text-heritage-400" /> Heritage Badges</h3>
            <div className="grid grid-cols-3 gap-2">
              {['🏆 Pioneer', '🎤 Storyteller', '👨‍👩‍👧 Family Keeper', '📜 Historian', '🌍 Global', '🔒 Locked'].map((b, i) => (
                <div key={i} className={`text-center p-2 rounded-xl text-[10px] font-bold uppercase tracking-wider ${i < 5 ? 'bg-heritage-500/10 text-heritage-300 border border-heritage-500/20' : 'bg-white/5 text-white/20 border border-white/5'}`}>
                  {b}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Small helper for icon referencing
function Cpu(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>
}
