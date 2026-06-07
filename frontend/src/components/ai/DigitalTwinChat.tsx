'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Mic, Volume2, Bot, User, Loader2, StopCircle, Activity } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import type { ChatMessage, DigitalTwin } from '@/types/ai'

interface DigitalTwinChatProps {
  twin: DigitalTwin
  className?: string
}

const GREETING_MESSAGES: ChatMessage[] = [
  {
    id: 'greeting',
    role: 'assistant',
    content: 'নমস্কার! আমি তোমার সাথে কথা বলতে পেরে খুশি। আমার স্মৃতি ও অভিজ্ঞতা থেকে তোমাকে যা বলার আছে তা শেয়ার করতে পারি। কী জানতে চাও? (Hello! I\'m happy to talk with you. I can share memories and experiences. What would you like to know?)',
    timestamp: new Date().toISOString(),
  }
]

export function DigitalTwinChat({ twin, className }: DigitalTwinChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(GREETING_MESSAGES)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (content?: string) => {
    const text = content || input.trim()
    if (!text || loading) return

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: text, timestamp: new Date().toISOString() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    // Simulate AI delay for visual effect
    setTimeout(() => {
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(), role: 'assistant',
        content: "Based on memory log #24, I remember those days vividly. The tram ride to college was always crowded, but we'd manage to find a spot near the window.", 
        timestamp: new Date().toISOString(),
      }
      setMessages(prev => [...prev, assistantMsg])
      setLoading(false)
      inputRef.current?.focus()
    }, 2500)
  }

  const QUICK_PROMPTS = [
    'Tell me about your childhood memories',
    'আপনার প্রিয় উৎসবের কথা বলুন',
    'What was Kolkata like back then?',
    'Share a family story',
  ]

  return (
    <div className={cn("flex flex-col h-full glass-panel border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl relative", className)}>
      <div className="absolute inset-0 bg-heritage-500/5 mix-blend-screen pointer-events-none" />
      
      {/* Header */}
      <div className="flex items-center gap-4 p-6 border-b border-white/10 bg-black/40 backdrop-blur-md relative z-10">
        <div className="relative">
          <div className="w-14 h-14 rounded-2xl glass-dark flex items-center justify-center text-white text-2xl font-bold shadow-[0_0_15px_rgba(255,127,26,0.2)] border border-white/20">
            {twin.twinName.charAt(0)}
          </div>
          <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-black rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
        </div>
        <div>
          <h3 className="font-bold text-white text-lg tracking-wide">{twin.twinName}</h3>
          <p className="text-xs text-white/50 flex items-center gap-1.5 uppercase tracking-wider font-semibold">
            <Activity className="w-3 h-3 text-green-400" /> Neural Link Active
          </p>
        </div>
        <button className="ml-auto p-3 hover:bg-white/10 rounded-xl transition-colors border border-transparent hover:border-white/10">
          <Volume2 className="w-5 h-5 text-heritage-400" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide relative z-10">
        <AnimatePresence initial={false}>
          {messages.map(msg => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={cn("flex gap-4 max-w-[85%]", msg.role === 'user' ? 'ml-auto flex-row-reverse' : '')}
            >
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-lg border border-white/10",
                msg.role === 'assistant' ? 'bg-gradient-to-br from-heritage-500 to-bengal-600' : 'glass-dark')}>
                {msg.role === 'assistant' ? twin.twinName.charAt(0) : <User className="w-5 h-5" />}
              </div>
              <div className={cn("rounded-2xl px-5 py-4 text-[15px] leading-relaxed shadow-lg backdrop-blur-md",
                msg.role === 'assistant'
                  ? 'bg-white/10 text-white rounded-tl-none border border-white/10'
                  : 'bg-heritage-500 text-white rounded-tr-none shadow-[0_0_15px_rgba(255,127,26,0.3)]'
              )}>
                {msg.content}
                {msg.role === 'assistant' && (
                  <button className="mt-3 flex items-center gap-1.5 text-xs text-heritage-400 font-semibold uppercase tracking-wide hover:text-heritage-300 transition-colors">
                    <Volume2 className="w-4 h-4" /> Play Audio Log
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-heritage-500 to-bengal-600 flex items-center justify-center text-white text-sm font-bold shadow-lg border border-white/10">
              {twin.twinName.charAt(0)}
            </div>
            <div className="bg-white/5 rounded-2xl rounded-tl-none px-5 py-4 border border-white/10 backdrop-blur-md">
              <div className="flex gap-2 items-center h-6">
                <span className="text-sm font-medium text-white/50 uppercase tracking-wider mr-2">Synthesizing</span>
                {[0, 1, 2].map(i => (
                  <motion.div key={i} className="w-2 h-2 bg-heritage-400 rounded-full"
                    animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick prompts */}
      {messages.length === 1 && (
        <div className="px-6 pb-4 flex flex-wrap gap-2 relative z-10">
          {QUICK_PROMPTS.map(p => (
            <button key={p} onClick={() => sendMessage(p)}
              className="text-xs bg-black/40 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 px-4 py-2 rounded-full transition-all backdrop-blur-md">
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-white/10 bg-black/40 backdrop-blur-xl relative z-10">
        <form onSubmit={e => { e.preventDefault(); sendMessage() }} className="relative flex items-center">
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Transmit message to Digital Twin..."
            className="w-full h-14 pl-5 pr-32 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/30 focus:outline-none focus:border-heritage-500/50 focus:bg-white/10 transition-all"
          />
          <div className="absolute right-2 flex gap-2">
            <button type="button" onClick={() => setIsRecording(!isRecording)} 
              className={cn("h-10 w-10 rounded-xl flex items-center justify-center transition-all", isRecording ? "bg-red-500/20 text-red-400 border border-red-500/30" : "hover:bg-white/10 text-white/50 hover:text-white")}
            >
              {isRecording ? <StopCircle className="h-5 w-5 animate-pulse" /> : <Mic className="h-5 w-5" />}
            </button>
            <button type="submit" disabled={!input.trim() || loading} 
              className="h-10 w-10 rounded-xl bg-heritage-500 text-white flex items-center justify-center disabled:opacity-50 disabled:bg-white/10 transition-all hover:bg-heritage-400"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-4 w-4 ml-0.5" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
