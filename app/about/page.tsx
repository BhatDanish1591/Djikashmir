import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import {
  ArrowRight,
  Users,
  Target,
  Lightbulb,
  Globe,
  Award,
  Heart,
  Quote,
} from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { Newsletter } from '@/components/newsletter'
import { Button } from '@/components/ui/button'
import { stats, team, testimonials } from '@/lib/data'
import { StarRating } from '@/components/star-rating'

export const metadata: Metadata = {
  title: 'About Us — Skyloom Drones',
  description:
    'Learn about the Skyloom Drones story — our mission, team, values, and the passion for aerial technology that drives us every day.',
}

const values = [
  {
    icon: Target,
    title: 'Precision First',
    desc: 'Every flight, every repair, every delivery — we sweat the details so you never have to.',
  },
  {
    icon: Heart,
    title: 'Customer Obsessed',
    desc: "We measure success by how delighted our customers feel long after they've flown.",
  },
  {
    icon: Lightbulb,
    title: 'Always Innovating',
    desc: 'From FPV to agricultural mapping, we chase the cutting edge so you stay ahead.',
  },
  {
    icon: Globe,
    title: 'Responsible Skies',
    desc: 'We champion safe, legal, and environmentally responsible drone operations everywhere.',
  },
]

const milestones = [
  { year: '2019', title: 'Founded in Austin, TX', desc: 'Started as a two-person repair shop in a garage.' },
  { year: '2020', title: 'Aerial Services Launch', desc: 'Expanded into commercial photography and surveying.' },
  { year: '2022', title: '1,000 Clients Milestone', desc: 'Reached our first thousand happy customers.' },
  { year: '2024', title: 'Nationwide Shipping', desc: 'Launched same-day repair drop-off at 30+ locations.' },
  { year: '2025', title: 'Drone Shop Opens', desc: 'Our full e-commerce store went live with 50+ SKUs.' },
  { year: '2026', title: 'Going Global', desc: 'Now serving clients across 18 countries and counting.' },
]

const extendedTeam = [
  ...team,
  { name: 'Yuki Tanaka', role: 'FPV Racing Specialist' },
  { name: 'Amara Diallo', role: 'Customer Experience Lead' },
  { name: 'Lena Brandt', role: 'Agricultural Drone Analyst' },
  { name: 'Carlos Vega', role: 'Fleet & Logistics Manager' },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        breadcrumb="About"
        title="We are Skyloom"
        description="A collective of engineers, certified pilots, and creators bound by a singular mission: to democratize the sky."
        backgroundImage="/images/hero_about.jpg"
      />

      {/* Mission + Image */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="space-y-6">
                <SectionHeading
                  eyebrow="Mission"
                  title="Elevating perspectives, one flight at a time"
                />
                <p className="text-base leading-relaxed text-muted-foreground">
                  We believe the world looks different from above — and that difference changes how people see
                  their properties, events, land, and stories. Skyloom exists to make that perspective available
                  to everyone, from solo content creators to enterprise infrastructure teams.
                </p>
                <p className="text-base leading-relaxed text-muted-foreground">
                  Whether you're buying your first drone, sending in a crashed FPV for repair, or hiring our
                  pilots for a cinematic wedding shoot — you get the same level of care, expertise, and passion.
                </p>
                <Button
                  render={<Link href="/contact" />}
                  nativeButton={false}
                  className="h-11 rounded-full px-6 shadow-lg shadow-primary/25"
                >
                  Work with us
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="relative">
                <div className="overflow-hidden rounded-3xl shadow-xl">
                  <Image
                    src="/images/aerial-3.png"
                    alt="Skyloom team on a shoot"
                    width={640}
                    height={480}
                    className="w-full object-cover"
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-5 -left-5 rounded-2xl border border-border bg-card p-4 shadow-lg">
                  <p className="font-display text-2xl font-bold text-primary">5+</p>
                  <p className="text-xs text-muted-foreground">Years of excellence</p>
                </div>
                <div className="absolute -right-5 -top-5 rounded-2xl border border-border bg-card p-4 shadow-lg">
                  <Award className="size-6 text-primary" />
                  <p className="mt-1 text-xs font-semibold">FAA Certified</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-5">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 60}>
                <p className="font-display text-4xl font-bold text-primary-foreground">{s.value}</p>
                <p className="mt-1 text-sm text-primary-foreground/75">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            center
            eyebrow="Our Values"
            title="What we stand for"
            description="Four principles that guide every decision, flight, and repair at Skyloom."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <div className="h-full rounded-3xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <v.icon className="size-6" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-peach py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading center eyebrow="History" title="Our journey so far" />
          <div className="relative mt-12">
            <div className="absolute left-6 top-0 h-full w-px bg-border sm:left-1/2" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <Reveal key={m.year} delay={i * 70}>
                  <div className={`flex gap-6 sm:gap-0 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                    <div className={`sm:w-1/2 ${i % 2 === 0 ? 'sm:pr-10 sm:text-right' : 'sm:pl-10'}`}>
                      <div className={`rounded-2xl border border-border bg-card p-5 shadow-sm`}>
                        <span className="font-display text-sm font-bold text-primary">{m.year}</span>
                        <h4 className="mt-1 font-display text-base font-semibold">{m.title}</h4>
                        <p className="mt-1 text-sm text-muted-foreground">{m.desc}</p>
                      </div>
                    </div>
                    <div className="relative flex shrink-0 items-start justify-center sm:w-0">
                      <div className="relative z-10 flex size-12 -translate-x-1/2 items-center justify-center rounded-full border-2 border-primary bg-background shadow sm:translate-x-0">
                        <span className="font-display text-xs font-bold text-primary">{i + 1}</span>
                      </div>
                    </div>
                    <div className="hidden sm:block sm:w-1/2" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            center
            eyebrow="The Team"
            title="The people behind the flights"
            description="Pilots, engineers, and dreamers united by a love for the sky."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {extendedTeam.map((member, i) => (
              <Reveal key={member.name} delay={i * 60}>
                <div className="group rounded-3xl border border-border bg-card p-6 text-center transition-all hover:-translate-y-1 hover:shadow-md hover:shadow-primary/5">
                  <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-cream text-2xl font-display font-bold text-primary">
                    {member.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <h3 className="mt-4 font-display text-base font-semibold">{member.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-secondary/40 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading center eyebrow="Testimonials" title="What our clients say" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 90}>
                <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-7">
                  <Quote className="size-8 text-primary/30" />
                  <p className="mt-4 flex-1 leading-relaxed text-foreground/90">"{t.quote}"</p>
                  <StarRating rating={t.rating} className="mt-6" />
                  <div className="mt-4 border-t border-border pt-4">
                    <p className="font-display font-semibold">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <Users className="mx-auto size-12 text-primary/40" />
            <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">Ready to fly with Skyloom?</h2>
            <p className="mt-4 text-muted-foreground">
              Whether you want to buy, fly, or get a repair — we're here for every step.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button
                render={<Link href="/drones" />}
                nativeButton={false}
                className="h-12 rounded-full px-7 shadow-lg shadow-primary/25"
              >
                Shop drones
                <ArrowRight className="size-4" />
              </Button>
              <Button
                variant="outline"
                render={<Link href="/contact" />}
                nativeButton={false}
                className="h-12 rounded-full px-7"
              >
                Contact our team
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <Newsletter />
    </>
  )
}
