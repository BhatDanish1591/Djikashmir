import Link from 'next/link'
import { ArrowRight, Play, ShieldCheck, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MagneticButton } from '@/components/ui/magnetic-button'
import { prisma } from '@/lib/prisma'

export async function Hero() {
  const heroData = await prisma.hero.findFirst()

  return (
    <section className="relative h-[92vh] min-h-[600px] w-full overflow-hidden flex items-center justify-center">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
          src={heroData?.videoUrl || "https://assets.mixkit.co/videos/49334/49334-360.mp4"}
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8 text-white flex flex-col items-center mt-10">
        <div className="animate-fade-up flex flex-col items-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 backdrop-blur-md px-4 py-1.5 text-sm font-medium shadow-sm">
            <span className="flex items-center gap-1 text-primary">
              <Star className="size-3.5 fill-primary" /> 4.9
            </span>
            <span className="text-white/90">Rated by 2,500+ pilots</span>
          </span>

          <h1 className="mt-8 font-display text-5xl font-bold leading-[1.1] tracking-tight text-balance sm:text-6xl md:text-7xl lg:text-[5rem]">
            {heroData?.title || (
              <>
                Elevate Your World with{' '}
                <span className="text-primary drop-shadow-md block sm:inline">Skyloom</span>
              </>
            )}
          </h1>

          <p className="mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed text-white/90 text-pretty">
            {heroData?.description || 'Premium drones, expert repairs, and professional aerial solutions — engineered for creators, surveyors, and industry pioneers.'}
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 justify-center sm:flex-row sm:gap-6">
            <MagneticButton
              size="lg"
              render={<Link href="/drones" />}
              className="h-14 rounded-full px-8 text-base shadow-xl shadow-primary/25"
            >
              Shop Drones
              <ArrowRight className="size-5 ml-1" />
            </MagneticButton>
            <MagneticButton
              size="lg"
              variant="outline"
              render={<Link href="/services" />}
              className="h-14 rounded-full border-white/30 bg-black/20 backdrop-blur-md px-8 text-base text-white hover:bg-white hover:text-black transition-colors"
            >
              <Play className="size-4 mr-2" />
              Book a Service
            </MagneticButton>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 opacity-90">
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck className="size-6 text-primary" />
              <span className="text-sm font-medium">3-Year Warranty</span>
            </div>
            <div className="h-10 w-px bg-white/20 hidden sm:block" />
            <div className="flex flex-col items-center">
              <p className="font-display text-3xl font-bold">3000+</p>
              <p className="text-sm text-white/70">Projects delivered</p>
            </div>
            <div className="h-10 w-px bg-white/20 hidden sm:block" />
            <div className="flex flex-col items-center">
              <p className="font-display text-3xl font-bold">25+</p>
              <p className="text-sm text-white/70">Expert pilots</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
