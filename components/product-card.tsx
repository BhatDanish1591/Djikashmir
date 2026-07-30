'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Eye, Heart, ShoppingBag } from 'lucide-react'
import { StarRating } from '@/components/star-rating'
import { formatPrice } from '@/lib/data'
import { Button } from '@/components/ui/button'

export function ProductCard({ product }: { product: any }) {
  const handleAddToCart = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('add-to-cart', { detail: { product, qty: 1 } }))
    }
  }

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_-20px_rgba(255,107,0,0.35)]">
      <div className="relative aspect-square overflow-hidden bg-peach">
        {product.badge && (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            {product.badge}
          </span>
        )}
        {!product.inStock && (
          <span className="absolute right-4 top-4 z-10 rounded-full bg-foreground/80 px-3 py-1 text-xs font-semibold text-background">
            Out of Stock
          </span>
        )}
        <Link href={`/drones/${product.slug}`}>
          <Image
            src={product.image || '/placeholder.svg'}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        <div className="absolute right-4 top-1/2 flex -translate-y-1/2 flex-col gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <button
            aria-label="Add to wishlist"
            className="flex size-9 items-center justify-center rounded-full bg-card text-foreground/70 shadow-md transition-colors hover:text-primary"
          >
            <Heart className="size-4" />
          </button>
          <Link
            href={`/drones/${product.slug}`}
            aria-label="Quick view"
            className="flex size-9 items-center justify-center rounded-full bg-card text-foreground/70 shadow-md transition-colors hover:text-primary"
          >
            <Eye className="size-4" />
          </Link>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {product.category}
          </span>
          <StarRating rating={product.rating} />
        </div>
        <Link href={`/drones/${product.slug}`}>
          <h3 className="mt-2 font-display text-lg font-semibold leading-tight transition-colors group-hover:text-primary">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{product.tagline}</p>

        <div className="mt-4 flex items-end justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-xl font-bold">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Button
            disabled={!product.inStock}
            onClick={handleAddToCart}
            className="h-10 flex-1 rounded-full"
          >
            <ShoppingBag className="size-4" />
            Add to Cart
          </Button>
          <Button
            variant="outline"
            render={<Link href={`/drones/${product.slug}`}>Buy Now</Link>}
            className="h-10 rounded-full border-border px-4"
          />
        </div>
      </div>
    </div>
  )
}
