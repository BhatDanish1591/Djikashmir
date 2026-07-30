import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import {
  ArrowRight,
  Cpu,
  Battery,
  Camera,
  CircleDot,
  Wrench,
  PackageCheck,
  Clock,
  ShieldCheck,
} from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { RepairTracker } from '@/components/repair-tracker'
import { BookingForm } from '@/components/booking-form'
import { FaqAccordion } from '@/components/faq-accordion'
import { Newsletter } from '@/components/newsletter'
import { repairServices, repairFaqs } from '@/lib/data'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Drone Repair Services — Skyloom Drones',
  description:
    'Expert drone repair and maintenance. Certified technicians, genuine parts, and a 90-day workmanship warranty. Track your repair in real time.',
}

const iconMap = { Cpu, Battery, Camera, CircleDot, Wrench, PackageCheck } as const

const steps = [
  { title: 'Book & Ship', desc: 'Schedule online and send us your drone with a prepaid label.', icon: PackageCheck },
  { title: 'Free Diagnosis', desc: 'Our technicians inspect and send you a transparent quote.', icon: Wrench },
  { title: 'Expert Repair', desc: 'Genuine parts installed by certified specialists.', icon: Cpu },
  { title: 'Test & Return', desc: 'Full flight test, then fast shipping back to your door.', icon: ShieldCheck },
]

const guarantees = [
  { icon: ShieldCheck, title: '90-Day Warranty', desc: 'Every repair is backed by our workmanship guarantee.' },
  { icon: Clock, title: '5-Day Turnaround', desc: 'Most repairs completed within 5 business days.' },
  { icon: PackageCheck, title: 'Genuine Parts', desc: 'We only use manufacturer-certified OEM components.' },
  { icon: Wrench, title: 'Free Diagnosis', desc: 'No charge to assess — ever. Pay only if you approve.' },
]

export default function RepairPage() {
  return (
    <>
      <PageHero
        eyebrow="Drone Clinic"
        breadcrumb="Repair"
        title="Expert Drone Repair"
        description="Certified technicians, genuine parts, and lightning-fast turnaround. We get you back in the air."
        backgroundImage="/images/hero_repair.jpg"
      />

      {/* Guarantees strip */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-border px-0 lg:grid-cols-4">
          {guarantees.map((g) => (
            <div key={g.title} className="flex items-start gap-4 bg-card px-6 py-7">
              <g.icon className="mt-0.5 size-5 shrink-0 text-primary" />
              <div>
                <p className="font-semibold text-foreground">{g.title}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{g.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Simple Process"
            title="How our repair service works"
            description="From booking to return, we keep it transparent and fast."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 80}>
                <div className="relative h-full rounded-3xl border border-border bg-card p-6 shadow-sm">
                  <span className="font-sans text-sm font-bold text-primary">{`0${i + 1}`}</span>
                  <div className="mt-4 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <step.icon className="size-6" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                  {i < steps.length - 1 && (
                    <ArrowRight className="absolute -right-3 top-1/2 hidden size-5 -translate-y-1/2 text-border lg:block" />
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services + image */}
      <section className="bg-secondary/40 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="overflow-hidden rounded-3xl border border-border shadow-lg">
                <Image
                  src="/images/repair.png"
                  alt="Technician repairing a drone circuit board"
                  width={720}
                  height={560}
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>
            <div>
              <SectionHeading
                eyebrow="What We Fix"
                title="Repairs for every component"
                description="Flat-rate pricing on common repairs. No hidden fees, ever."
              />
              <div className="mt-8 space-y-3">
                {repairServices.map((svc, i) => {
                  const Icon = iconMap[svc.icon as keyof typeof iconMap] ?? Wrench
                  return (
                    <Reveal key={svc.name} delay={i * 60}>
                      <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <Icon className="size-5" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{svc.name}</p>
                          <p className="text-sm text-muted-foreground">{svc.time}</p>
                        </div>
                        <p className="font-semibold text-foreground">{svc.price}</p>
                      </div>
                    </Reveal>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tracker + Booking */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <Reveal>
              <RepairTracker />
            </Reveal>
            <Reveal delay={100}>
              <BookingForm type="repair" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-secondary/40 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading center eyebrow="Questions" title="Repair FAQs" />
          <div className="mt-10">
            <FaqAccordion items={repairFaqs} />
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  )
}
