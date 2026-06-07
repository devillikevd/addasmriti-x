import type { Metadata } from 'next'
import { Inter, Playfair_Display, Hind_Siliguri } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-hind-siliguri',
})

export const metadata: Metadata = {
  title: 'AddaSmriti X | AI Heritage Preservation Platform',
  description: 'Preserve your cultural heritage forever using AI Digital Twins, Memory DNA, and Cultural Intelligence.',
  keywords: ['heritage', 'memory', 'AI', 'digital twin', 'Bengali', 'culture', 'preservation'],
  openGraph: {
    title: 'AddaSmriti X',
    description: 'Preserve your cultural heritage forever',
    url: 'https://addasmriti.com',
    siteName: 'AddaSmriti X',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AddaSmriti X',
    description: 'Preserve your cultural heritage forever',
    creator: '@AddaSmriti',
  },
  robots: { index: true, follow: true },
  themeColor: '#FF7F1A',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} ${hindSiliguri.variable} font-sans antialiased`}>
        <Providers>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: { background: '#fff', color: '#111', borderRadius: '12px', border: '1px solid #f0f0f0', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
