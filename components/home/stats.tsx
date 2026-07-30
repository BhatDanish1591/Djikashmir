'use client'

import { useEffect, useRef, useState } from 'react'
import { stats } from '@/lib/data'

function Counter({ value }: { value: string }) {
  const match = value.match(/^(\d+)(.*)$/)
  const target = match ? parseInt(match[1], 10) : 0
  const suffix = match ? match[2] : value
  const [n, setN] = useState(0)
  const ref = useRef<HTMLParagraphElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 1400
        const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setN(Math.round(eased * target))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return (
    <p ref={ref} className="font-display text-4xl font-bold text-primary sm:text-5xl">
      {match ? n : ''}
      {suffix}
    </p>
  )
}

export function Stats() {
  return (
    <section className="bg-foreground">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-16 sm:px-6 md:grid-cols-5 lg:px-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <Counter value={s.value} />
            <p className="mt-2 text-sm font-medium text-background/70">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
