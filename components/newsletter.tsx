import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Newsletter() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-primary px-6 py-14 text-center sm:px-12">
        <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 size-64 rounded-full bg-white/10" />
        <div className="relative mx-auto max-w-xl">
          <h2 className="font-display text-3xl font-bold text-primary-foreground text-balance sm:text-4xl">
            Stay in the loop
          </h2>
          <p className="mt-3 text-primary-foreground/85">
            Get new drone drops, exclusive offers, and aerial tips delivered to your inbox.
          </p>
          <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              placeholder="Enter your email"
              aria-label="Email address"
              className="h-12 flex-1 rounded-full border border-white/30 bg-white/15 px-5 text-primary-foreground placeholder:text-primary-foreground/70 outline-none focus:border-white"
            />
            <Button
              type="submit"
              className="h-12 rounded-full bg-background px-6 text-foreground hover:bg-background/90"
            >
              <Send className="size-4" />
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
