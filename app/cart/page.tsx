'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  Trash2,
  ArrowRight,
  ShoppingBag,
  Tag,
  Truck,
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  CheckCircle2,
  X,
  CreditCard,
  MapPin,
  ChevronRight,
  HelpCircle,
  Phone,
} from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { Button } from '@/components/ui/button'
import { products, formatPrice } from '@/lib/data'

const perks = [
  { icon: Truck, label: 'Free standard shipping on orders over ₹15,000' },
  { icon: ShieldCheck, label: '90-day comprehensive warranty and returns' },
  { icon: Tag, label: 'Authorized dealer price-match guarantee' },
]

const shippingMethods = [
  { id: 'standard', name: 'Standard Delivery', price: 0, time: '3-5 business days' },
  { id: 'express', name: 'Express Hangar Shipping', price: 19, time: '1-2 business days' },
]

export default function CartPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<{ product: typeof products[number]; qty: number }[]>([])
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart')
  const [shippingMethod, setShippingMethod] = useState('standard')

  // Shipping Form State
  const [fullName, setFullName] = useState('Jane Doe')
  const [address, setAddress] = useState('2450 Tech Ridge Blvd')
  const [city, setCity] = useState('Austin')
  const [zipCode, setZipCode] = useState('78753')
  const [phone, setPhone] = useState('+91 98765 43210')

  // Payment Form State
  const [cardNumber, setCardNumber] = useState('4111 2222 3333 4444')
  const [cardExpiry, setCardExpiry] = useState('12/28')
  const [cardCvc, setCardCvc] = useState('382')

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('skyloom_cart')
      if (savedCart) {
        try {
          const parsed = JSON.parse(savedCart) as { slug: string; qty: number }[]
          const loadedItems = parsed.map(item => {
            const prod = products.find(p => p.slug === item.slug)
            return prod ? { product: prod, qty: item.qty } : null
          }).filter(Boolean) as { product: typeof products[number]; qty: number }[]
          setCartItems(loadedItems)
        } catch (e) {
          console.error(e)
        }
      }
    }
  }, [])

  // Sync to storage & drawer
  const syncCart = (items: typeof cartItems) => {
    setCartItems(items)
    if (typeof window !== 'undefined') {
      const serializable = items.map(item => ({
        slug: item.product.slug,
        qty: item.qty
      }))
      localStorage.setItem('skyloom_cart', JSON.stringify(serializable))
      window.dispatchEvent(new Event('cart-updated'))
    }
  }

  const updateQty = (slug: string, delta: number) => {
    const updated = cartItems.map(item => {
      if (item.product.slug === slug) {
        return { ...item, qty: item.qty + delta }
      }
      return item
    }).filter(item => item.qty > 0)
    syncCart(updated)
  }

  const removeItem = (slug: string) => {
    const updated = cartItems.filter(item => item.product.slug !== slug)
    syncCart(updated)
  }

  const handleCheckoutClick = () => {
    setCheckoutStep('checkout')
  }



  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault()
    setCheckoutStep('success')
    setCartItems([])
    if (typeof window !== 'undefined') {
      localStorage.removeItem('skyloom_cart')
      window.dispatchEvent(new Event('cart-updated'))
    }
  }

  const handleRecommendAdd = (product: typeof products[number]) => {
    const existing = cartItems.find(item => item.product.slug === product.slug)
    let updated
    if (existing) {
      updated = cartItems.map(item =>
        item.product.slug === product.slug ? { ...item, qty: item.qty + 1 } : item
      )
    } else {
      updated = [...cartItems, { product, qty: 1 }]
    }
    syncCart(updated)
  }

  // Calculations
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0)
  const subtotal = cartItems.reduce((acc, { product, qty }) => acc + product.price * qty, 0)
  const selectedShip = shippingMethods.find(m => m.id === shippingMethod)
  const shippingFee = subtotal > 200 || subtotal === 0 ? 0 : (selectedShip?.price || 0)
  const tax = Math.round(subtotal * 0.085)
  const total = subtotal + shippingFee + tax

  // 1. Success Screen
  if (checkoutStep === 'success') {
    return (
      <>
        <PageHero
          eyebrow="Order Completed"
          title="Clear Skies Ahead"
          description="Your payment has been processed securely. Your shipment details are below."
        />
        <div className="mx-auto max-w-2xl px-4 py-16">
          <div className="rounded-[2.5rem] border border-border bg-card p-8 sm:p-12 text-center shadow-xl shadow-primary/5">
            <span className="mx-auto flex size-20 items-center justify-center rounded-full bg-success/10 text-success mb-6">
              <CheckCircle2 className="size-10 animate-bounce" />
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight">Order Confirmed!</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Confirmation Code: <span className="font-mono font-semibold text-foreground">SKY-{Math.floor(100000 + Math.random() * 900000)}</span>
            </p>

            <div className="mt-8 border-y border-border py-6 text-left space-y-4">
              <h4 className="font-display font-semibold text-foreground">Delivery Information</h4>
              <div className="grid gap-2 text-sm sm:grid-cols-2">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Ship To</p>
                  <p className="mt-1 font-medium">{fullName}</p>
                  <p className="text-muted-foreground">{address}, {city}, {zipCode}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Method</p>
                  <p className="mt-1 font-medium">{selectedShip?.name}</p>
                  <p className="text-muted-foreground">Arriving in {selectedShip?.time}</p>
                </div>
              </div>
            </div>

            <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
              We are packaging your flight gear. A tracking number will be sent to your registered email address as soon as the carrier collects the package.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button render={<Link href="/dashboard" />} nativeButton={false} className="h-12 rounded-full px-8 shadow-lg shadow-primary/25">
                Go to Dashboard
                <ArrowRight className="size-4" />
              </Button>
              <Button render={<Link href="/drones" />} nativeButton={false} variant="outline" className="h-12 rounded-full px-8">
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <PageHero
        breadcrumb="Checkout"
        title="Your Cart"
        description="Review your items and proceed to a secure checkout. Free shipping on all orders over $200."
        backgroundImage="/images/hero_cart.jpg"
      />

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Checkout Steps Navigation Indicator */}
          {cartItems.length > 0 && (
            <div className="mb-10 flex items-center justify-center gap-2 sm:gap-6 text-sm font-medium border-b border-border pb-6">
              <button
                onClick={() => setCheckoutStep('cart')}
                className={`flex items-center gap-2 transition-colors ${
                  checkoutStep === 'cart' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span className={`flex size-6 items-center justify-center rounded-full text-xs border ${
                  checkoutStep === 'cart' ? 'border-primary bg-primary text-primary-foreground' : 'border-border'
                }`}>1</span>
                Shopping Cart
              </button>
              <ChevronRight className="size-4 text-muted-foreground" />
              <button
                disabled={!isLoggedIn}
                onClick={() => setCheckoutStep('checkout')}
                className={`flex items-center gap-2 transition-colors ${
                  checkoutStep === 'checkout' ? 'text-primary' : 'text-muted-foreground hover:text-foreground disabled:opacity-50'
                }`}
              >
                <span className={`flex size-6 items-center justify-center rounded-full text-xs border ${
                  checkoutStep === 'checkout' ? 'border-primary bg-primary text-primary-foreground' : 'border-border'
                }`}>2</span>
                Shipping & Payment
              </button>
            </div>
          )}

          {cartItems.length === 0 ? (
            /* Upgraded Empty State with Curated Recommendations */
            <div className="space-y-16">
              <div className="text-center py-16 rounded-[2.5rem] border border-border bg-card max-w-3xl mx-auto shadow-sm">
                <ShoppingBag className="size-16 text-primary/30 mx-auto mb-4" />
                <h2 className="font-display text-2xl font-bold tracking-tight">Your Cart is Empty</h2>
                <p className="text-muted-foreground mt-2 text-sm max-w-sm mx-auto">
                  Add premium camera drones, industrial mapping suites, or FPV racers to configure your checkout.
                </p>
                <Button render={<Link href="/drones" />} nativeButton={false} className="mt-8 rounded-full px-8 h-12 shadow-lg shadow-primary/25">
                  Browse Fleet Catalogue
                  <ArrowRight className="size-4" />
                </Button>
              </div>

              {/* Recommendations Carousel */}
              <div className="max-w-5xl mx-auto">
                <h3 className="font-display text-xl font-bold text-center mb-8">Popular Additions for Your Fleet</h3>
                <div className="grid gap-6 sm:grid-cols-3">
                  {products.slice(0, 3).map((p) => (
                    <div key={p.slug} className="group rounded-3xl border border-border bg-card p-5 flex flex-col justify-between hover:shadow-lg transition-all duration-300">
                      <div>
                        <div className="relative aspect-video rounded-2xl overflow-hidden bg-peach mb-4 flex items-center justify-center p-4">
                          <Image src={p.image} alt={p.name} width={160} height={120} className="object-contain" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{p.category}</span>
                        <h4 className="font-display font-semibold text-sm mt-1 leading-snug">{p.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{p.tagline}</p>
                      </div>
                      <div className="mt-5 pt-3 border-t border-border flex items-center justify-between">
                        <span className="font-display font-bold text-sm">${p.price.toLocaleString()}</span>
                        <button
                          onClick={() => handleRecommendAdd(p)}
                          className="rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground px-3.5 py-1.5 text-xs font-bold transition-all"
                        >
                          + Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Cart Grid layout */
            <div className="grid gap-8 lg:grid-cols-[1fr_380px] items-start">
              
              {/* Left Column: Cart list OR Checkout Form */}
              <div className="space-y-6">
                
                {checkoutStep === 'cart' ? (
                  /* STEP 1: Shopping Cart Review */
                  <div className="space-y-4">
                    <div className="rounded-[2rem] border border-border bg-card overflow-hidden">
                      <div className="hidden grid-cols-[1fr_auto_auto_auto] gap-4 bg-muted px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground sm:grid">
                        <span>Items In Fleet</span>
                        <span className="text-center w-24">Qty</span>
                        <span className="text-center w-28">Total Price</span>
                        <span className="text-right w-12">Action</span>
                      </div>

                      <div className="divide-y divide-border">
                        {cartItems.map(({ product, qty }) => (
                          <div key={product.slug} className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-[1fr_auto_auto_auto] sm:items-center">
                            {/* Product Info */}
                            <div className="flex items-center gap-4">
                              <div className="relative size-16 shrink-0 rounded-2xl bg-peach flex items-center justify-center p-2">
                                <Image src={product.image} alt={product.name} fill className="object-contain p-1" />
                              </div>
                              <div>
                                <Link href={`/drones/${product.slug}`} className="font-display font-semibold text-foreground hover:text-primary transition-colors">
                                  {product.name}
                                </Link>
                                <p className="text-xs text-muted-foreground mt-0.5">{product.tagline}</p>
                                <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-cream px-2 py-0.5 text-[10px] font-semibold text-primary">
                                  {product.category}
                                </span>
                              </div>
                            </div>

                            {/* Qty incrementors */}
                            <div className="flex items-center justify-center gap-2.5 w-24 mx-auto">
                              <button
                                onClick={() => updateQty(product.slug, -1)}
                                className="flex size-7 items-center justify-center rounded-full border border-border text-sm font-bold hover:border-primary hover:text-primary transition-colors"
                              >
                                −
                              </button>
                              <span className="w-5 text-center text-sm font-semibold">{qty}</span>
                              <button
                                onClick={() => updateQty(product.slug, 1)}
                                className="flex size-7 items-center justify-center rounded-full border border-border text-sm font-bold hover:border-primary hover:text-primary transition-colors"
                              >
                                +
                              </button>
                            </div>

                            {/* Price details */}
                            <div className="text-center w-28 mx-auto">
                              <p className="font-display font-bold text-foreground">
                                {formatPrice(product.price * qty)}
                              </p>
                              {qty > 1 && (
                                <p className="text-[10px] text-muted-foreground">{formatPrice(product.price)} each</p>
                              )}
                            </div>

                            {/* Remove button */}
                            <div className="flex justify-end w-12 ml-auto">
                              <button
                                onClick={() => removeItem(product.slug)}
                                className="flex size-8 items-center justify-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                              >
                                <Trash2 className="size-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shipping Method Selector */}
                    <div className="rounded-[2rem] border border-border bg-card p-6">
                      <h3 className="font-display font-semibold text-base mb-4 flex items-center gap-2">
                        <Truck className="size-5 text-primary" />
                        Select Shipping Speed
                      </h3>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {shippingMethods.map((m) => (
                          <label
                            key={m.id}
                            className={`relative flex cursor-pointer justify-between rounded-2xl border p-4 transition-all ${
                              shippingMethod === m.id
                                ? 'border-primary bg-primary/5 shadow-sm'
                                : 'border-border hover:border-primary/20'
                            }`}
                          >
                            <input
                              type="radio"
                              name="shippingMethod"
                              value={m.id}
                              checked={shippingMethod === m.id}
                              onChange={(e) => setShippingMethod(e.target.value)}
                              className="sr-only"
                            />
                            <div>
                              <p className="font-semibold text-sm">{m.name}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">{m.time}</p>
                            </div>
                            <span className="font-display text-sm font-bold">
                              {m.price === 0 ? 'Free' : formatPrice(m.price)}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* STEP 2: Checkout Form details */
                  <form onSubmit={handlePlaceOrder} className="space-y-6">
                    {/* Shipping Details */}
                    <div className="rounded-[2rem] border border-border bg-card p-6 sm:p-8 space-y-4">
                      <h3 className="font-display font-semibold text-lg flex items-center gap-2 border-b border-border pb-3">
                        <MapPin className="size-5 text-primary" />
                        Shipping Address
                      </h3>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                          <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Full Name</label>
                          <input
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="h-11 w-full rounded-full border border-border bg-background px-4 text-sm outline-none transition focus:border-primary"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Street Address</label>
                          <input
                            type="text"
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="h-11 w-full rounded-full border border-border bg-background px-4 text-sm outline-none transition focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">City</label>
                          <input
                            type="text"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="h-11 w-full rounded-full border border-border bg-background px-4 text-sm outline-none transition focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Zip Code</label>
                          <input
                            type="text"
                            required
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            className="h-11 w-full rounded-full border border-border bg-background px-4 text-sm outline-none transition focus:border-primary"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone Number</label>
                          <input
                            type="text"
                            required
                            placeholder="+91 98765 43210"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="h-11 w-full rounded-full border border-border bg-background px-4 text-sm outline-none transition focus:border-primary"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Payment Details */}
                    <div className="rounded-[2rem] border border-border bg-card p-6 sm:p-8 space-y-4">
                      <h3 className="font-display font-semibold text-lg flex items-center gap-2 border-b border-border pb-3">
                        <CreditCard className="size-5 text-primary" />
                        Secure Payment Info
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Card Number</label>
                          <input
                            type="text"
                            required
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="h-11 w-full rounded-full border border-border bg-background px-4 text-sm outline-none transition focus:border-primary"
                          />
                        </div>
                        <div className="grid gap-4 grid-cols-2">
                          <div>
                            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Expiry Date</label>
                            <input
                              type="text"
                              required
                              placeholder="MM/YY"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              className="h-11 w-full rounded-full border border-border bg-background px-4 text-sm outline-none transition focus:border-primary"
                            />
                          </div>
                          <div>
                            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">CVC / CVV</label>
                            <input
                              type="text"
                              required
                              value={cardCvc}
                              onChange={(e) => setCardCvc(e.target.value)}
                              className="h-11 w-full rounded-full border border-border bg-background px-4 text-sm outline-none transition focus:border-primary"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Submit Section button */}
                    <div className="flex items-center gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setCheckoutStep('cart')}
                        className="h-12 rounded-full px-6"
                      >
                        Back to Cart
                      </Button>
                      <Button
                        type="submit"
                        className="h-12 flex-1 rounded-full text-base shadow-lg shadow-primary/25"
                      >
                        Place Order ({formatPrice(total)})
                        <ArrowRight className="size-4" />
                      </Button>
                    </div>
                  </form>
                )}
              </div>

              {/* Right Column: Sticky Summary & Trust signals */}
              <div className="sticky top-24 space-y-4">
                <div className="rounded-[2rem] border border-border bg-card p-6">
                  <h3 className="font-display font-semibold text-lg border-b border-border pb-3">Checkout Summary</h3>

                  <div className="mt-4 space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
                      <span className="font-medium">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping fee</span>
                      <span className={`font-medium ${shippingFee === 0 ? 'text-success' : ''}`}>
                        {shippingFee === 0 ? 'Free' : formatPrice(shippingFee)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Estimated sales tax</span>
                      <span className="font-medium">{formatPrice(tax)}</span>
                    </div>
                    <div className="border-t border-border pt-3">
                      <div className="flex justify-between">
                        <span className="font-semibold">Grand Total</span>
                        <span className="font-display text-lg font-bold text-primary">{formatPrice(total)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Promo code */}
                  <div className="mt-5 flex gap-2">
                    <input
                      placeholder="Promo code"
                      className="h-10 flex-1 rounded-full border border-border bg-background px-4 text-sm outline-none transition focus:border-primary"
                    />
                    <button className="h-10 rounded-full border border-border bg-card px-4 text-sm font-medium transition hover:border-primary hover:text-primary">
                      Apply
                    </button>
                  </div>

                  {/* Dynamic action trigger depending on step */}
                  {checkoutStep === 'cart' && (
                    <Button
                      onClick={handleCheckoutClick}
                      className="mt-6 h-12 w-full rounded-full text-base shadow-lg shadow-primary/25"
                    >
                      Proceed to Checkout
                      <ArrowRight className="size-4" />
                    </Button>
                  )}
                </div>

                {/* Trust Seal details */}
                <div className="rounded-[2rem] border border-border bg-card p-5 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <Lock className="size-4 text-success" />
                    Secure Purchase Guarantees
                  </div>
                  <div className="space-y-3.5">
                    {perks.map((perk) => (
                      <div key={perk.label} className="flex items-start gap-2.5">
                        <perk.icon className="size-4 shrink-0 text-primary mt-0.5" />
                        <p className="text-xs text-muted-foreground leading-normal">{perk.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Secure payments strip */}
                <div className="text-center pt-2">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2">Accepted Payment Methods</p>
                  <div className="flex items-center justify-center gap-3 opacity-60">
                    <span className="px-2 py-1 rounded bg-muted text-[10px] font-bold border border-border">VISA</span>
                    <span className="px-2 py-1 rounded bg-muted text-[10px] font-bold border border-border">MC</span>
                    <span className="px-2 py-1 rounded bg-muted text-[10px] font-bold border border-border">APPLE PAY</span>
                    <span className="px-2 py-1 rounded bg-muted text-[10px] font-bold border border-border">PAYPAL</span>
                  </div>
                </div>

              </div>

            </div>
          )}
        </div>
      </section>
    </>
  )
}
