'use client'

import * as React from 'react'
import { Command } from 'cmdk'
import { Search, Map, Mic, Video, Users, FileText, Brain, Music, History } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function CommandMenu() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <>
      <div 
        className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full cursor-pointer text-white/50 text-sm font-medium transition-colors backdrop-blur-md"
        onClick={() => setOpen(true)}
      >
        <Search className="w-4 h-4" />
        <span>Search heritage...</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-white/50 opacity-100 ml-4">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>

      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Global Command Menu"
        className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] sm:pt-[20vh] bg-black/60 backdrop-blur-sm"
      >
        <Command 
          className="w-full max-w-2xl bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col text-white"
          loop
        >
          <div className="flex items-center border-b border-white/10 px-4">
            <Search className="w-5 h-5 text-white/50 mr-2 shrink-0" />
            <Command.Input 
              placeholder="Search features, memories, or ask AI..." 
              className="flex h-14 w-full bg-transparent outline-none placeholder:text-white/30 text-white"
            />
          </div>

          <Command.List className="max-h-[300px] overflow-y-auto p-2 scrollbar-hide">
            <Command.Empty className="py-6 text-center text-sm text-white/50">No results found.</Command.Empty>

            <Command.Group heading="Heritage AI Features" className="px-2 py-1.5 text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
              <Command.Item className="flex items-center gap-2 px-3 py-3 text-sm rounded-lg cursor-pointer hover:bg-white/10 aria-selected:bg-white/10 text-white/90" onSelect={() => setOpen(false)}>
                <Brain className="w-4 h-4 text-heritage-400" /> Speak with Digital Twin
              </Command.Item>
              <Command.Item className="flex items-center gap-2 px-3 py-3 text-sm rounded-lg cursor-pointer hover:bg-white/10 aria-selected:bg-white/10 text-white/90" onSelect={() => setOpen(false)}>
                <Mic className="w-4 h-4 text-heritage-400" /> Clone Your Voice (ElevenLabs)
              </Command.Item>
              <Command.Item className="flex items-center gap-2 px-3 py-3 text-sm rounded-lg cursor-pointer hover:bg-white/10 aria-selected:bg-white/10 text-white/90" onSelect={() => setOpen(false)}>
                <History className="w-4 h-4 text-heritage-400" /> Explore Memory DNA Graph
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Spatial Computing" className="px-2 py-1.5 text-xs font-semibold text-white/40 uppercase tracking-wider mt-4 mb-2 border-t border-white/5">
              <Command.Item className="flex items-center gap-2 px-3 py-3 text-sm rounded-lg cursor-pointer hover:bg-white/10 aria-selected:bg-white/10 text-white/90" onSelect={() => setOpen(false)}>
                <Map className="w-4 h-4 text-bengal-400" /> VR Kolkata 1950 Walkthrough
              </Command.Item>
              <Command.Item className="flex items-center gap-2 px-3 py-3 text-sm rounded-lg cursor-pointer hover:bg-white/10 aria-selected:bg-white/10 text-white/90" onSelect={() => setOpen(false)}>
                <Video className="w-4 h-4 text-bengal-400" /> AR Historical Overlay Camera
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Generative Content" className="px-2 py-1.5 text-xs font-semibold text-white/40 uppercase tracking-wider mt-4 mb-2 border-t border-white/5">
              <Command.Item className="flex items-center gap-2 px-3 py-3 text-sm rounded-lg cursor-pointer hover:bg-white/10 aria-selected:bg-white/10 text-white/90" onSelect={() => setOpen(false)}>
                <Music className="w-4 h-4 text-saffron-400" /> Generate Podcast from Memories
              </Command.Item>
              <Command.Item className="flex items-center gap-2 px-3 py-3 text-sm rounded-lg cursor-pointer hover:bg-white/10 aria-selected:bg-white/10 text-white/90" onSelect={() => setOpen(false)}>
                <FileText className="w-4 h-4 text-saffron-400" /> Write Family Documentary Script
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </Command.Dialog>
    </>
  )
}
