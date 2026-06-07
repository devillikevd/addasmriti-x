'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Mic, Type, ChevronLeft, ChevronRight, Check, Sparkles, Loader2, Cpu, Globe2, ScanFace } from 'lucide-react'
import { VoiceRecorder } from '@/components/memory/VoiceRecorder'
import { cn } from '@/lib/utils/cn'
import type { EmotionTag, MemoryType, Language } from '@/types/memory'

const MEMORY_TYPES: { value: MemoryType; label: string; emoji: string }[] = [
  { value: 'story', label: 'Story', emoji: '📖' },
  { value: 'festival', label: 'Festival', emoji: '🎉' },
  { value: 'recipe', label: 'Recipe', emoji: '🍛' },
  { value: 'personal', label: 'Personal', emoji: '💫' },
  { value: 'historical', label: 'Historical', emoji: '🏛️' },
  { value: 'tradition', label: 'Tradition', emoji: '🪔' },
  { value: 'song', label: 'Song', emoji: '🎵' },
  { value: 'poem', label: 'Poem', emoji: '✍️' },
]

const EMOTION_TAGS: { value: EmotionTag; label: string; emoji: string }[] = [
  { value: 'nostalgia', label: 'Nostalgia', emoji: '🌅' },
  { value: 'joy', label: 'Joy', emoji: '😊' },
  { value: 'love', label: 'Love', emoji: '❤️' },
  { value: 'pride', label: 'Pride', emoji: '🦁' },
  { value: 'gratitude', label: 'Gratitude', emoji: '🙏' },
  { value: 'sadness', label: 'Sadness', emoji: '💧' },
  { value: 'humor', label: 'Humor', emoji: '😄' },
  { value: 'peace', label: 'Peace', emoji: '🕊️' },
  { value: 'longing', label: 'Longing', emoji: '🌙' },
  { value: 'wonder', label: 'Wonder', emoji: '✨' },
]

const LANGUAGES: { value: Language; label: string }[] = [
  { value: 'en', label: 'English' }, { value: 'bn', label: 'বাংলা' },
  { value: 'hi', label: 'हिंदी' }, { value: 'ta', label: 'தமிழ்' },
  { value: 'te', label: 'తెలుగు' }, { value: 'mr', label: 'मराठी' },
]

const STEPS = ['Classification', 'Neural Link', 'Emotional Tagging', 'Finalize']

export default function NewMemoryPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    title: '',
    content: '',
    memoryType: 'story' as MemoryType,
    language: 'en' as Language,
    timePeriod: '',
    emotionTags: [] as EmotionTag[],
    peopleMentioned: '',
    isPublic: true,
    audioBlob: null as Blob | null,
    audioDuration: 0,
    inputMode: 'voice' as 'voice' | 'text',
  })

  const update = (key: string, val: any) => setForm(f => ({ ...f, [key]: val }))

  const toggleEmotion = (tag: EmotionTag) => {
    setForm(f => ({
      ...f,
      emotionTags: f.emotionTags.includes(tag)
        ? f.emotionTags.filter(t => t !== tag)
        : [...f.emotionTags, tag]
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    await new Promise(r => setTimeout(r, 2000))
    setSaving(false)
    router.push('/dashboard/memories')
  }

  const canProceed = [
    form.memoryType && form.language,
    form.title.trim().length > 3 || form.audioBlob !== null,
    true,
    form.title.trim().length > 3,
  ][step]

  return (
    <div className="max-w-3xl mx-auto pb-32 relative z-10">
      {/* Header */}
      <div className="flex items-center gap-6 mb-12">
        <button onClick={() => step === 0 ? router.back() : setStep(s => s - 1)}
          className="w-12 h-12 rounded-2xl glass-dark border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors text-white">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2 text-green-400 text-xs font-bold tracking-widest uppercase mb-1">
            <Cpu className="w-3.5 h-3.5" /> Initialization Sequence
          </div>
          <h1 className="text-3xl font-display font-black text-white">Record Neural Log</h1>
        </div>
      </div>

      {/* Progress */}
      <div className="flex gap-3 mb-10">
        {STEPS.map((s, i) => (
          <div key={i} className="flex-1">
            <div className={cn("h-1.5 w-full rounded-full transition-all duration-700 mb-2 shadow-[0_0_10px_rgba(255,127,26,0.3)]",
              i < step ? 'bg-heritage-500' : i === step ? 'bg-heritage-400 animate-pulse' : 'bg-white/10')} />
            <p className={cn("text-[10px] uppercase tracking-wider font-bold",
              i <= step ? "text-heritage-400" : "text-white/30")}>Phase 0{i + 1}</p>
            <p className="text-xs text-white/50 font-medium hidden sm:block">{s}</p>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="glass-panel border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-heritage-500/5 to-transparent mix-blend-screen pointer-events-none" />
        
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="relative z-10">

            {step === 0 && (
              <div className="space-y-8">
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-white/70 uppercase tracking-wider mb-4"><Globe2 className="w-4 h-4 text-heritage-400" /> Data Classification</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {MEMORY_TYPES.map(t => (
                      <button key={t.value} onClick={() => update('memoryType', t.value)}
                        className={cn("p-5 rounded-[1.5rem] border-2 text-center transition-all duration-300 relative overflow-hidden group",
                          form.memoryType === t.value ? 'border-heritage-500 bg-heritage-500/10 shadow-[0_0_20px_rgba(255,127,26,0.2)]' : 'border-white/5 bg-black/40 hover:border-white/20 hover:bg-white/5')}>
                        <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{t.emoji}</div>
                        <div className="text-sm font-semibold text-white/80">{t.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <div>
                  <label className="block text-sm font-bold text-white/70 uppercase tracking-wider mb-4">Transcription Language</label>
                  <div className="flex flex-wrap gap-3">
                    {LANGUAGES.map(l => (
                      <button key={l.value} onClick={() => update('language', l.value)}
                        className={cn("px-6 py-3 rounded-xl border text-sm font-bold transition-all tracking-wide",
                          form.language === l.value ? 'border-heritage-500 bg-heritage-500 shadow-[0_0_15px_rgba(255,127,26,0.4)] text-white' : 'border-white/10 bg-black/40 text-white/60 hover:bg-white/10 hover:text-white')}>
                        {l.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-white/70 uppercase tracking-wider mb-2">Temporal Coordinates <span className="text-white/30 text-xs normal-case font-normal">(Optional)</span></label>
                  <input value={form.timePeriod} onChange={e => update('timePeriod', e.target.value)}
                    placeholder="e.g. 1985, Summer of 1990" 
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-5 text-white placeholder:text-white/20 focus:outline-none focus:border-heritage-500/50 focus:bg-white/5 transition-all text-lg"
                  />
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-bold text-white/70 uppercase tracking-wider mb-2">Identifier (Title)</label>
                  <input value={form.title} onChange={e => update('title', e.target.value)}
                    placeholder="Give this log a clear designation..." 
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-5 text-white placeholder:text-white/20 focus:outline-none focus:border-heritage-500/50 focus:bg-white/5 transition-all text-xl font-medium"
                  />
                </div>

                <div className="flex gap-2 p-1.5 bg-black/40 border border-white/10 rounded-[1.25rem]">
                  {(['voice', 'text'] as const).map(mode => (
                    <button key={mode} onClick={() => update('inputMode', mode)}
                      className={cn("flex-1 flex items-center justify-center gap-2 py-3.5 rounded-[1rem] text-sm font-bold transition-all",
                        form.inputMode === mode ? 'bg-white/10 text-white shadow-md border border-white/10' : 'text-white/40 hover:text-white/80')}>
                      {mode === 'voice' ? <Mic className="w-5 h-5" /> : <Type className="w-5 h-5" />}
                      {mode === 'voice' ? 'Direct Neural Audio' : 'Manual Text Input'}
                    </button>
                  ))}
                </div>

                {form.inputMode === 'voice' ? (
                  <div className="py-8">
                    <VoiceRecorder onRecordingComplete={(blob, dur) => { update('audioBlob', blob); update('audioDuration', dur) }} />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-bold text-white/70 uppercase tracking-wider mb-2">Raw Data Input</label>
                    <textarea value={form.content} onChange={e => update('content', e.target.value)} rows={8}
                      placeholder="Input memory details here. The AI will analyze this for entities and emotions..."
                      className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-2xl text-white placeholder:text-white/20 text-lg resize-none focus:outline-none focus:border-heritage-500/50 focus:bg-white/5 transition-all leading-relaxed" />
                    <p className="text-xs text-white/40 mt-2 text-right font-mono">{form.content.length} bytes</p>
                  </div>
                )}

                {form.audioBlob && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-4 p-5 bg-green-500/10 border border-green-500/20 rounded-2xl">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-green-400">Audio Log Captured Successfully</p>
                      <p className="text-xs text-green-400/70 mt-0.5">Ready for AI transcription and emotion extraction.</p>
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-bold text-white/70 uppercase tracking-wider mb-4">Emotional Resonance <span className="text-white/30 text-xs normal-case font-normal">(Multiselect)</span></label>
                  <div className="flex flex-wrap gap-3">
                    {EMOTION_TAGS.map(tag => (
                      <button key={tag.value} onClick={() => toggleEmotion(tag.value)}
                        className={cn("flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all border",
                          form.emotionTags.includes(tag.value)
                            ? 'bg-heritage-500/20 border-heritage-500 text-heritage-300 shadow-[0_0_15px_rgba(255,127,26,0.2)]'
                            : 'bg-black/40 border-white/10 text-white/60 hover:bg-white/5 hover:text-white')}>
                        <span className="text-lg">{tag.emoji}</span> {tag.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <div>
                   <label className="block text-sm font-bold text-white/70 uppercase tracking-wider mb-2"><ScanFace className="w-4 h-4 inline mr-1 text-heritage-400" /> Linked Entities</label>
                   <input value={form.peopleMentioned} onChange={e => update('peopleMentioned', e.target.value)}
                     placeholder="e.g. Dadu, Ma, Uncle Ravi..." 
                     className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-5 text-white placeholder:text-white/20 focus:outline-none focus:border-heritage-500/50 focus:bg-white/5 transition-all"
                   />
                </div>

                <div className="flex items-center justify-between p-6 bg-black/40 border border-white/10 rounded-2xl">
                  <div>
                    <p className="font-bold text-white">Global Broadcasting</p>
                    <p className="text-sm text-white/50">Allow this memory to be indexed in the global cultural graph.</p>
                  </div>
                  <button onClick={() => update('isPublic', !form.isPublic)}
                    className={cn("w-14 h-7 rounded-full transition-all relative border", form.isPublic ? 'bg-green-500/20 border-green-500/50' : 'bg-white/10 border-white/20')}>
                    <div className={cn("absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full shadow-lg transition-all", form.isPublic ? 'bg-green-400 right-1' : 'bg-white/50 left-1')} />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="glass-dark border border-heritage-500/30 rounded-3xl p-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-heritage-500/5 animate-pulse mix-blend-screen" />
                  <div className="relative z-10 flex items-start gap-5">
                    <div className="text-5xl filter drop-shadow-lg">{MEMORY_TYPES.find(t => t.value === form.memoryType)?.emoji}</div>
                    <div>
                      <h3 className="text-2xl font-black text-white">{form.title || 'Untitled Log'}</h3>
                      {form.timePeriod && <p className="text-sm text-heritage-400 font-mono mt-2 flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5"/> Temporal: {form.timePeriod}</p>}
                      {form.emotionTags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {form.emotionTags.map(tag => {
                            const t = EMOTION_TAGS.find(et => et.value === tag)
                            return <span key={tag} className="text-xs font-bold uppercase tracking-wider bg-white/10 border border-white/20 text-white px-3 py-1.5 rounded-full backdrop-blur-md shadow-sm">{t?.emoji} {t?.label}</span>
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  {[
                    { label: 'Data Type', value: MEMORY_TYPES.find(t => t.value === form.memoryType)?.label },
                    { label: 'Translation Model', value: LANGUAGES.find(l => l.value === form.language)?.label },
                    { label: 'Audio Payload', value: form.audioBlob ? 'Attached 📦' : 'Empty' },
                    { label: 'Security Level', value: form.isPublic ? 'Public 🌍' : 'Encrypted 🔒' },
                  ].map(item => (
                    <div key={item.label} className="p-4 bg-black/40 border border-white/5 rounded-2xl">
                      <p className="text-white/40 text-xs font-bold uppercase tracking-wider mb-1">{item.label}</p>
                      <p className="font-bold text-white text-lg">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-4 p-5 bg-heritage-500/10 border border-heritage-500/30 rounded-2xl shadow-[0_0_20px_rgba(255,127,26,0.1)]">
                  <div className="w-12 h-12 rounded-full bg-heritage-500/20 flex items-center justify-center shrink-0">
                    <Cpu className="w-6 h-6 text-heritage-400 animate-pulse" />
                  </div>
                  <p className="text-sm text-heritage-100/90 leading-relaxed font-light">
                    Commencing final sequence. AI will process audio, extract semantic graph nodes, and write to the blockchain archive upon execution.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex gap-4 mt-12 relative z-10">
          {step > 0 && (
            <button onClick={() => setStep(s => s - 1)} className="flex-1 py-4 rounded-xl border border-white/20 text-white font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              <ChevronLeft className="w-5 h-5" /> Revert
            </button>
          )}
          {step < STEPS.length - 1 ? (
            <button onClick={() => setStep(s => s + 1)} disabled={!canProceed} 
              className="flex-[2] py-4 rounded-xl bg-white text-black font-black hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              Advance Sequence <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button onClick={handleSave} disabled={!canProceed || saving} 
              className="flex-[2] py-4 rounded-xl bg-heritage-500 hover:bg-heritage-400 text-white font-black transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-[0_0_30px_rgba(255,127,26,0.5)]">
              {saving ? <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</> : <><Sparkles className="w-5 h-5" /> Execute & Preserve</>}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
