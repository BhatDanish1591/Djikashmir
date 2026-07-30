'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = 'div',
  direction = 'up',
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: React.ElementType
  direction?: 'up' | 'left' | 'right'
}) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const getInitialTransform = () => {
    switch (direction) {
      case 'left':
        return '-translate-x-12 opacity-0'
      case 'right':
        return 'translate-x-12 opacity-0'
      case 'up':
      default:
        return 'translate-y-8 opacity-0'
    }
  }

  const getFinalTransform = () => {
    switch (direction) {
      case 'left':
      case 'right':
        return 'translate-x-0 opacity-100'
      case 'up':
      default:
        return 'translate-y-0 opacity-100'
    }
  }

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        'transition-all duration-700 ease-out',
        visible ? getFinalTransform() : getInitialTransform(),
        className,
      )}
    >
      {children}
    </Tag>
  )
}

