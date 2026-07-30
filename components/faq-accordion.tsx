'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="mx-auto max-w-2xl space-y-3">
      {items.map((f, i) => (
        <div key={f.q} className="rounded-2xl border border-border bg-card">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 p-5 text-left font-medium"
            aria-expanded={open === i}
          >
            {f.q}
            <Plus
              className={cn(
                'size-5 shrink-0 text-primary transition-transform',
                open === i && 'rotate-45',
              )}
            />
          </button>
          {open === i && (
            <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
          )}
        </div>
      ))}
    </div>
  )
}
