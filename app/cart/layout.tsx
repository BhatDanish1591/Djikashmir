import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shopping Cart — Skyloom Drones',
  description: 'Review your cart and checkout securely at Skyloom Drones.',
}

export default function CartLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
