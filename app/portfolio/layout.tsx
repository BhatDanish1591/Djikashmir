import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio — Skyloom Drones',
  description:
    "Explore Skyloom's aerial photography and videography portfolio across weddings, real estate, industrial inspections, agriculture, and more.",
}

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
