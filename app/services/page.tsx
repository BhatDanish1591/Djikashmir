import { Check } from 'lucide-react'
import { BookingForm } from '@/components/booking-form'
import { FaqAccordion } from '@/components/faq-accordion'
import { Newsletter } from '@/components/newsletter'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'

import { prisma } from '@/lib/prisma'

export const metadata = {
  title: 'Services — Skyloom Drones',
  description:
    'Professional drone services: weddings, events, real estate, construction, agriculture, survey, inspection, film production, and more.',
}

const plans = [
  {
    name: 'Essential',
    price: '₹24,999',
    period: '/ half day',
    features: ['Up to 3 hours coverage', 'Edited 1080p footage', '20 aerial photos', '3-day delivery'],
    featured: false,
  },
  {
    name: 'Professional',
    price: '₹49,999',
    period: '/ full day',
    features: [
      'Up to 6 hours coverage',
      'Edited 4K footage',
      '50 aerial photos',
      'Licensed pilot + insurance',
      'Next-day delivery',
    ],
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    features: [
      'Multi-day projects',
      '8K + mapping deliverables',
      'Dedicated project manager',
      'RTK survey accuracy',
      'Priority support',
    ],
    featured: false,
  },
]

const faqs = [
  { q: 'Are your pilots licensed and insured?', a: 'Yes. Every Skyloom pilot is certified and we carry full liability insurance for all shoots.' },
  { q: 'How soon do I receive the footage?', a: 'Delivery ranges from next-day to 3 days depending on your plan and edit complexity.' },
  { q: 'Do you fly in all weather?', a: 'We monitor conditions closely and reschedule free of charge if weather is unsafe for flight.' },
  { q: 'Can you handle permits for restricted areas?', a: 'Absolutely — our operations team arranges the necessary airspace authorizations on your behalf.' },
]

export default async function ServicesPage() {
  const dbServices = await prisma.service.findMany()

  return (
    <>
      <PageHero
        eyebrow="Our Services"
        breadcrumb="Services"
        title="Professional Aerial Solutions"
        description="From cinematic wedding coverage to centimeter-accurate industrial surveys, we have the fleet and the expertise."
        backgroundImage="/images/hero_services.jpg"
      />

      {/* Services grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          center
          eyebrow="Capabilities"
          title="What we can capture for you"
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {dbServices.map((s, i) => (
            <Reveal
              key={s.id}
              delay={(i % 3) * 70}
              className="group relative overflow-hidden rounded-3xl border border-border"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-foreground/5">
                <video
                  src={s.videoUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="font-display text-lg font-semibold text-background">{s.title}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Pricing plans */}
      <section className="bg-peach py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            center
            eyebrow="Pricing"
            title="Simple, transparent pricing"
            description="Choose a plan that fits your project. Custom quotes available for complex work."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={
                  plan.featured
                    ? 'relative rounded-3xl border-2 border-primary bg-card p-8 shadow-xl shadow-primary/10'
                    : 'relative rounded-3xl border border-border bg-card p-8'
                }
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                    Most Popular
                  </span>
                )}
                <h3 className="font-display text-xl font-bold">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-bold">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#book"
                  className={
                    plan.featured
                      ? 'mt-8 flex h-12 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90'
                      : 'mt-8 flex h-12 items-center justify-center rounded-full border border-border text-sm font-medium transition-colors hover:border-primary hover:text-primary'
                  }
                >
                  Get started
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book service form */}
      <section id="book" className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          center
          eyebrow="Get started"
          title="Book a service"
          description="Tell us about your project and our team will craft the perfect aerial plan."
          className="mb-10"
        />
        <BookingForm
          title="Service booking"
          optionLabel="Service type"
          options={dbServices.map(s => s.title)}
        />
      </section>

      {/* FAQ */}
      <section className="bg-peach py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading center eyebrow="FAQ" title="Frequently asked questions" className="mb-10" />
          <FaqAccordion items={faqs} />
        </div>
      </section>

      <Newsletter />
    </>
  )
}
