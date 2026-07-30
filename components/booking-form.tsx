'use client'

import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { submitBooking } from '@/app/actions'

const inputClass =
  'h-12 w-full rounded-2xl border border-border bg-card px-4 text-sm outline-none transition-colors focus:border-primary'

const CONFIGS = {
  repair: {
    title: 'Book a Repair',
    optionLabel: 'Type of repair',
    options: [
      'Camera & Gimbal',
      'Motor & Propulsion',
      'Battery Service',
      'Mainboard & ESC',
      'Firmware Recovery',
      'Water Damage',
      'Other',
    ],
  },
  quote: {
    title: 'Request a Quote',
    optionLabel: 'Service type',
    options: [
      'Wedding Shoot',
      'Event Coverage',
      'Real Estate',
      'Survey & Mapping',
      'Industrial Inspection',
      'Agriculture',
      'Other',
    ],
  },
  contact: {
    title: 'Send a Message',
    optionLabel: 'Topic',
    options: ['General Inquiry', 'Sales', 'Repair', 'Partnership', 'Press', 'Other'],
  },
}

export function BookingForm({
  title,
  options,
  optionLabel,
  type,
}: {
  title?: string
  options?: string[]
  optionLabel?: string
  type?: 'repair' | 'quote' | 'contact'
}) {
  const cfg = type ? CONFIGS[type] : null
  const resolvedTitle = title ?? cfg?.title ?? 'Submit Request'
  const resolvedOptions = options ?? cfg?.options ?? []
  const resolvedOptionLabel = optionLabel ?? cfg?.optionLabel ?? 'Select type'

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  if (submitted) {
    return (
      <div className="flex flex-col items-center rounded-3xl border border-border bg-card p-10 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-success/10 text-success">
          <CheckCircle2 className="size-8" />
        </span>
        <h3 className="mt-5 font-display text-2xl font-bold">Request received!</h3>
        <p className="mt-2 max-w-sm text-muted-foreground">
          Thanks for reaching out. Our team will contact you within 24 hours to confirm the details.
        </p>
        <Button onClick={() => setSubmitted(false)} className="mt-6 rounded-full">
          Submit another request
        </Button>
      </div>
    )
  }

  return (
    <form
      action={async (formData) => {
        setLoading(true)
        try {
          await submitBooking(formData)
          setSubmitted(true)
        } catch (error) {
          console.error(error)
        } finally {
          setLoading(false)
        }
      }}
      className="rounded-3xl border border-border bg-card p-6 sm:p-8 relative"
    >
      <input type="hidden" name="type" value={type || 'contact'} />
      <h3 className="font-display text-2xl font-bold">{resolvedTitle}</h3>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium">Full name</label>
          <input required name="name" placeholder="Jane Doe" className={inputClass} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Email</label>
          <input required name="email" type="email" placeholder="jane@email.com" className={inputClass} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Phone</label>
          <input required name="phone" placeholder="+1 555 000 0000" className={inputClass} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Preferred date</label>
          <input type="date" name="date" className={inputClass} />
        </div>
        {resolvedOptions.length > 0 && (
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium">{resolvedOptionLabel}</label>
            <select name="topic" className={inputClass} defaultValue="">
              <option value="" disabled>
                Select an option
              </option>
              {resolvedOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium">Details</label>
          <textarea
            name="details"
            rows={4}
            placeholder="Tell us more about your project or issue..."
            className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
          />
        </div>
      </div>
      <Button type="submit" disabled={loading} size="lg" className="mt-6 h-12 w-full rounded-full text-base">
        {loading ? 'Submitting...' : 'Submit Request'}
      </Button>
    </form>
  )
}
