'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home, Mic, Bot, Users, Compass, Plus, Bell,
  Settings, Menu, X, Network, Search
} from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const NAV_ITEMS = [
  { href: '/dashboard', icon: Home, label: 'Legacy Vault' },
  { href: '/dashboard/dna', icon: Network, label: 'Memory DNA' },
  { href: '/dashboard/digital-twin', icon: Bot, label: 'Digital Twin' },
  { href: '/dashboard/ai-search', icon: Search, label: 'Heritage AI' },
  { href: '/dashboard/communities', icon: Users, label: 'Communities' },
  { href: '/dashboard/explore', icon: Compass, label: 'Explore 1950' },
]

export function Navigation() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Desktop Sidebar (Glassmorphism) */}
      <nav className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 glass-dark border-r border-white/5 flex-col z-40 shadow-2xl">
        {/* Logo */}
        <div className="h-20 flex items-center px-6 border-b border-white/5">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-heritage-500 to-bengal-500 flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(255,127,26,0.3)]">আ</div>
            <span className="font-display text-xl font-bold text-white tracking-wide">AddaSmriti <span className="text-heritage-400">X</span></span>
          </Link>
        </div>

        {/* Nav links */}
        <div className="flex-1 py-8 px-4 space-y-2 overflow-y-auto scrollbar-hide">
          <div className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-4 px-2">Core Systems</div>
          {NAV_ITEMS.map(item => {
            const active = pathname === item.href || pathname.startsWith(item.href + '/') && item.href !== '/dashboard'
            return (
              <Link key={item.href} href={item.href}>
                <motion.div whileHover={{ x: 4 }} className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer relative overflow-hidden",
                  active ? "text-white bg-white/10 border border-white/10" : "text-white/50 hover:bg-white/5 hover:text-white/90"
                )}>
                  {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-heritage-500 shadow-[0_0_10px_rgba(255,127,26,0.8)]" />}
                  <item.icon className={cn("w-5 h-5", active ? "text-heritage-400" : "text-white/40")} />
                  {item.label}
                </motion.div>
              </Link>
            )
          })}
        </div>

        {/* New Memory Button */}
        <div className="px-4 pb-4">
          <Link href="/dashboard/memories/new">
            <button className="w-full bg-heritage-500 hover:bg-heritage-400 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(255,127,26,0.2)] hover:shadow-[0_0_30px_rgba(255,127,26,0.4)]">
              <Plus className="w-5 h-5" />
              Initialize Memory
            </button>
          </Link>
        </div>

        {/* User profile */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors border border-transparent hover:border-white/10">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-bengal-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">U</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">Demo User</p>
              <p className="text-xs text-white/40">Heritage Preserver</p>
            </div>
            <Settings className="w-4 h-4 text-white/40 hover:text-white" />
          </div>
        </div>
      </nav>

      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 glass-dark border-b border-white/10 flex items-center justify-between px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-heritage-500 to-bengal-500 flex items-center justify-center text-white text-sm font-bold">আ</div>
        </Link>
        <div className="flex items-center gap-3">
          <button className="relative p-2 text-white/70 hover:text-white">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-heritage-500 rounded-full animate-pulse" />
          </button>
          <button onClick={() => setMobileOpen(true)} className="p-2 text-white">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass-dark border-t border-white/10">
        <div className="flex items-center justify-around px-2 py-2">
          {NAV_ITEMS.slice(0, 4).map(item => {
            const active = pathname === item.href || pathname.startsWith(item.href + '/') && item.href !== '/dashboard'
            return (
              <Link key={item.href} href={item.href} className={cn(
                "flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all",
                active ? "text-heritage-400" : "text-white/40"
              )}>
                <item.icon className={cn("w-6 h-6", active && "text-heritage-500")} />
              </Link>
            )
          })}
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden" onClick={() => setMobileOpen(false)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-72 glass-dark z-50 lg:hidden shadow-2xl border-l border-white/10">
              <div className="h-16 flex items-center justify-between px-5 border-b border-white/10">
                <span className="font-bold text-white">Navigation</span>
                <button onClick={() => setMobileOpen(false)} className="text-white/50 hover:text-white"><X className="w-6 h-6" /></button>
              </div>
              <div className="p-4 space-y-2">
                {NAV_ITEMS.map(item => (
                  <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
                    <div className={cn("flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium",
                      pathname === item.href ? "bg-white/10 text-white border border-white/10" : "text-white/50 hover:bg-white/5 hover:text-white")}>
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
