import Link from 'next/link'
import type { Metadata } from 'next'
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Wrench,
  ShoppingBag,
  Headphones,
} from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/reveal'
import { BookingForm } from '@/components/booking-form'
import { FaqAccordion } from '@/components/faq-accordion'

export const metadata: Metadata = {
  title: 'Contact Us — Skyloom Drones',
  description:
    "Get in touch with the Skyloom team for sales, repairs, aerial services, or any other inquiry. We're available 24/7.",
}

const contactInfo = [
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 1800 759 5666',
    sub: 'Mon–Fri, 8am–8pm IST',
    href: 'tel:+9118007595666',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@skyloomdrones.com',
    sub: 'We reply within 24 hours',
    href: 'mailto:hello@skyloomdrones.com',
  },
  {
    icon: MapPin,
    label: 'Headquarters',
    value: 'Skyloom drones kunzer',
    sub: 'Jammu and Kashmir 193404',
    href: 'https://maps.google.com/?q=3GM3+H67,+Kunzer,+Jammu+and+Kashmir+193404',
  },
  {
    icon: Clock,
    label: 'Support Hours',
    value: '24/7 Online Chat',
    sub: 'In-store: Mon–Sat, 9am–6pm',
    href: '#',
  },
]

const reasons = [
  { icon: ShoppingBag, title: 'Sales & Orders', desc: 'Questions about products, orders, or shipping.' },
  { icon: Wrench, title: 'Repair Inquiries', desc: 'Get an estimate or check on your repair status.' },
  { icon: MessageSquare, title: 'Aerial Services', desc: 'Book a shoot, survey, or inspection project.' },
  { icon: Headphones, title: 'Technical Support', desc: 'Firmware, setup help, and troubleshooting.' },
]

const contactFaqs = [
  {
    q: 'How quickly will you respond to my inquiry?',
    a: 'All emails and form submissions are responded to within 24 hours on business days. Phone and live chat are available during business hours with no hold time.',
  },
  {
    q: 'Can I visit your store in person?',
    a: 'Absolutely! Our Austin, TX showroom is open Monday through Saturday, 9am–6pm. We recommend calling ahead for repairs so we can have a technician ready.',
  },
  {
    q: 'Do you offer consultations before booking aerial services?',
    a: 'Yes — every aerial project starts with a free 30-minute consultation call to understand your vision, location, and deliverables.',
  },
  {
    q: "I have an urgent repair — what's the fastest way to reach you?",
    a: "Call us at +91 1800 759 5666 for priority handling. Alternatively, use the repair booking form and mark it as urgent — we'll escalate it immediately.",
  },
]

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        breadcrumb="Contact"
        title="We'd love to hear from you"
        description="Whether it's a question, a quote, or just a hello — our team is ready to help."
        backgroundImage="/images/hero_contact.jpg"
      />

      {/* Contact cards */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((c, i) => (
              <Reveal key={c.label} delay={i * 80}>
                <a
                  href={c.href}
                  className="group flex h-full flex-col rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <c.icon className="size-5" />
                  </div>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {c.label}
                  </p>
                  <p className="mt-1 font-display font-semibold text-foreground transition-colors group-hover:text-primary">
                    {c.value}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{c.sub}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What to contact us about */}
      <section className="bg-peach py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 60}>
                <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4">
                  <r.icon className="size-5 text-primary" />
                  <div>
                    <p className="text-sm font-semibold">{r.title}</p>
                    <p className="text-xs text-muted-foreground">{r.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <Reveal>
              <BookingForm type="contact" />
            </Reveal>

            <Reveal delay={120}>
              <div className="flex h-full flex-col gap-6">
                {/* Map placeholder */}
                <div className="relative flex-1 overflow-hidden rounded-3xl border border-border bg-cream">
                  <div className="flex h-full min-h-[300px] flex-col items-center justify-center gap-3 p-8 text-center">
                    <MapPin className="size-12 text-primary/40" />
                    <p className="font-display text-lg font-semibold">Skyloom drones kunzer</p>
                    <p className="text-sm text-muted-foreground">3GM3+H67, Kunzer, Jammu and Kashmir 193404</p>
                    <a
                      href="https://maps.google.com/?q=3GM3+H67,+Kunzer,+Jammu+and+Kashmir+193404"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
                    >
                      Open in Google Maps
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="rounded-3xl border border-border bg-card p-6">
                  <h3 className="font-display text-lg font-semibold">Store Hours</h3>
                  <div className="mt-4 space-y-2">
                    {[
                      { day: 'Monday – Friday', hours: '9:00 am – 6:00 pm' },
                      { day: 'Saturday', hours: '10:00 am – 4:00 pm' },
                      { day: 'Sunday', hours: 'Closed' },
                    ].map((h) => (
                      <div key={h.day} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{h.day}</span>
                        <span
                          className={`font-medium ${h.hours === 'Closed' ? 'text-destructive' : 'text-foreground'}`}
                        >
                          {h.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-secondary/40 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading center eyebrow="FAQ" title="Common questions" />
          <div className="mt-10">
            <FaqAccordion items={contactFaqs} />
          </div>
        </div>
      </section>
    </>
  )
}
