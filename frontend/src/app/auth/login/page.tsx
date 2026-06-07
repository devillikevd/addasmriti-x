'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, Fingerprint, Sparkles, Loader2, Mail, Lock } from 'lucide-react'
import { motion } from 'framer-motion'
import { ThreeBackground } from '@/components/ui/ThreeBackground'

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate authentication
    setTimeout(() => {
      router.push('/dashboard')
    }, 1500)
  }

  return (
    <div className="min-h-screen flex text-white relative overflow-hidden bg-[#020617]">
      {/* Backgrounds */}
      <ThreeBackground />
      <div className="absolute inset-0 bg-aurora-gradient opacity-20 mix-blend-screen pointer-events-none" />
      
      {/* Left panel - Branding (Hidden on mobile) */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative z-10">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-heritage-500 to-bengal-500 flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(255,127,26,0.3)]">আ</div>
          <span className="font-display text-2xl font-bold tracking-wide">AddaSmriti <span className="text-heritage-400">X</span></span>
        </Link>
        
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/50 mb-6 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-heritage-500" /> Neural Link Active
          </div>
          <h1 className="font-display text-6xl font-black mb-6 leading-tight">
            Welcome back to the <span className="gradient-text">Legacy Vault</span>.
          </h1>
          <p className="text-xl text-white/50 font-light">
            Your Digital Twin has processed 4 new memories while you were away. Re-authenticate to access the heritage grid.
          </p>
        </div>
        
        <div className="text-sm text-white/30">
          © 2026 AddaSmriti Foundation. End-to-end encrypted.
        </div>
      </div>

      {/* Right panel - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative z-10">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
          className="w-full max-w-md glass-panel p-8 sm:p-10 rounded-[2rem] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
        >
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-heritage-500 to-bengal-500 flex items-center justify-center font-bold">আ</div>
            <span className="font-display text-2xl font-bold tracking-wide">AddaSmriti <span className="text-heritage-400">X</span></span>
          </div>

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10 shadow-inner">
              <Fingerprint className="w-8 h-8 text-heritage-400" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Authenticate</h2>
            <p className="text-white/50 text-sm">Enter your credentials to access the grid.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider pl-1">Neural ID / Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input 
                  type="email" 
                  required
                  defaultValue="demo@addasmriti.com"
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-heritage-500/50 focus:ring-1 focus:ring-heritage-500/50 transition-all"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center pl-1">
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Passphrase</label>
                <Link href="#" className="text-xs text-heritage-400 hover:text-heritage-300">Forgot?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input 
                  type="password" 
                  required
                  defaultValue="password123"
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-heritage-500/50 focus:ring-1 focus:ring-heritage-500/50 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-heritage-500 hover:bg-heritage-400 text-white font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2 group mt-8 shadow-[0_0_20px_rgba(255,127,26,0.2)] hover:shadow-[0_0_30px_rgba(255,127,26,0.4)] disabled:opacity-70"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  Initialize Session
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-white/40 mt-8">
            Don't have a Legacy Vault yet?{' '}
            <Link href="/auth/register" className="text-white hover:text-heritage-400 font-medium transition-colors">
              Create one
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
