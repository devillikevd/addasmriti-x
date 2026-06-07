'use client'

import { motion } from 'framer-motion'
import { Navbar } from '@/components/ui/Navbar'
import { ThreeBackground } from '@/components/ui/ThreeBackground'
import { Check, Zap } from 'lucide-react'
import Link from 'next/link'

const TIERS = [
  {
    name: 'Explorer',
    price: 'Free',
    description: 'Perfect for starting your digital legacy journey.',
    features: ['Basic memory timeline', '1 AI Voice Model (Standard)', '10GB Secure Vault Storage', 'Community Adda Access'],
    buttonText: 'Start for Free',
    buttonLink: '/auth/register',
    popular: false
  },
  {
    name: 'Legacy Premium',
    price: '₹999/mo',
    description: 'Advanced preservation tools for complete family history.',
    features: ['Unlimited interactive timelines', '3 Ultra-HD Voice Models', '100GB Spatial Storage', 'Heritage GPT Access', 'Priority Render Queue', 'Private Adda Rooms'],
    buttonText: 'Upgrade to Premium',
    buttonLink: '/auth/register?plan=premium',
    popular: true
  },
  {
    name: 'Dynasty Enterprise',
    price: 'Custom',
    description: 'Bespoke solutions for institutions and large estates.',
    features: ['Dedicated AI Training Pipeline', 'Custom VR Environment Design', 'Unlimited Storage', 'White-glove Onboarding', 'Legal & Archival Compliance', '24/7 Priority Support'],
    buttonText: 'Contact Sales',
    buttonLink: '/contact',
    popular: false
  }
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 selection:bg-heritage-500/30 overflow-x-hidden pt-32 flex flex-col">
      <ThreeBackground />
      <Navbar />
      
      <div className="container mx-auto px-4 relative z-10 flex-grow pb-32">
        <div className="text-center mb-20">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight"
          >
            Invest in <span className="gradient-text">Eternity.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-xl text-white/50 max-w-2xl mx-auto font-light"
          >
            Choose the plan that best fits your family's preservation needs. Secure your memories with military-grade encryption and perpetual hosting.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {TIERS.map((tier, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 + 0.2 }}
              className={`relative rounded-3xl p-8 backdrop-blur-xl border ${tier.popular ? 'bg-heritage-500/10 border-heritage-500/50 shadow-[0_0_30px_rgba(255,127,26,0.1)]' : 'bg-white/5 border-white/10 hover:border-white/20'} flex flex-col`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-heritage-500 to-bengal-500 text-white text-sm font-bold px-4 py-1 rounded-full flex items-center gap-1 shadow-lg">
                  <Zap className="w-4 h-4" /> Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-black text-white">{tier.price}</span>
              </div>
              <p className="text-white/60 mb-8">{tier.description}</p>
              
              <ul className="space-y-4 mb-8 flex-grow">
                {tier.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-heritage-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-heritage-400" />
                    </div>
                    <span className="text-white/80 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link href={tier.buttonLink}
                className={`w-full py-4 rounded-xl font-bold text-center transition-all ${tier.popular ? 'bg-heritage-500 hover:bg-heritage-600 text-white shadow-lg' : 'bg-white/10 hover:bg-white/20 text-white'}`}
              >
                {tier.buttonText}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Footer Placeholder for visual completion */}
      <footer className="border-t border-white/10 bg-black/50 backdrop-blur-xl py-12 relative z-10 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-heritage-500 to-bengal-500 flex items-center justify-center text-white text-sm font-bold">আ</div>
            <span className="font-display text-2xl font-bold text-white">AddaSmriti X</span>
          </div>
          <p className="text-white/40 mb-8">The World's Most Advanced Cultural Preservation Ecosystem.</p>
          <div className="text-white/20 text-sm">© 2026 AddaSmriti Foundation. All systems nominal.</div>
        </div>
      </footer>
    </div>
  )
}
