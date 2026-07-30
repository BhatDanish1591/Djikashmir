import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { DroneCatalog } from '@/components/drone-catalog'
import { Newsletter } from '@/components/newsletter'
import { PageHero } from '@/components/page-hero'
import { StarRating } from '@/components/star-rating'
import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/prisma'
import { categories, testimonials } from '@/lib/data'

export const metadata = {
  title: 'Drones — Skyloom Drones',
  description:
    'Browse our professional drone collection: consumer, professional, FPV, agriculture, and survey drones from top brands.',
}

const categoryImages: Record<string, string> = {
  Consumer: '/images/drone-mini.png',
  Professional: '/images/drone-pro.png',
  FPV: '/images/drone-fpv.png',
  Agriculture: '/images/drone-agri.png',
  Survey: '/images/drone-pro.png',
  Accessories: '/images/drone-fpv.png',
}

export default async function DronesPage() {
  const dbDrones = await prisma.drone.findMany()

  return (
    <>
      <PageHero
        breadcrumb="Drones"
        title="Professional Drone Collection"
        subtitle="Precision-engineered aircraft for every mission — from pocket-sized flyers to heavy-lift industrial platforms."
        backgroundImage="/images/hero-bg.jpg"
      />

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((c) => (
            <Link
              key={c}
              href="/drones"
              className="group flex flex-col items-center gap-3 rounded-3xl border border-border bg-card p-4 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <span className="relative block size-16 overflow-hidden rounded-2xl bg-peach">
                <Image
                  src={categoryImages[c] || '/placeholder.svg'}
                  alt={c}
                  fill
                  sizes="64px"
                  className="object-contain p-1.5 transition-transform group-hover:scale-110"
                />
              </span>
              <span className="text-sm font-semibold">{c}</span>
            </Link>
          ))}
        </div>
      </section>

      <DroneCatalog products={dbDrones as any} />

      {/* Featured collection banner */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-peach">
          <div className="pointer-events-none absolute -right-16 top-0 size-72 rounded-full bg-accent/25 blur-3xl" />
          <div className="relative grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                Featured Collection
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold text-balance sm:text-4xl">
                The Aero Pro Series
              </h2>
              <p className="mt-3 max-w-md text-muted-foreground">
                Our flagship line for professional creators — 8K cinema cameras, 46-minute flight
                times, and industry-leading safety systems.
              </p>
              <Button
                render={<Link href="/drones/skyloom-aero-pro" />}
                className="mt-6 h-12 rounded-full px-6"
              >
                Discover the series
                <ArrowRight className="size-4" />
              </Button>
            </div>
            <div className="relative aspect-[4/3]">
              <Image
                src="/images/drone-pro.png"
                alt="Aero Pro Series drone"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Customer reviews */}
      <section className="bg-peach py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-3xl font-bold">Customer reviews</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-3xl border border-border bg-card p-7">
                <StarRating rating={t.rating} />
                <p className="mt-4 leading-relaxed text-foreground/90">“{t.quote}”</p>
                <div className="mt-5 border-t border-border pt-4">
                  <p className="font-display font-semibold">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  )
}
