'use client'

import { useMemo, useState } from 'react'
import { Filter, X } from 'lucide-react'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { brands, categories } from '@/lib/data'
import { cn } from '@/lib/utils'
import type { Drone } from '@/lib/generated/prisma/client'

const priceRanges = [
  { label: 'Under ₹40,000', min: 0, max: 40000 },
  { label: '₹40,000 – ₹1,20,000', min: 40000, max: 120000 },
  { label: '₹1,20,000 – ₹4,00,000', min: 120000, max: 400000 },
  { label: 'Over ₹4,00,000', min: 400000, max: Infinity },
]

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
]

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-foreground/80 transition-colors hover:text-foreground">
      <span
        className={cn(
          'flex size-5 items-center justify-center rounded-md border transition-colors',
          checked ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card',
        )}
      >
        {checked && (
          <svg viewBox="0 0 12 12" className="size-3" fill="none">
            <path d="M2.5 6.5L5 9L9.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      {label}
    </label>
  )
}

export function DroneCatalog({ products }: { products: Drone[] }) {
  const [selectedCats, setSelectedCats] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedPrice, setSelectedPrice] = useState<string[]>([])
  const [inStockOnly, setInStockOnly] = useState(false)
  const [sort, setSort] = useState('featured')
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggle = (
    value: string,
    list: string[],
    setter: (v: string[]) => void,
  ) => {
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value])
  }

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (selectedCats.length && !selectedCats.includes(p.category)) return false
      if (selectedBrands.length && !selectedBrands.includes(p.brand)) return false
      if (inStockOnly && !p.inStock) return false
      if (selectedPrice.length) {
        const inRange = selectedPrice.some((label) => {
          const r = priceRanges.find((pr) => pr.label === label)
          return r && p.price >= r.min && p.price < r.max
        })
        if (!inRange) return false
      }
      return true
    })

    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating)
    return list
  }, [selectedCats, selectedBrands, selectedPrice, inStockOnly, sort])

  const clearAll = () => {
    setSelectedCats([])
    setSelectedBrands([])
    setSelectedPrice([])
    setInStockOnly(false)
  }

  const filterCount =
    selectedCats.length + selectedBrands.length + selectedPrice.length + (inStockOnly ? 1 : 0)

  const Sidebar = (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold">Filters</h3>
        {filterCount > 0 && (
          <button
            onClick={clearAll}
            className="text-sm font-medium text-primary hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      <FilterGroup title="Category">
        {categories.map((c) => (
          <Checkbox
            key={c}
            label={c}
            checked={selectedCats.includes(c)}
            onChange={() => toggle(c, selectedCats, setSelectedCats)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Brand">
        {brands.map((b) => (
          <Checkbox
            key={b}
            label={b}
            checked={selectedBrands.includes(b)}
            onChange={() => toggle(b, selectedBrands, setSelectedBrands)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Price">
        {priceRanges.map((r) => (
          <Checkbox
            key={r.label}
            label={r.label}
            checked={selectedPrice.includes(r.label)}
            onChange={() => toggle(r.label, selectedPrice, setSelectedPrice)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Availability">
        <Checkbox
          label="In stock only"
          checked={inStockOnly}
          onChange={() => setInStockOnly((v) => !v)}
        />
      </FilterGroup>
    </div>
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex gap-10">
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24 rounded-3xl border border-border bg-card p-6">{Sidebar}</div>
        </aside>

        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filtered.length}</span>{' '}
              drones
            </p>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setMobileOpen(true)}
                className="h-10 rounded-full border-border lg:hidden"
              >
                <Filter className="size-4" />
                Filters
                {filterCount > 0 && (
                  <span className="ml-1 flex size-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {filterCount}
                  </span>
                )}
              </Button>
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  aria-label="Sort products"
                  className="h-10 appearance-none rounded-full border border-border bg-card pl-4 pr-9 text-sm font-medium outline-none focus:border-primary"
                >
                  {sortOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {filtered.length ? (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          ) : (
            <div className="mt-16 rounded-3xl border border-dashed border-border py-20 text-center">
              <p className="font-display text-lg font-semibold">No drones match your filters</p>
              <p className="mt-1 text-sm text-muted-foreground">Try clearing some filters.</p>
              <Button onClick={clearAll} className="mt-5 rounded-full">
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-80 max-w-[85%] overflow-y-auto bg-background p-6">
            <div className="mb-6 flex items-center justify-between">
              <span className="font-display text-lg font-semibold">Filters</span>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close filters"
                className="flex size-9 items-center justify-center rounded-full hover:bg-muted"
              >
                <X className="size-5" />
              </button>
            </div>
            {Sidebar}
            <Button onClick={() => setMobileOpen(false)} className="mt-8 h-11 w-full rounded-full">
              Show {filtered.length} results
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </h4>
      <div className="space-y-2.5">{children}</div>
    </div>
  )
}
