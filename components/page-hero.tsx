import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export function PageHero({
  eyebrow,
  title,
  description,
  subtitle,
  breadcrumb,
  backgroundImage,
}: {
  eyebrow?: string
  title: string
  description?: string
  subtitle?: string
  breadcrumb?: string
  backgroundImage?: string
}) {
  const sub = description ?? subtitle ?? ''
  return (
    <section className={cn("relative overflow-hidden", backgroundImage ? "bg-black" : "bg-peach")}>
      {backgroundImage && (
        <>
          <div className="absolute inset-0 z-0">
            <Image
              src={backgroundImage}
              alt="Background"
              fill
              className="object-cover opacity-60 mix-blend-overlay"
              priority
            />
          </div>
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </>
      )}
      {!backgroundImage && (
        <>
          <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-accent/20 blur-3xl z-0" />
          <div className="pointer-events-none absolute -bottom-32 left-10 size-72 rounded-full bg-primary/10 blur-3xl z-0" />
        </>
      )}
      <div className={cn("relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8", backgroundImage ? "text-white" : "")}>

        {eyebrow && (
          <span className={cn("mt-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider", backgroundImage ? "bg-white/20 text-white backdrop-blur-md border border-white/10" : "bg-cream text-primary")}>
            <span className={cn("size-1.5 rounded-full", backgroundImage ? "bg-primary" : "bg-primary")} />
            {eyebrow}
          </span>
        )}
        <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {sub && (
          <p className={cn("mt-4 max-w-xl text-lg leading-relaxed text-pretty", backgroundImage ? "text-white/90" : "text-muted-foreground")}>
            {sub}
          </p>
        )}
      </div>
    </section>
  )
}
