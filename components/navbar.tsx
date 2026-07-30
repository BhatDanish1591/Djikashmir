'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  Heart,
  Menu,
  Plane,
  Search,
  ShoppingBag,
  User,
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Lock,
  Phone,
  ShieldCheck,
} from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { products } from '@/lib/data'

const links = [
  { href: '/', label: 'Home' },
  { href: '/drones', label: 'Drones' },
  { href: '/services', label: 'Services' },
  { href: '/repair', label: 'Repair' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Hide Navbar on admin routes
  if (pathname?.startsWith('/admin')) {
    return null
  }

  // Dynamic cart state: array of { product: Product, qty: number }
  const [cartItems, setCartItems] = useState<{ product: typeof products[number]; qty: number }[]>([])

  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0)
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0)

  // Auth States removed
  // Sync state changes to localStorage
  const saveCart = (items: typeof cartItems) => {
    setCartItems(items)
    if (typeof window !== 'undefined') {
      const serializable = items.map(item => ({
        slug: item.product.slug,
        qty: item.qty
      }))
      localStorage.setItem('skyloom_cart', JSON.stringify(serializable))
    }
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handleAdd = (e: Event) => {
      const { product, qty } = (e as CustomEvent).detail
      setCartItems(prev => {
        let updated
        const existing = prev.find(item => item.product.slug === product.slug)
        if (existing) {
          updated = prev.map(item =>
            item.product.slug === product.slug ? { ...item, qty: item.qty + qty } : item
          )
        } else {
          updated = [
            ...prev,
            { product, qty }
          ]
        }
        if (typeof window !== 'undefined') {
          const serializable = updated.map(item => ({
            slug: item.product.slug,
            qty: item.qty
          }))
          localStorage.setItem('skyloom_cart', JSON.stringify(serializable))
        }
        return updated
      })
      setIsCartOpen(true)
    }

    const handleCartSync = () => {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('skyloom_cart')
        if (saved) {
          try {
            const parsed = JSON.parse(saved) as { slug: string; qty: number }[]
            const loaded = parsed.map(item => {
              const prod = products.find(p => p.slug === item.slug)
              return prod ? { product: prod, qty: item.qty } : null
            }).filter(Boolean) as { product: typeof products[number]; qty: number }[]
            setCartItems(loaded)
          } catch (e) {
            console.error(e)
          }
        } else {
          setCartItems([])
        }
      }
    }

    window.addEventListener('add-to-cart', handleAdd)
    window.addEventListener('cart-updated', handleCartSync)
    return () => {
      window.removeEventListener('add-to-cart', handleAdd)
      window.removeEventListener('cart-updated', handleCartSync)
    }
  }, [])

  useEffect(() => {
    setOpen(false)
    setIsCartOpen(false)
  }, [pathname])

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetPath: string) => {
    if (pathname === targetPath) {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setOpen(false)
    }
  }

  const updateQty = (slug: string, delta: number) => {
    const updated = cartItems.map(item => {
      if (item.product.slug === slug) {
        return { ...item, qty: item.qty + delta }
      }
      return item
    }).filter(item => item.qty > 0)
    saveCart(updated)
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('cart-updated'))
    }
  }

  const removeItem = (slug: string) => {
    const updated = cartItems.filter(item => item.product.slug !== slug)
    saveCart(updated)
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('cart-updated'))
    }
  }



  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-all duration-300',
          scrolled ? 'bg-white shadow-md border-b border-border/50' : 'bg-transparent',
        )}
      >
        <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link 
            href="/" 
            onClick={(e) => handleLinkClick(e, '/')}
            className="flex items-center gap-2.5"
          >
            <span className="flex size-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
              <Plane className="size-5 -rotate-45" />
            </span>
            <span className="font-display text-lg font-bold leading-none tracking-tight">
              SKYLOOM
              <span className="block text-[11px] font-medium tracking-[0.35em] text-muted-foreground">
                DRONES
              </span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={(e) => handleLinkClick(e, l.href)}
                  className={cn(
                    'rounded-full px-3.5 py-2 text-sm font-medium transition-colors hover:text-primary',
                    pathname === l.href ? 'text-primary' : 'text-foreground/80',
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <Link
              href="/drones"
              aria-label="Search"
              className="hidden size-9 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-muted hover:text-primary sm:flex"
            >
              <Search className="size-5" />
            </Link>

            {/* Interactive Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Open Cart"
              className="relative flex size-9 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-muted hover:text-primary"
            >
              <ShoppingBag className="size-5" />
              {totalItems > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground transition-all duration-300">
                  {totalItems}
                </span>
              )}
            </button>


            <Button
              render={<Link href="/contact">Get a Quote</Link>}
              nativeButton={false}
              className="ml-1 hidden h-10 rounded-full px-5 text-sm shadow-lg shadow-primary/25 md:inline-flex"
            />
            <button
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className="flex size-9 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-muted lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="border-t border-border bg-background lg:hidden">
            <ul className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={(e) => handleLinkClick(e, l.href)}
                    className={cn(
                      'block rounded-xl px-3 py-2.5 text-base font-medium transition-colors',
                      pathname === l.href
                        ? 'bg-muted text-primary'
                        : 'text-foreground/80 hover:bg-muted',
                    )}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Button
                  render={<Link href="/contact">Get a Quote</Link>}
                  nativeButton={false}
                  className="h-11 w-full rounded-full"
                />
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* Cart Sliding Sidebar */}
      {isCartOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <div
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] transition-opacity duration-300 animate-in fade-in"
          />

          {/* Slide-over Drawer Panel */}
          <div className="fixed top-0 right-0 h-full w-full max-w-md bg-card border-l border-border shadow-2xl z-[101] flex flex-col animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag className="size-5 text-primary" />
                <h2 className="font-display text-lg font-bold">Shopping Cart</h2>
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
                  {totalItems}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="flex size-8 items-center justify-center rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Secure Checkout Session Banner removed */}

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <ShoppingBag className="size-12 text-muted-foreground/30 mb-4" />
                  <p className="font-semibold text-foreground">Your cart is empty</p>
                  <p className="text-sm text-muted-foreground mt-1 max-w-xs">
                    Explore our collection and add premium drones to your fleet.
                  </p>
                  <Button
                    render={<Link href="/drones">Browse Drones</Link>}
                    nativeButton={false}
                    className="mt-6 rounded-full"
                    onClick={() => setIsCartOpen(false)}
                  />
                </div>
              ) : (
                cartItems.map((item) => {
                  if (!item.product) return null
                  return (
                    <div
                      key={item.product.slug}
                      className="flex gap-4 rounded-2xl border border-border p-4 bg-background transition-all hover:border-primary/20"
                    >
                      {/* Proper Product Image */}
                      <div className="relative size-16 shrink-0 rounded-xl bg-peach flex items-center justify-center p-1 overflow-hidden">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-display text-sm font-semibold leading-tight text-foreground line-clamp-1">
                            {item.product.name}
                          </h4>
                          <span className="text-[9px] font-bold uppercase tracking-wider text-primary">
                            {item.product.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">
                          {item.product.tagline}
                        </p>
                        <p className="text-xs font-semibold text-foreground mt-1.5">
                          ${item.product.price.toLocaleString()} each
                        </p>

                        {/* Quantity & Delete Controls */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQty(item.product.slug, -1)}
                              className="flex size-6 items-center justify-center rounded-full border border-border text-xs transition-colors hover:border-primary hover:text-primary"
                            >
                              <Minus className="size-3" />
                            </button>
                            <span className="w-5 text-center text-xs font-semibold">{item.qty}</span>
                            <button
                              onClick={() => updateQty(item.product.slug, 1)}
                              className="flex size-6 items-center justify-center rounded-full border border-border text-xs transition-colors hover:border-primary hover:text-primary"
                            >
                              <Plus className="size-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.slug)}
                            className="text-muted-foreground hover:text-destructive p-1 rounded transition-colors"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            {/* Footer Summary */}
            {cartItems.length > 0 && (
              <div className="border-t border-border p-6 bg-muted/30">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground font-medium">Subtotal</span>
                  <span className="font-display text-xl font-bold text-primary">
                    ${subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="space-y-2">
                  <Button
                    onClick={() => {
                      setIsCartOpen(false)
                      router.push('/cart')
                    }}
                    className="h-12 w-full rounded-full text-sm shadow-lg shadow-primary/25"
                  >
                    Proceed to Checkout
                    <ArrowRight className="size-4" />
                  </Button>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="h-11 w-full rounded-full border border-border bg-card text-xs font-semibold hover:bg-muted transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}


    </>
  )
}

