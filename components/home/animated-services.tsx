'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { services } from '@/lib/data'
import { ArrowRight } from 'lucide-react'
import { MagneticButton } from '@/components/ui/magnetic-button'
import { BookingModal } from '@/components/ui/booking-modal'

interface ServiceProps {
  service: typeof services[0]
  index: number
  targetScale: number
  onBookClick: () => void
}

function ServiceCard({ service, index, targetScale, onBookClick }: ServiceProps) {
  const containerRef = useRef(null)
  
  // When this specific card reaches the top, we track its scroll to shrink it
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  // Scale down the card as the user scrolls past it (stacking effect)
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale])
  
  // Also add a slight dimming effect as it goes back in the stack
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.4])

  // Inner Parallax for the video
  const innerProgress = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })
  const y = useTransform(innerProgress.scrollYProgress, [0, 1], ['-15%', '15%'])

  return (
    <div ref={containerRef} className="h-screen w-full flex items-center justify-center sticky top-0">
      <motion.div 
        style={{ scale, opacity, top: `calc(5vh + ${index * 20}px)` }} 
        className="relative flex h-[85vh] w-[95vw] lg:w-[90vw] overflow-hidden rounded-[2.5rem] bg-zinc-950 text-white shadow-[0_-20px_80px_-20px_hsl(var(--primary)/0.4)] origin-top items-center justify-center text-center ring-1 ring-primary/20"
      >
        {/* Background Video with Parallax */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-zinc-900">
          <motion.div style={{ y }} className="absolute inset-0 w-full h-[130%] -top-[15%]">
            <video
              src={service.video}
              poster={service.image}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
          </motion.div>
          {/* Hero-like Dark Overlays */}
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
        </div>

        {/* Centered Content */}
        <div className="relative z-10 flex flex-col items-center justify-center p-8 sm:p-12 w-full max-w-4xl">
          <div className="relative flex flex-col items-center">
            {/* Category Label */}
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 backdrop-blur-md px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] shadow-sm">
              <span className="flex size-1.5 rounded-full bg-primary animate-pulse" />
              SERVICE
            </span>

            <h3 className="mt-6 font-display text-4xl font-bold tracking-tight text-white sm:text-6xl leading-[1.1] drop-shadow-md text-balance">
              {service.title}
            </h3>

            <p className="mt-6 text-lg sm:text-xl leading-relaxed text-white/90 max-w-2xl text-pretty drop-shadow-sm">
              {service.desc}
            </p>

            <div className="mt-10">
              <MagneticButton 
                size="lg"
                variant="outline" 
                onClick={onBookClick}
                className="h-14 rounded-full border-white/30 bg-black/20 backdrop-blur-md px-8 text-base text-white hover:bg-white hover:text-black transition-colors"
                magneticStrength={30}
              >
                Book now
                <ArrowRight className="size-5 ml-2" />
              </MagneticButton>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export function AnimatedServices() {
  const [selectedService, setSelectedService] = useState<string | null>(null)

  return (
    <>
      <div className="relative pb-32">
        {services.map((service, i) => {
          const targetScale = 1 - ((services.length - i) * 0.05)
          return (
            <ServiceCard 
              key={service.slug}
              service={service} 
              index={i} 
              targetScale={targetScale}
              onBookClick={() => setSelectedService(service.title)}
            />
          )
        })}
      </div>

      <BookingModal 
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        serviceName={selectedService || undefined}
      />
    </>
  )
}
