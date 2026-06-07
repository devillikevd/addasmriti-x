'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Zap, Brain, Globe, Map, Shield, Users, Mic, Heart, Video, BarChart3, Clock, Lock, Share2, Layers, Headphones } from 'lucide-react'
import { Navbar } from '@/components/ui/Navbar'

const FEATURE_CATEGORIES = [
  {
    title: 'Digital Twin AI',
    icon: Brain,
    color: 'text-heritage-400',
    bg: 'bg-heritage-500/10',
    border: 'border-heritage-500/30',
    features: [
      'Neural Voice Cloning (ElevenLabs Integration)',
      'Personality Matrix Emulation (Humor, Tone, Vocabulary)',
      'Continuous Generational Learning',
      'Real-time Audio and Text Synthesis',
      'Multilingual Heritage Comprehension (16+ languages)'
    ]
  },
  {
    title: 'Spatial Exploration',
    icon: Globe,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    features: [
      'AR Memory Hotspots on Real-World Streets',
      'VR Kolkata 1950 Environment Simulator',
      'Interactive GIS Story Maps',
      'Historical Heatmaps & Density Tracking',
      'GPS-Locked Legacy Drops for Future Generations'
    ]
  },
  {
    title: 'Generative Media',
    icon: Video,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    features: [
      '1-Click AI Auto-Documentary Generation',
      'Audio-to-Cinematic Video Conversion',
      'Old Photo AI Restoration & Colorization',
      'Generative B-Roll Matching Historical Eras',
      'Procedural Heritage Music & Ambience'
    ]
  },
  {
    title: 'Family DNA Graph',
    icon: Layers,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    features: [
      '3D Neural Network of Family Memories',
      'Cross-Generational Pattern Recognition',
      'Interactive Force-Directed Story Graph',
      'Emotional Significance Heat-mapping',
      'Automated Genealogy Tree Building'
    ]
  },
  {
    title: 'Virtual Adda Rooms',
    icon: Users,
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    features: [
      'Live Spatial Audio Rooms',
      'Automated Cultural Event Transcription',
      'Community Heritage Challenges & Gamification',
      'Global Diaspora Sync & Calendar',
      'Moderated Elder Storytelling Sessions'
    ]
  },
  {
    title: 'Enterprise Security',
    icon: Shield,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    features: [
      'End-to-End Encryption (E2EE) for All Memories',
      'Decentralized Storage (IPFS) Options',
      'Blockchain-verified Authenticity NFTs',
      'Granular Family Access Controls',
      'Biometric & MFA Authentication'
    ]
  }
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 selection:bg-heritage-500/30">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 text-heritage-400 text-sm mb-6 font-medium tracking-wide uppercase px-4 py-1.5 rounded-full bg-heritage-500/10 border border-heritage-500/20">
            <Zap className="w-4 h-4" /> Feature Matrix
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-black text-white mb-6">
            150+ Next-Gen Capabilities
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-xl text-white/50 font-light leading-relaxed">
            The world's most advanced suite of AI, Spatial Computing, and Generative tools built explicitly for cultural preservation.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURE_CATEGORIES.map((cat, i) => (
            <motion.div key={cat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}
              className={`glass-dark rounded-[2rem] border ${cat.border} p-8 relative overflow-hidden group hover:bg-white/5 transition-all`}>
              <div className={`absolute inset-0 ${cat.bg} opacity-0 group-hover:opacity-10 transition-opacity`} />
              
              <div className="flex items-center gap-4 mb-8 relative z-10">
                <div className={`w-14 h-14 rounded-2xl ${cat.bg} border ${cat.border} flex items-center justify-center`}>
                  <cat.icon className={`w-7 h-7 ${cat.color}`} />
                </div>
                <h2 className="text-2xl font-bold text-white">{cat.title}</h2>
              </div>
              
              <ul className="space-y-4 relative z-10">
                {cat.features.map(f => (
                  <li key={f} className="flex items-start gap-3">
                    <CheckCircle2 className={`w-5 h-5 ${cat.color} shrink-0 mt-0.5`} />
                    <span className="text-white/70 text-sm leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        
        {/* API CTA */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          className="mt-20 glass-panel border border-white/10 rounded-3xl p-12 text-center max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-heritage-500/10 to-bengal-500/10 mix-blend-screen" />
          <h3 className="text-3xl font-black text-white mb-4 relative z-10">AddaSmriti API Access</h3>
          <p className="text-white/60 mb-8 relative z-10">Build your own cultural heritage applications using our proprietary AI models and memory graphing API.</p>
          <button className="bg-white text-black font-bold px-8 py-4 rounded-full hover:bg-neutral-200 transition-colors relative z-10 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            Read API Documentation
          </button>
        </motion.div>
      </div>
    </div>
  )
}
