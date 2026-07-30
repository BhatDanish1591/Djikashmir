'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import {
  Check,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from 'lucide-react'
import { StarRating } from '@/components/star-rating'
import { Button } from '@/components/ui/button'
import { formatPrice, type Product } from '@/lib/data'
import { cn } from '@/lib/utils'

const tabs = ['Specifications', 'Features', 'Reviews', 'FAQs'] as const

const faqs = [
  { q: 'What is included in the box?', a: 'The drone, controller, two batteries, charger, spare propellers, and a carry case.' },
  { q: 'Do you offer international shipping?', a: 'Yes, we ship worldwide with tracked, insured couriers. Duties are calculated at checkout.' },
  { q: 'What warranty comes with this drone?', a: 'Every drone includes a 2-year standard warranty, extendable to 3 years at checkout.' },
  { q: 'Can I trade in my old drone?', a: 'Absolutely. Contact our team for a trade-in valuation before you order.' },
]

const reviews = [
  { name: 'James P.', rating: 5, text: 'Incredible image quality and rock-steady footage. Worth every penny.' },
  { name: 'Mia K.', rating: 5, text: 'Setup was effortless and the flight time is genuinely as advertised.' },
  { name: 'Andre L.', rating: 4, text: 'Fantastic drone. Would love a slightly longer range but no complaints.' },
]

export function ProductDetail({ product, related }: { product: Product; related: Product[] }) {
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState<(typeof tabs)[number]>('Specifications')
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <ChevronRight className="size-4" />
        <Link href="/drones" className="hover:text-primary">
          Drones
        </Link>
        <ChevronRight className="size-4" />
        <span className="font-medium text-foreground">{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        {/* Gallery */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-border bg-peach">
            {product.badge && (
              <span className="absolute left-5 top-5 z-10 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                {product.badge}
              </span>
            )}
            <Image
              src={product.image || '/placeholder.svg'}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-contain p-10"
            />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={cn(
                  'relative aspect-square overflow-hidden rounded-2xl border bg-peach',
                  i === 0 ? 'border-primary' : 'border-border',
                )}
              >
                <Image
                  src={product.image || '/placeholder.svg'}
                  alt={`${product.name} view ${i + 1}`}
                  fill
                  sizes="120px"
                  className="object-contain p-3"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Info / sticky buy */}
        <div>
          <span className="text-sm font-medium uppercase tracking-wide text-primary">
            {product.category} · {product.brand}
          </span>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            {product.name}
          </h1>
          <div className="mt-3 flex items-center gap-3">
            <StarRating rating={product.rating} />
            <span className="text-sm text-muted-foreground">
              {product.rating} · {product.reviews} reviews
            </span>
          </div>
          <p className="mt-4 leading-relaxed text-muted-foreground">{product.tagline}</p>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-4xl font-bold">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="text-lg text-muted-foreground line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {product.specs.map((s) => (
              <div key={s.label} className="rounded-2xl border border-border bg-card p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{s.label}</p>
                <p className="mt-1 font-display text-lg font-semibold">{s.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-full border border-border">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="flex size-11 items-center justify-center rounded-full hover:text-primary"
              >
                <Minus className="size-4" />
              </button>
              <span className="w-8 text-center font-semibold">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
                className="flex size-11 items-center justify-center rounded-full hover:text-primary"
              >
                <Plus className="size-4" />
              </button>
            </div>
            <span
              className={cn(
                'text-sm font-medium',
                product.inStock ? 'text-success' : 'text-destructive',
              )}
            >
              {product.inStock ? 'In stock — ships in 24h' : 'Currently out of stock'}
            </span>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              disabled={!product.inStock}
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('add-to-cart', { detail: { product, qty } }))
                }
              }}
              className="h-13 flex-1 rounded-full text-base shadow-lg shadow-primary/25"
            >
              <ShoppingBag className="size-5" />
              Add to Cart
            </Button>
            <Button
              size="lg"
              variant="outline"
              render={<Link href="/checkout" />}
              className="h-13 flex-1 rounded-full border-border text-base"
            >
              Buy Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              aria-label="Add to wishlist"
              className="h-13 rounded-full border-border px-4"
            >
              <Heart className="size-5" />
            </Button>
          </div>

          <div className="mt-6 flex flex-col gap-3 rounded-2xl bg-peach p-5 sm:flex-row sm:gap-6">
            <div className="flex items-center gap-2 text-sm">
              <Truck className="size-5 text-primary" />
              <span>Free next-day delivery</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <ShieldCheck className="size-5 text-primary" />
              <span>2-year warranty included</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <div className="flex flex-wrap gap-2 border-b border-border">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                'relative px-4 py-3 text-sm font-semibold transition-colors',
                tab === t ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {t}
              {tab === t && (
                <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </div>

        <div className="py-8">
          {tab === 'Specifications' && (
            <div className="grid gap-x-12 gap-y-3 sm:grid-cols-2">
              {product.specs.concat([{ label: 'Brand', value: product.brand }]).map((s) => (
                <div
                  key={s.label}
                  className="flex justify-between border-b border-border py-3 text-sm"
                >
                  <span className="text-muted-foreground">{s.label}</span>
                  <span className="font-medium">{s.value}</span>
                </div>
              ))}
            </div>
          )}

          {tab === 'Features' && (
            <ul className="grid gap-4 sm:grid-cols-2">
              {product.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="size-4" />
                  </span>
                  <span className="text-foreground/90">{f}</span>
                </li>
              ))}
            </ul>
          )}

          {tab === 'Reviews' && (
            <div className="space-y-5">
              {reviews.map((r) => (
                <div key={r.name} className="rounded-2xl border border-border bg-card p-5">
                  <div className="flex items-center justify-between">
                    <p className="font-display font-semibold">{r.name}</p>
                    <StarRating rating={r.rating} />
                  </div>
                  <p className="mt-2 text-sm text-foreground/90">{r.text}</p>
                </div>
              ))}
            </div>
          )}

          {tab === 'FAQs' && (
            <div className="mx-auto max-w-2xl space-y-3">
              {faqs.map((f, i) => (
                <div key={f.q} className="rounded-2xl border border-border bg-card">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left font-medium"
                  >
                    {f.q}
                    <Plus
                      className={cn(
                        'size-5 shrink-0 text-primary transition-transform',
                        openFaq === i && 'rotate-45',
                      )}
                    />
                  </button>
                  {openFaq === i && (
                    <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                      {f.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-8">
          <h2 className="font-display text-2xl font-bold">Related drones</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/drones/${r.slug}`}
                className="group flex items-center gap-4 rounded-3xl border border-border bg-card p-4 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
              >
                <span className="relative size-24 shrink-0 overflow-hidden rounded-2xl bg-peach">
                  <Image
                    src={r.image || '/placeholder.svg'}
                    alt={r.name}
                    fill
                    sizes="96px"
                    className="object-contain p-2 transition-transform group-hover:scale-105"
                  />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    {r.category}
                  </p>
                  <p className="font-display font-semibold transition-colors group-hover:text-primary">
                    {r.name}
                  </p>
                  <p className="mt-1 font-semibold text-primary">{formatPrice(r.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
