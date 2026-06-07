'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bot, Sparkles, Mic, Brain, ChevronRight, Activity, Cpu, Volume2, Heart, MessageSquare, Clock, Shield, Fingerprint, Globe, Headphones, Video, BarChart3 } from 'lucide-react'
import { DigitalTwinChat } from '@/components/ai/DigitalTwinChat'
import type { DigitalTwin } from '@/types/ai'

const DEMO_TWIN: DigitalTwin = {
  id: 'twin-1', userId: 'u1', twinName: 'Ramesh Ji (Digital)',
  trainingStatus: 'completed', memoryCount: 8,
  modelVersion: '2.1', lastTrainedAt: '2024-01-15T10:00:00Z',
  createdAt: '2024-01-01T00:00:00Z',
}

const PERSONALITY_TRAITS = [
  { trait: 'Storytelling Style', value: 92, desc: 'Vivid, metaphorical, dramatic pauses' },
  { trait: 'Humor Pattern', value: 78, desc: 'Dry wit, Bengali wordplay, self-deprecating' },
  { trait: 'Emotional Warmth', value: 95, desc: 'Deeply caring, uses endearments' },
  { trait: 'Dialect Accuracy', value: 88, desc: 'North Kolkata Bengali with Dhaka inflections' },
  { trait: 'Knowledge Depth', value: 84, desc: 'History, literature, local geography' },
]

const VOICE_SAMPLES = [
  { id: 1, title: 'Durga Puja Story', duration: '4:32', date: 'Jan 12', emotion: 'Joy' },
  { id: 2, title: 'Childhood in Dhaka', duration: '8:15', date: 'Jan 10', emotion: 'Nostalgia' },
  { id: 3, title: 'Fish Market Morning', duration: '2:47', date: 'Jan 8', emotion: 'Humor' },
  { id: 4, title: 'Grandmother\'s Lullaby', duration: '3:21', date: 'Jan 5', emotion: 'Love' },
]

const TRAINING_LOG = [
  { batch: '#7', memories: 3, accuracy: '+2.1%', time: '2h ago', status: 'Complete' },
  { batch: '#6', memories: 2, accuracy: '+1.8%', time: '1d ago', status: 'Complete' },
  { batch: '#5', memories: 4, accuracy: '+3.2%', time: '3d ago', status: 'Complete' },
]

export default function DigitalTwinPage() {
  const [chatOpen, setChatOpen] = useState(false)

  if (chatOpen) {
    return (
      <div className="h-[calc(100vh-10rem)] animate-in fade-in zoom-in duration-500">
        <button onClick={() => setChatOpen(false)} className="flex items-center gap-2 text-sm text-white/50 mb-4 hover:text-white transition-colors">
          ← Terminate Neural Link
        </button>
        <DigitalTwinChat twin={DEMO_TWIN} className="h-full" />
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto relative z-10 pb-20">
      <div className="flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2 text-green-400 text-sm mb-2 font-medium tracking-wide uppercase">
            <Activity className="w-4 h-4" />
            <span>Neural Engine Online</span>
            <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full ml-1 border border-green-500/30">v{DEMO_TWIN.modelVersion}</span>
          </div>
          <h1 className="font-display text-4xl font-black text-white flex items-center gap-3">
            <Cpu className="w-8 h-8 text-heritage-500" />
            Digital Twin Manager
          </h1>
        </div>
      </div>

      {/* Twin Profile Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[2.5rem] glass-panel p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-heritage-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-bengal-500/15 rounded-full blur-[80px] translate-y-1/3 pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-heritage-500/20 rounded-full blur-xl group-hover:bg-heritage-500/40 transition-all duration-500" />
            <div className="w-36 h-36 rounded-full glass-dark border border-white/20 flex items-center justify-center text-6xl shadow-2xl relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
               <span className="relative z-10 filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300">👴</span>
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 border-4 border-[#020617] rounded-full animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.6)]" />
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
              <h2 className="text-3xl font-display font-black text-white">{DEMO_TWIN.twinName}</h2>
              <span className="text-xs bg-green-500/20 border border-green-500/30 text-green-400 px-3 py-1 rounded-full uppercase tracking-wider font-bold mx-auto md:mx-0">Active</span>
            </div>
            <p className="text-white/60 text-sm mb-4 leading-relaxed max-w-lg mx-auto md:mx-0">
              This entity is trained on <span className="text-white font-semibold">{DEMO_TWIN.memoryCount} verified memories</span>, voice logs, and interaction patterns. Neural architecture Model v{DEMO_TWIN.modelVersion}. Personality fidelity: <span className="text-green-400 font-semibold">91%</span>.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
              <button onClick={() => setChatOpen(true)} className="bg-heritage-500 hover:bg-heritage-400 text-white font-bold px-6 py-3 rounded-xl gap-2 flex items-center transition-all shadow-[0_0_20px_rgba(255,127,26,0.3)] hover:shadow-[0_0_30px_rgba(255,127,26,0.5)]">
                <Bot className="w-5 h-5" /> Initialize Neural Chat
              </button>
              <button className="glass-dark border border-white/20 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-xl gap-2 flex items-center transition-all">
                <Mic className="w-5 h-5" /> Voice Mode
              </button>
              <button className="glass-dark border border-white/20 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-xl gap-2 flex items-center transition-all">
                <Video className="w-5 h-5" /> Video Call
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Bengali', 'Hindi', 'English'].map(l => (
                <span key={l} className="text-[10px] uppercase tracking-wider font-bold bg-white/5 text-white/40 px-2.5 py-1 rounded-full border border-white/10">{l}</span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Memories Processed', value: DEMO_TWIN.memoryCount, icon: Brain, color: 'text-heritage-400' },
          { label: 'Conversations', value: '47', icon: MessageSquare, color: 'text-bengal-400' },
          { label: 'Personality Score', value: '91%', icon: Sparkles, color: 'text-green-400' },
          { label: 'Voice Accuracy', value: '94%', icon: Volume2, color: 'text-purple-400' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="glass-dark rounded-2xl border border-white/10 p-5 hover:border-white/20 transition-all text-center group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <s.icon className={`w-7 h-7 mx-auto mb-3 ${s.color} group-hover:scale-110 transition-transform`} />
            <div className="text-3xl font-black text-white mb-1">{s.value}</div>
            <div className="text-[10px] font-medium uppercase tracking-wider text-white/40">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Personality Traits */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="glass-dark rounded-3xl border border-white/10 p-6">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Fingerprint className="w-5 h-5 text-heritage-400" /> Personality Engine</h3>
          <div className="space-y-5">
            {PERSONALITY_TRAITS.map((t, i) => (
              <div key={t.trait}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-white/80">{t.trait}</span>
                  <span className="text-sm font-black text-heritage-400">{t.value}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${t.value}%` }} transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-heritage-500 to-bengal-500 rounded-full" />
                </div>
                <p className="text-[10px] text-white/30 mt-1">{t.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Voice Samples */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="glass-dark rounded-3xl border border-white/10 p-6">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Headphones className="w-5 h-5 text-purple-400" /> Voice Archive</h3>
          <div className="space-y-3">
            {VOICE_SAMPLES.map((s, i) => (
              <motion.div key={s.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.08 }}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer">
                <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 group-hover:bg-heritage-500/20 group-hover:text-heritage-400 transition-all shrink-0">
                  <Volume2 className="w-4 h-4" />
                </button>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate group-hover:text-heritage-400 transition-colors">{s.title}</p>
                  <p className="text-[10px] text-white/30">{s.date} · {s.duration}</p>
                </div>
                <span className="text-[10px] bg-white/5 text-white/50 px-2 py-0.5 rounded-full border border-white/5">{s.emotion}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Training Log */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="glass-dark rounded-3xl border border-white/10 p-6">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-bengal-400" /> Training History</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-white/30 text-xs uppercase tracking-wider border-b border-white/5">
                <th className="pb-3 pr-4">Batch</th><th className="pb-3 pr-4">Memories</th><th className="pb-3 pr-4">Accuracy Δ</th><th className="pb-3 pr-4">Time</th><th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {TRAINING_LOG.map((log, i) => (
                <tr key={log.batch} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 pr-4 font-mono font-bold text-white">{log.batch}</td>
                  <td className="py-3 pr-4 text-white/60">{log.memories} logs</td>
                  <td className="py-3 pr-4 text-green-400 font-bold">{log.accuracy}</td>
                  <td className="py-3 pr-4 text-white/40">{log.time}</td>
                  <td className="py-3"><span className="text-[10px] uppercase tracking-wider font-bold bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full border border-green-500/30">{log.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Train More CTA */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="glass-dark border border-bengal-500/30 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-bengal-500/5 animate-pulse" />
        <div className="relative z-10 text-center md:text-left">
          <p className="text-lg font-bold text-white">Optimize Neural Pathways</p>
          <p className="text-sm text-white/60 mt-1">You have <span className="text-white font-semibold">4 unprocessed</span> legacy logs ready for training. Processing these will increase personality accuracy to <span className="text-green-400 font-bold">94%</span>.</p>
        </div>
        <button className="bg-white text-black font-bold px-6 py-3 rounded-xl gap-2 flex items-center hover:bg-neutral-200 transition-all relative z-10 shrink-0 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
          Run Training Protocol <ChevronRight className="w-5 h-5" />
        </button>
      </motion.div>

      {/* Security Footer */}
      <div className="flex flex-wrap justify-center gap-6 text-xs text-white/30 uppercase tracking-wider font-semibold pt-4">
        <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-green-400" /> E2E Encrypted</span>
        <span className="flex items-center gap-1.5"><Fingerprint className="w-3.5 h-3.5 text-blue-400" /> Biometric Auth</span>
        <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-purple-400" /> GDPR Compliant</span>
      </div>
    </div>
  )
}
