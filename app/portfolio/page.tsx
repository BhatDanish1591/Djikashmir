'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Play } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { Newsletter } from '@/components/newsletter'
import { Button } from '@/components/ui/button'
import { portfolio } from '@/lib/data'

const categories = ['All', 'Wedding', 'Real Estate', 'Agriculture', 'Survey', 'Industrial', 'Films', 'Corporate']

const stats = [
  { value: '3,000+', label: 'Projects delivered' },
  { value: '25+', label: 'Certified pilots' },
  { value: '18', label: 'Countries flown' },
  { value: '5★', label: 'Average client rating' },
]

// Extended portfolio with more variety
const allWork = [
  ...portfolio,
  { title: 'Stadium Event Flyover', category: 'Films', image: '/images/aerial-1.png' },
  { title: 'Golf Course Survey', category: 'Survey', image: '/images/aerial-3.png' },
  { title: 'Wind Farm Inspection', category: 'Industrial', image: '/images/aerial-2.png' },
  { title: 'Beachfront Property', category: 'Real Estate', image: '/images/aerial-1.png' },
]

const spanClass = (i: number) => {
  // Create a masonry-like effect with some wide and tall items
  const pattern = [2, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1]
  return pattern[i % pattern.length] === 2 ? 'col-span-2' : 'col-span-1'
}

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  // Filter items dynamically
  const filteredWork = activeCategory === 'All'
    ? allWork
    : allWork.filter(item => item.category.toLowerCase() === activeCategory.toLowerCase())

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        breadcrumb="Portfolio"
        title="Our Aerial Work"
        description="A curated selection of our best cinematic and industrial aerial projects."
        backgroundImage="/images/hero_portfolio.jpg"
      />

      {/* Stats bar */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-border lg:grid-cols-4 lg:divide-y-0">
          {stats.map((s) => (
            <div key={s.label} className="px-8 py-7 text-center">
              <p className="font-display text-3xl font-bold text-primary">{s.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Filter + grid */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`cursor-pointer rounded-full border px-4 py-1.5 text-sm font-medium transition-colors outline-none ${
                  activeCategory === cat
                    ? 'border-primary bg-primary text-primary-foreground font-semibold shadow-sm'
                    : 'border-border bg-card text-foreground/80 hover:border-primary hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry grid */}
          <div className="mt-10 grid auto-rows-[240px] grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {filteredWork.map((item, i) => (
              <Reveal
                key={`${item.title}-${i}`}
                delay={i * 30}
                className={spanClass(i)}
              >
                <div className="group relative h-full overflow-hidden rounded-3xl border border-border bg-muted">
                  <Image
                    src={item.image || '/placeholder.svg'}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 right-0 translate-y-4 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="rounded-full bg-primary/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                      {item.category}
                    </span>
                    <p className="mt-2.5 font-display text-base font-semibold text-white">{item.title}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured video reel CTA */}
      <section className="bg-peach py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <div>
                <SectionHeading
                  eyebrow="Showreel"
                  title="Watch our aerial stories come to life"
                  description="From golden-hour coastlines to sprawling industrial sites — experience the full breadth of what Skyloom captures."
                />
                <Button
                  render={<Link href="/contact" />}
                  nativeButton={false}
                  className="mt-8 h-12 rounded-full px-7 shadow-lg shadow-primary/25"
                >
                  Commission a project
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="group relative aspect-video overflow-hidden rounded-3xl border border-border shadow-xl">
                <Image
                  src="/images/aerial-2.png"
                  alt="Aerial showreel preview"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-foreground/30">
                  <div className="flex size-20 items-center justify-center rounded-full bg-white/90 shadow-2xl transition-transform duration-300 group-hover:scale-110">
                    <Play className="size-8 translate-x-0.5 text-primary" />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Testimonial spotlight */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <blockquote>
              <p className="font-display text-2xl font-medium leading-relaxed text-foreground sm:text-3xl">
                "Skyloom's aerial footage turned our resort launch into a global sensation. Every frame was breathtaking."
              </p>
              <footer className="mt-8">
                <div className="mx-auto size-14 overflow-hidden rounded-full bg-cream">
                  <div className="flex size-full items-center justify-center font-display text-xl font-bold text-primary">
                    JR
                  </div>
                </div>
                <p className="mt-3 font-semibold text-foreground">James Rivera</p>
                <p className="text-sm text-muted-foreground">Marketing Director, Azure Resorts</p>
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      <Newsletter />
    </>
  )
}
