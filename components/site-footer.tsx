import Link from 'next/link'
import { Globe, MessageCircle, Plane, Rss, Send, Share2 } from 'lucide-react'

const columns = [
  {
    title: 'Products',
    links: [
      { label: 'Consumer Drones', href: '/drones' },
      { label: 'Professional', href: '/drones' },
      { label: 'FPV', href: '/drones' },
      { label: 'Agriculture', href: '/drones' },
      { label: 'Accessories', href: '/drones' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Aerial Shoots', href: '/services' },
      { label: 'Repair', href: '/repair' },
      { label: 'Survey & Mapping', href: '/services' },
      { label: 'Inspection', href: '/services' },
      { label: 'Portfolio', href: '/portfolio' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Contact', href: '/contact' },
      { label: 'Blog', href: '/blog' },
      { label: 'FAQ', href: '/services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Privacy Policy', href: '/about' },
      { label: 'Terms of Service', href: '/about' },
      { label: 'Warranty', href: '/about' },
      { label: 'Careers', href: '/about' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-peach">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex size-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <Plane className="size-5 -rotate-45" />
              </span>
              <span className="font-display text-lg font-bold leading-none tracking-tight">
                SKYLOOM
                <span className="block text-[11px] font-medium tracking-[0.35em] text-muted-foreground">
                  DRONES
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Premium drones, expert repairs, and professional aerial solutions. Elevating the way
              you see the world since 2021.
            </p>
            <div className="mt-6 flex gap-2">
              {[Globe, MessageCircle, Send, Share2, Rss].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground/70 transition-colors hover:border-primary hover:text-primary"
                  aria-label="Social link"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-display text-sm font-semibold">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Skyloom Drones. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Crafted for pilots who demand the extraordinary.
          </p>
        </div>
      </div>
    </footer>
  )
}
