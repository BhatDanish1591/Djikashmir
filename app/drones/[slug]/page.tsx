import { notFound } from 'next/navigation'
import { ProductDetail } from '@/components/product-detail'
import { Newsletter } from '@/components/newsletter'
import { products } from '@/lib/data'

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)
  if (!product) return { title: 'Drone — Skyloom Drones' }
  return {
    title: `${product.name} — Skyloom Drones`,
    description: product.tagline,
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)
  if (!product) notFound()

  const related = products
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .slice(0, 3)
  const fallback = products.filter((p) => p.slug !== product.slug).slice(0, 3)

  return (
    <>
      <ProductDetail product={product} related={related.length ? related : fallback} />
      <Newsletter />
    </>
  )
}
