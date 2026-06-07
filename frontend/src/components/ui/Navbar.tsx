'use client'

import Link from 'next/link'
import { CommandMenu } from '@/components/ui/CommandMenu'

export function Navbar() {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 glass-panel rounded-full px-2 py-2 flex items-center gap-2 border border-white/10 shadow-2xl backdrop-blur-xl bg-black/40">
      <div className="flex items-center gap-2 pl-4 pr-6 border-r border-white/10">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-heritage-500 to-bengal-500 flex items-center justify-center text-white text-sm font-bold shadow-[0_0_15px_rgba(255,127,26,0.5)]">আ</div>
          <span className="font-display font-bold text-white tracking-wide">AddaSmriti <span className="text-heritage-400">X</span></span>
        </Link>
      </div>
      <div className="hidden md:flex items-center px-4 gap-6">
        <Link href="/features" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Features</Link>
        <Link href="/about" className="text-sm font-medium text-white/70 hover:text-white transition-colors">About</Link>
        <Link href="/pricing" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Pricing</Link>
        <div className="w-px h-4 bg-white/10"></div>
        <CommandMenu />
      </div>
      <div className="flex items-center gap-2 pl-4 border-l border-white/10">
        <Link href="/auth/login" className="text-sm font-medium text-white/70 hover:text-white transition-colors px-4 py-2">
          Sign In
        </Link>
        <Link href="/auth/register" className="text-sm font-semibold bg-white text-black hover:bg-neutral-200 px-6 py-2 rounded-full transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]">
          Start Free
        </Link>
      </div>
    </nav>
  )
}
