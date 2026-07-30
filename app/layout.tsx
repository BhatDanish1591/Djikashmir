import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Outfit } from 'next/font/google'
import { Suspense } from 'react'
import { Navbar } from '@/components/navbar'
import { ConditionalFooter } from '@/components/conditional-footer'
import { SmoothScroll } from '@/components/smooth-scroll'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })

export const metadata: Metadata = {
  title: 'Skyloom Drones — Premium Drones, Repairs & Aerial Solutions',
  description:
    'Skyloom Drones offers premium drones, expert repairs, and professional aerial services. Shop consumer, professional, FPV, and agriculture drones with warranty support.',
  generator: 'v0.app',
  keywords: [
    'drones',
    'drone shop',
    'drone repair',
    'aerial photography',
    'FPV drones',
    'agriculture drones',
  ],
}

export const viewport: Viewport = {
  themeColor: '#FF6B00',
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} bg-background`}>
      <body className="font-sans antialiased">
        <SmoothScroll>
          <Suspense>
            <Navbar />
          </Suspense>
          <main>{children}</main>
          <ConditionalFooter />
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </SmoothScroll>
      </body>
    </html>
  )
}
