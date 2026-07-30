import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { updateHero } from '../actions'

export default async function AdminHeroPage() {
  const heroData = await prisma.hero.findFirst()

  return (
    <div className="p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl mx-auto">
      <div className="mb-10 text-center">
        <h1 className="font-display text-4xl font-bold tracking-tight">Hero Section</h1>
        <p className="text-muted-foreground mt-2 text-lg">Update the main landing page headline and background video.</p>
      </div>

      <div className="bg-card/80 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl">
        <form action={updateHero} className="space-y-6">
          <input type="hidden" name="id" value={heroData?.id || ''} />
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Main Headline</label>
            <input 
              type="text" 
              name="title" 
              defaultValue={heroData?.title} 
              required 
              className="w-full rounded-2xl border border-white/10 bg-background/50 px-5 py-4 text-xl font-display font-bold focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:font-normal" 
              placeholder="Elevating the way you see the world" 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Sub Headline / Description</label>
            <textarea 
              name="description" 
              defaultValue={heroData?.subtitle} 
              required 
              rows={3}
              className="w-full rounded-2xl border border-white/10 bg-background/50 px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none" 
              placeholder="Premium drones, expert repairs..." 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Background Video File (MP4)</label>
            <div className="flex gap-4 items-center">
              <input type="hidden" name="existingVideoUrl" value={heroData?.videoUrl || ''} />
              <input 
                type="file" 
                name="video" 
                accept="video/mp4"
                className="flex-1 rounded-2xl border border-white/10 bg-background/50 px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-mono file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" 
              />
              {heroData?.videoUrl && (
                <div className="h-14 w-24 relative rounded-xl overflow-hidden shrink-0 border border-white/10 shadow-md">
                  <video src={heroData.videoUrl} className="object-cover w-full h-full" muted playsInline />
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-2">Upload a high-quality .mp4 file. Keep it under 20MB for best performance.</p>
          </div>
          
          <div className="pt-4">
            <Button type="submit" className="w-full rounded-2xl h-14 text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-xl shadow-primary/25 transition-all duration-300 hover:-translate-y-1">
              Save Hero Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
