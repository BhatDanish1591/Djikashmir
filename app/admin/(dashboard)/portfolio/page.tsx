import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Trash2, Edit2, X } from 'lucide-react'
import { savePortfolio, deletePortfolio } from '../actions'
import Image from 'next/image'
import Link from 'next/link'

export default async function AdminPortfolioPage(
  props: { searchParams: Promise<{ edit?: string }> }
) {
  const searchParams = await props.searchParams
  const editId = searchParams?.edit

  const dbPortfolio = await prisma.portfolio.findMany({
    orderBy: { createdAt: 'desc' }
  })

  const editPortfolio = editId ? dbPortfolio.find(p => p.id === editId) : null

  return (
    <div className="p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="font-display text-4xl font-bold tracking-tight">Manage Portfolio</h1>
        <p className="text-muted-foreground mt-2 text-lg">Showcase your best aerial photography and cinematography.</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_400px] gap-10 items-start">
        {/* Existing Portfolio */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">Gallery Items</h2>
          {dbPortfolio.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md">
              <p className="text-muted-foreground">No portfolio items found in the database.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {dbPortfolio.map((p) => (
                <div key={p.id} className="group relative overflow-hidden bg-card/50 backdrop-blur-xl p-5 rounded-3xl border border-white/10 transition-all duration-300 hover:shadow-xl hover:bg-card hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10 flex gap-4 items-center">
                    <div className="relative h-20 w-20 rounded-2xl overflow-hidden shrink-0 shadow-md">
                      <Image src={p.image} alt={p.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center pr-16">
                      <h3 className="font-semibold text-foreground line-clamp-1">{p.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-medium">{p.category}</p>
                    </div>
                  </div>
                  
                  <div className="absolute top-4 right-4 z-20 flex gap-1">
                    <Link href={`/admin/portfolio?edit=${p.id}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground hover:bg-primary/20 hover:text-primary transition-colors duration-300">
                        <Edit2 className="size-4" />
                      </Button>
                    </Link>
                    <form action={async () => {
                      'use server'
                      await deletePortfolio(p.id)
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
            <h2 className="text-2xl font-semibold tracking-tight">{editPortfolio ? 'Edit Shot' : 'Add New Shot'}</h2>
            {editPortfolio && (
              <Link href="/admin/portfolio">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <X className="size-4" />
                </Button>
              </Link>
            )}
          </div>
          <form action={savePortfolio} className="space-y-5">
            {editPortfolio && <input type="hidden" name="id" value={editPortfolio.id} />}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Title</label>
              <input type="text" name="title" defaultValue={editPortfolio?.title} required className="w-full rounded-xl border border-white/10 bg-background/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="Sunset over Downtown" />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Category</label>
              <input type="text" name="category" defaultValue={editPortfolio?.category} required className="w-full rounded-xl border border-white/10 bg-background/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="Real Estate" />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Image File</label>
              <input type="hidden" name="existingImage" value={editPortfolio?.image || ''} />
              <input type="file" name="imageFile" accept="image/*" className="w-full rounded-xl border border-white/10 bg-background/50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
              {editPortfolio?.image && <p className="text-xs text-muted-foreground mt-1">Current image: {editPortfolio.image.split('/').pop()}</p>}
            </div>

            <Button type="submit" className="w-full rounded-xl h-12 text-base font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/25 transition-all duration-300 mt-4">
              {editPortfolio ? 'Update Portfolio Item' : 'Add to Portfolio'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
