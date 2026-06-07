'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Mic, Sparkles, Globe, Brain, ArrowRight, ChevronDown, Play, Shield, Zap, Users, BookOpen, Map, Cpu, Radio, Eye, Heart, Award, Star, Database, Lock, Headphones, Video, Layers, BarChart3, Languages } from 'lucide-react'
import Link from 'next/link'
import { useRef } from 'react'
import { ThreeBackground } from '@/components/ui/ThreeBackground'
import { HeritageCopilot } from '@/components/ui/HeritageCopilot'
import { Navbar } from '@/components/ui/Navbar'

const FEATURES = [
  { icon: '🤖', title: 'Digital Twin AI', description: 'Train a neural clone with your voice, memories, and personality. Future generations can talk to you directly.', tag: 'AI Core' },
  { icon: '🧬', title: 'Memory DNA Engine', description: 'Visualize your family history as an interactive 3D galaxy. Watch how stories interconnect across generations.', tag: '3D Viz' },
  { icon: '🗺️', title: 'Spatial Computing VR', description: 'Put on your headset and literally walk through Kolkata in 1950. Experience the Para culture in full 3D.', tag: 'XR' },
  { icon: '🎤', title: 'Voice Cloning', description: 'Preserve the exact tone, dialect, and emotional resonance of your elders\' voices forever using ElevenLabs.', tag: 'Audio AI' },
  { icon: '🧠', title: 'Heritage GPT', description: 'Our custom LLM trained on 100,000+ pages of Bengali literature and cultural archives.', tag: 'LLM' },
  { icon: '🎬', title: 'AI Auto-Documentary', description: 'Turn raw voice recordings into cinematic documentaries complete with maps, B-roll, and music in seconds.', tag: 'GenAI' },
  { icon: '🌐', title: '16 Language Support', description: 'Real-time AI translation across Bengali, Hindi, English, Tamil, Telugu, Japanese, Korean, Arabic and more.', tag: 'i18n' },
  { icon: '🔐', title: 'Blockchain Archive', description: 'Tamper-proof cultural records stored on-chain. Memory NFTs with proof of authenticity and heritage ownership.', tag: 'Web3' },
  { icon: '📡', title: 'Community Adda Rooms', description: 'Live voice rooms for storytelling, heritage challenges, digital festivals and collaborative memory sharing.', tag: 'Social' },
]

const STATS = [
  { value: '150+', label: 'AI Features' },
  { value: '16', label: 'Languages' },
  { value: '100K+', label: 'Archive Pages' },
  { value: '10M+', label: 'Memories Target' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: 'AAA', label: 'WCAG Level' },
]

const TIMELINE_EVENTS = [
  { year: '1920', title: 'The Golden Age of Adda', desc: 'Coffee House intellectuals shape modern Bengali thought.' },
  { year: '1947', title: 'Partition & Migration', desc: 'Families displaced. Oral traditions become the only heritage.' },
  { year: '1965', title: 'Durga Puja Renaissance', desc: 'Kumartuli artisans create the iconic pandal culture.' },
  { year: '1985', title: 'The Tram Era Fades', desc: 'Last tram routes disappear. A generation\'s commute memory lost.' },
  { year: '2026', title: 'AddaSmriti X Launches', desc: 'AI preserves what time tried to erase. Forever.' },
]

const TESTIMONIALS = [
  { name: 'Prof. Ananda Sen', role: 'Jadavpur University', text: 'This is the most important cultural technology I have seen in 40 years of heritage research.', avatar: '👨‍🏫' },
  { name: 'Meera Devi', role: 'Elder, North Kolkata', text: 'My grandchildren can now hear my stories exactly as I told them. This is a miracle.', avatar: '👵' },
  { name: 'Dr. Rina Mukherjee', role: 'UNESCO Advisor', text: 'AddaSmriti X sets the global benchmark for digital heritage preservation.', avatar: '👩‍💼' },
]

const TECH = [
  { name: 'Next.js 15', cat: 'Frontend' }, { name: 'React 19', cat: 'Frontend' }, { name: 'Three.js', cat: 'Frontend' },
  { name: 'Framer Motion', cat: 'Frontend' }, { name: 'TypeScript', cat: 'Frontend' }, { name: 'Tailwind CSS', cat: 'Frontend' },
  { name: 'GPT-4o', cat: 'AI' }, { name: 'Claude 3.5', cat: 'AI' }, { name: 'Gemini Pro', cat: 'AI' },
  { name: 'Whisper', cat: 'AI' }, { name: 'ElevenLabs', cat: 'AI' }, { name: 'LangChain', cat: 'AI' },
  { name: 'Django', cat: 'Backend' }, { name: 'FastAPI', cat: 'Backend' }, { name: 'PostgreSQL', cat: 'Backend' },
  { name: 'Neo4j', cat: 'Backend' }, { name: 'Pinecone', cat: 'Backend' }, { name: 'Redis', cat: 'Backend' },
]

export default function HomePage() {
  const heroRef = useRef(null)
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.9])
  const heroY = useTransform(scrollY, [0, 400], [0, 100])

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 selection:bg-heritage-500/30 overflow-x-hidden">
      <ThreeBackground />
      <HeritageCopilot />
      <Navbar />

      {/* ═══════════════ HERO ═══════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 bg-aurora-gradient opacity-20 mix-blend-screen pointer-events-none" />
        <motion.div style={{ opacity: heroOpacity, scale: heroScale, y: heroY }} className="relative z-10 container mx-auto px-4 text-center max-w-5xl">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 glass px-5 py-2.5 rounded-full mb-8 border border-white/10">
            <Sparkles className="w-4 h-4 text-heritage-400" />
            <span className="text-sm font-medium text-white/90">World's First Cultural Intelligence OS</span>
            <span className="text-xs bg-heritage-500/20 text-heritage-300 px-2 py-0.5 rounded-full font-bold">v2.0</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1 }}
            className="font-display text-7xl md:text-8xl lg:text-[7.5rem] font-black text-white mb-6 leading-[1.1] tracking-tighter">
            Preserve Your Heritage.<br />
            <span className="gradient-text">Forever.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}
            className="text-xl md:text-2xl text-white/60 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Train a Digital Twin, clone your voice, and turn your memories into an interactive 3D universe. AddaSmriti X is the ultimate AI preservation platform.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/auth/register"
              className="group relative inline-flex items-center gap-3 bg-heritage-500 text-white text-lg font-semibold px-8 py-4 rounded-full transition-all overflow-hidden shadow-[0_0_30px_rgba(255,127,26,0.4)]">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <Mic className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Initialize Memory Core</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 text-white text-lg font-semibold px-8 py-4 rounded-full border border-white/10 transition-all backdrop-blur-md">
              <Play className="w-5 h-5 text-heritage-400" fill="currentColor" />
              Watch Vision Video
            </button>
          </motion.div>
        </motion.div>

        <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0], opacity: [0.3, 1, 0.3] }} transition={{ duration: 3, repeat: Infinity }}>
          <ChevronDown className="w-8 h-8 text-white/30" />
        </motion.div>
      </section>

      {/* ═══════════════ LIVE STATS TICKER ═══════════════ */}
      <section className="py-16 relative z-10 border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {STATS.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="text-center group">
                <div className="text-4xl md:text-5xl font-black text-white mb-2 group-hover:text-heritage-400 transition-colors">{s.value}</div>
                <div className="text-xs uppercase tracking-widest text-white/40 font-semibold">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FEATURES GRID ═══════════════ */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-bengal-400 text-sm mb-4 font-medium tracking-wide uppercase px-4 py-1.5 rounded-full bg-bengal-500/10 border border-bengal-500/20">
              <Layers className="w-4 h-4" /> Feature Matrix
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="font-display text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
              150+ Next-Gen Capabilities
            </motion.h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto font-light">
              Built with Next.js 15, GPT-4o, Pinecone, Neo4j, and Three.js to deliver an experience that feels like magic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {FEATURES.map((feature, i) => (
              <Link href="/features" key={i}>
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                  className="heritage-card group p-8 relative overflow-hidden h-full block cursor-pointer border border-transparent hover:border-heritage-500/30 transition-all">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-heritage-500/10 rounded-full blur-3xl group-hover:bg-heritage-500/20 transition-colors" />
                  <div className="flex items-center justify-between mb-5 relative z-10">
                    <div className="text-5xl">{feature.icon}</div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-white/30 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">{feature.tag}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 relative z-10 group-hover:text-heritage-400 transition-colors">{feature.title}</h3>
                  <p className="text-white/60 leading-relaxed relative z-10 text-sm">{feature.description}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ HERITAGE TIMELINE ═══════════════ */}
      <section className="py-32 relative z-10 border-t border-white/5">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-20">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="font-display text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
              A Century of Culture
            </motion.h2>
            <p className="text-xl text-white/50 font-light">From the Golden Age of Adda to the AI Age of Preservation.</p>
          </div>

          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-heritage-500/50 via-bengal-500/50 to-transparent" />
            {TIMELINE_EVENTS.map((evt, i) => (
              <motion.div key={evt.year} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex items-start gap-6 mb-16 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="hidden md:block flex-1" />
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-heritage-500/20 border border-heritage-500/30 flex items-center justify-center text-heritage-400 font-black text-sm shrink-0 shadow-[0_0_20px_rgba(255,127,26,0.2)]">
                  {evt.year}
                </div>
                <div className="flex-1 glass-dark p-6 rounded-2xl border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-2">{evt.title}</h3>
                  <p className="text-white/50 text-sm">{evt.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section className="py-32 relative z-10 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="font-display text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Trusted by Heritage Leaders
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass-dark p-8 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-heritage-500/30 transition-all">
                <div className="absolute top-0 right-0 w-32 h-32 bg-heritage-500/5 rounded-full blur-3xl group-hover:bg-heritage-500/10 transition-colors" />
                <div className="flex items-center gap-1 mb-6 text-heritage-400">{[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}</div>
                <p className="text-white/70 leading-relaxed mb-8 italic relative z-10">"{t.text}"</p>
                <div className="flex items-center gap-3 relative z-10">
                  <div className="text-3xl">{t.avatar}</div>
                  <div>
                    <p className="font-bold text-white text-sm">{t.name}</p>
                    <p className="text-xs text-white/40">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ TECH STACK ═══════════════ */}
      <section className="py-32 relative z-10 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="font-display text-4xl font-black text-white mb-4">
              Enterprise-Grade Stack
            </motion.h2>
            <p className="text-white/40">Engineered for 100M+ users at global scale.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {TECH.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}
                className="glass-dark px-5 py-3 rounded-full border border-white/10 text-sm text-white/70 font-medium hover:text-white hover:border-heritage-500/30 transition-all cursor-default">
                {t.name}
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center gap-8 mt-12">
            {[{ icon: Shield, label: 'GDPR Compliant' }, { icon: Lock, label: 'E2E Encrypted' }, { icon: Eye, label: 'WCAG AAA' }].map((b, i) => (
              <div key={i} className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-wider font-semibold">
                <b.icon className="w-4 h-4 text-green-400" /> {b.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="glass-panel p-16 rounded-[3rem] border border-heritage-500/20 relative overflow-hidden shadow-[0_0_60px_rgba(255,127,26,0.1)]">
            <div className="absolute inset-0 bg-gradient-to-br from-heritage-500/10 to-bengal-500/10 mix-blend-screen" />
            <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-6 relative z-10">Ready to Preserve?</h2>
            <p className="text-white/60 text-lg mb-10 relative z-10">Join thousands preserving their cultural heritage with the world's most advanced AI platform.</p>
            <Link href="/auth/register" className="relative z-10 inline-flex items-center gap-3 bg-white text-black font-bold px-10 py-5 rounded-full text-lg hover:bg-neutral-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              Start Preserving Free <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="border-t border-white/10 bg-black/50 backdrop-blur-xl py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-heritage-500 to-bengal-500 flex items-center justify-center text-white text-sm font-bold">আ</div>
                <span className="font-display text-xl font-bold text-white">AddaSmriti <span className="text-heritage-400">X</span></span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed">The World's Most Advanced Cultural Preservation Ecosystem.</p>
            </div>
            {[
              { title: 'Platform', links: ['Features', 'Digital Twin', 'Memory DNA', 'Heritage AI', 'VR Kolkata'] },
              { title: 'Resources', links: ['Documentation', 'API Reference', 'Research Papers', 'Blog', 'Community'] },
              { title: 'Company', links: ['About Us', 'Careers', 'Press Kit', 'Contact', 'UNESCO Partnership'] },
            ].map(col => (
              <div key={col.title}>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">{col.title}</h4>
                <ul className="space-y-2">{col.links.map(l => <li key={l}><span className="text-sm text-white/40 hover:text-white cursor-pointer transition-colors">{l}</span></li>)}</ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-white/20 text-sm">© 2026 AddaSmriti Foundation. All systems nominal.</div>
            <div className="flex gap-6 text-white/30 text-sm">
              <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
              <span className="hover:text-white cursor-pointer transition-colors">Security</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
