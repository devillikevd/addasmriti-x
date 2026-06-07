import { Navigation } from '@/components/layout/Navigation'
import { ThreeBackground } from '@/components/ui/ThreeBackground'
import { HeritageCopilot } from '@/components/ui/HeritageCopilot'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden relative">
      <ThreeBackground />
      <div className="absolute inset-0 bg-aurora-gradient opacity-10 mix-blend-screen pointer-events-none z-0" />
      
      <Navigation />
      
      <main className="relative z-10 lg:pl-64 pt-14 lg:pt-0 pb-20 lg:pb-0 h-screen overflow-y-auto overflow-x-hidden scrollbar-hide">
        <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </main>

      <HeritageCopilot />
    </div>
  )
}
