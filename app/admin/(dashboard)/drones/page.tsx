import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Trash2, Edit2, X } from 'lucide-react'
import { saveDrone, deleteDrone } from '../actions'
import Image from 'next/image'
import Link from 'next/link'

export default async function AdminDronesPage(
  props: { searchParams: Promise<{ edit?: string }> }
) {
  const searchParams = await props.searchParams
  const editId = searchParams?.edit

  const dbDrones = await prisma.drone.findMany({
    orderBy: { createdAt: 'desc' }
  })

  const editDrone = editId ? dbDrones.find(d => d.id === editId) : null

  return (
    <div className="p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="font-display text-4xl font-bold tracking-tight">Manage Drones</h1>
        <p className="text-muted-foreground mt-2 text-lg">Add new inventory, update pricing, or remove old models.</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_400px] gap-10 items-start">
        {/* Existing Drones */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">Active Inventory</h2>
          {dbDrones.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md">
              <p className="text-muted-foreground">No drones found in the database.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {dbDrones.map((d) => (
                <div key={d.id} className="group relative overflow-hidden bg-card/50 backdrop-blur-xl p-5 rounded-3xl border border-white/10 transition-all duration-300 hover:shadow-xl hover:bg-card hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10 flex gap-4">
                    <div className="relative h-20 w-20 rounded-2xl overflow-hidden shrink-0 bg-gradient-to-br from-muted/50 to-muted/20 border border-white/5">
                      <Image src={d.image} alt={d.name} fill className="object-contain p-2" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center pr-16">
                      <h3 className="font-semibold text-foreground line-clamp-1">{d.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{d.category} • {d.brand}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="font-bold text-sm">₹{d.price}</span>
                        <span className={`text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full ${d.inStock ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                          {d.inStock ? 'In Stock' : 'Sold Out'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute top-4 right-4 z-20 flex gap-1">
                    <Link href={`/admin/drones?edit=${d.id}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground hover:bg-primary/20 hover:text-primary transition-colors duration-300">
                        <Edit2 className="size-4" />
                      </Button>
                    </Link>
                    <form action={async () => {
                      'use server'
                      await deleteDrone(d.id)
                    }}>
                      <Button variant="ghost" size="icon" type="submit" className="h-8 w-8 rounded-full text-muted-foreground hover:bg-red-500 hover:text-white transition-colors duration-300">
                        <Trash2 className="size-4" />
                      </Button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Form */}
        <div className="bg-card/80 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl sticky top-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold tracking-tight">{editDrone ? 'Edit Drone' : 'Add New Drone'}</h2>
            {editDrone && (
              <Link href="/admin/drones">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <X className="size-4" />
                </Button>
              </Link>
            )}
          </div>
          <form action={saveDrone} className="space-y-5">
            {editDrone && <input type="hidden" name="id" value={editDrone.id} />}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Name</label>
              <input type="text" name="name" defaultValue={editDrone?.name} required className="w-full rounded-xl border border-white/10 bg-background/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="DJI Mavic 3 Pro" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Slug</label>
                <input type="text" name="slug" defaultValue={editDrone?.slug} required className="w-full rounded-xl border border-white/10 bg-background/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="dji-mavic-3-pro" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Brand</label>
                <input type="text" name="brand" defaultValue={editDrone?.brand} required className="w-full rounded-xl border border-white/10 bg-background/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="DJI" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tagline</label>
              <input type="text" name="tagline" defaultValue={editDrone?.tagline} required className="w-full rounded-xl border border-white/10 bg-background/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="Imaging Above Everything" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Price (₹)</label>
                <input type="number" name="price" defaultValue={editDrone?.price} required className="w-full rounded-xl border border-white/10 bg-background/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="289000" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Old Price</label>
                <input type="number" name="oldPrice" defaultValue={editDrone?.oldPrice || ''} className="w-full rounded-xl border border-white/10 bg-background/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="310000" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Category</label>
              <input type="text" name="category" defaultValue={editDrone?.category} required className="w-full rounded-xl border border-white/10 bg-background/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="Professional" />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Image File</label>
              <input type="hidden" name="existingImage" value={editDrone?.image || ''} />
              <input type="file" name="imageFile" accept="image/*" className="w-full rounded-xl border border-white/10 bg-background/50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
              {editDrone?.image && <p className="text-xs text-muted-foreground mt-1">Current image: {editDrone.image.split('/').pop()}</p>}
            </div>

            <div className="flex items-center gap-3 pt-2 pb-4">
              <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <input type="checkbox" name="inStock" id="inStock" defaultChecked={editDrone ? editDrone.inStock : true} className="h-5 w-5 rounded-md border-white/20 bg-background/50 text-primary focus:ring-primary/50 transition-all" />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label htmlFor="inStock" className="font-medium text-foreground">Available in stock</label>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full rounded-xl h-12 text-base font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/25 transition-all duration-300">
              {editDrone ? 'Update Drone' : 'Publish Drone'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
