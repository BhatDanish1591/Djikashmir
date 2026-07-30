import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Award,
  Headphones,
  PackageCheck,
  Quote,
  Truck,
  Wrench,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Hero } from '@/components/home/hero'
import { AnimatedServices } from '@/components/home/animated-services'
import { Stats } from '@/components/home/stats'
import { Newsletter } from '@/components/newsletter'
import { ProductCard } from '@/components/product-card'
import { AnimatedGrid } from '@/components/ui/animated-grid'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { StarRating } from '@/components/star-rating'
import { prisma } from '@/lib/prisma'
import {
  brands,
  homeFeatures,
  posts,
  testimonials,
} from '@/lib/data'

const featureIcons = [PackageCheck, Wrench, Truck, Award, Headphones]

export default async function HomePage() {
  const [dbDrones, dbPortfolio] = await Promise.all([
    prisma.drone.findMany({ take: 8 }),
    prisma.portfolio.findMany({ take: 4 }),
  ])

  return (
    <>
      <Hero />

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 pt-16 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {homeFeatures.map((f, i) => {
            const Icon = featureIcons[i]
            return (
              <Reveal
                key={f.title}
                delay={i * 80}
                className="rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
              >
                <span className="flex size-11 items-center justify-center rounded-2xl bg-cream text-primary">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* Services preview */}
      <section className="bg-background relative overflow-hidden pb-16 pt-16">
        {/* Decorative background gradient */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Capabilities"
              title="Professional aerial services"
              description="From weddings to industrial inspection, our certified pilots capture what matters most with cinema-grade precision."
            />
            <Button
              variant="outline"
              render={<Link href="/services" />}
              className="h-11 shrink-0 rounded-full border-border hover:bg-muted px-5 transition-all"
            >
              View all services
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Premium Animated Services (Animaster / Vengeance style) */}
      <AnimatedServices />

      {/* Featured products */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            title="Featured drones"
            description="Hand-picked flagships loved by our community of creators and professionals."
          />
          <Button
            variant="outline"
            render={<Link href="/drones" />}
            className="h-11 shrink-0 rounded-full border-border px-5"
          >
            Shop all drones
            <ArrowRight className="size-4" />
          </Button>
        </div>

        <AnimatedGrid className="mt-12 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {dbDrones.map((p) => (
            <ProductCard key={p.slug} product={p as any} />
          ))}
        </AnimatedGrid>
      </section>

      {/* Why choose us / stats */}
      <Stats />

      {/* Portfolio preview */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          center
          eyebrow="Our work"
          title="A glimpse from above"
          description="Explore a selection of our favorite aerial projects across industries."
        />
        <div className="mt-12 grid auto-rows-[250px] grid-cols-1 gap-4 md:grid-cols-4 md:auto-rows-[300px]">
          {dbPortfolio.map((item, i) => {
            // Asymmetric Bento Grid logic for 4 items
            const spanClass = 
              i === 0 ? 'md:col-span-2 md:row-span-2' :
              i === 1 ? 'md:col-span-2 md:row-span-1' :
              'md:col-span-1 md:row-span-1'

            return (
              <Reveal
                key={item.title}
                delay={i * 60}
                className={spanClass}
              >
                <Link
                  href="/portfolio"
                  className="group relative block h-full overflow-hidden rounded-3xl bg-muted"
                >
                <Image
                  src={item.image || '/placeholder.svg'}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute bottom-4 left-4 translate-y-2 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="text-xs font-medium text-background/80">{item.category}</span>
                  <p className="font-display text-base font-semibold text-background">
                    {item.title}
                  </p>
                </div>
              </Link>
            </Reveal>
            )
          })}
        </div>
        <div className="mt-10 text-center">
          <Button
            render={<Link href="/portfolio" />}
            className="h-12 rounded-full px-7"
          >
            Explore full portfolio
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-peach py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            center
            title="Loved by pilots & businesses"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal
                key={t.name}
                delay={i * 90}
                className="flex flex-col rounded-3xl border border-border bg-card p-7"
              >
                <Quote className="size-8 text-primary/30" />
                <p className="mt-4 flex-1 leading-relaxed text-foreground/90">“{t.quote}”</p>
                <StarRating rating={t.rating} className="mt-6" />
                <div className="mt-4 border-t border-border pt-4">
                  <p className="font-display font-semibold">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Latest blog */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            title="From the Skyloom blog"
            description="News, buying guides, and tips to help you fly further."
          />
          <Button
            variant="outline"
            render={<Link href="/blog" />}
            className="h-11 shrink-0 rounded-full border-border px-5"
          >
            Read the blog
            <ArrowRight className="size-4" />
          </Button>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 4) * 70}>
              <Link
                href="/blog"
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image || '/placeholder.svg'}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                    {post.category}
                  </span>
                  <h3 className="mt-2 font-display text-base font-semibold leading-snug transition-colors group-hover:text-primary">
                    {post.title}
                  </h3>
                  <p className="mt-2 flex-1 line-clamp-2 text-sm text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <span className="mt-4 text-xs text-muted-foreground">{post.date}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Brands */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Trusted brands we carry
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {brands.map((b) => (
              <span
                key={b}
                className="font-display text-xl font-bold text-muted-foreground/60 transition-colors hover:text-primary sm:text-2xl"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  )
}
