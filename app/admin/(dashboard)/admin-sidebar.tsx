'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Plane, Layers, Image as ImageIcon, LayoutDashboard, LogOut, Video, MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'

export function AdminSidebar({ logoutAction }: { logoutAction: () => void }) {
  const pathname = usePathname()

  const links = [
    { href: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
    { href: '/admin/bookings', icon: MessageSquare, label: 'Bookings' },
    { href: '/admin/drones', icon: Plane, label: 'Drones' },
    { href: '/admin/services', icon: Layers, label: 'Services' },
    { href: '/admin/portfolio', icon: ImageIcon, label: 'Portfolio' },
    { href: '/admin/hero', icon: Video, label: 'Hero Section' },
  ]

  return (
    <aside className="w-72 border-r border-white/10 bg-background/50 backdrop-blur-xl p-6 flex flex-col sticky top-0 h-screen">
      <div className="mb-12 flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/60 text-primary-foreground shadow-lg shadow-primary/20">
          S
        </div>
        <span className="font-display text-xl font-bold tracking-tight">Admin CMS</span>
      </div>

      <nav className="flex flex-col gap-2 flex-1">
        {links.map((link) => {
          const isActive = link.exact ? pathname === link.href : pathname.startsWith(link.href)
          const Icon = link.icon
          
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300",
                isActive 
                  ? "bg-primary/10 text-primary shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] ring-1 ring-primary/20" 
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              )}
            >
              <Icon className={cn("h-4 w-4 transition-transform duration-300", isActive ? "scale-110" : "group-hover:scale-110")} />
              {link.label}
            </Link>
          )
        })}
      </nav>

      <form action={logoutAction} className="mt-auto">
        <button
          type="submit"
          className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-all duration-300 hover:bg-red-500/10 hover:text-red-500"
        >
          <LogOut className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Logout
        </button>
      </form>
    </aside>
  )
}
