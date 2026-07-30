import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Trash2, MessageSquare, Phone, Mail, Calendar, Info } from 'lucide-react'
import { deleteBooking, updateBookingStatus } from '../actions'

export default async function AdminBookingsPage() {
  const dbBookings = await prisma.booking.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="font-display text-4xl font-bold tracking-tight">CRM Bookings</h1>
        <p className="text-muted-foreground mt-2 text-lg">Manage repair requests, service quotes, and general inquiries.</p>
      </div>

      <div className="space-y-6">
        {dbBookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md">
            <p className="text-muted-foreground">No bookings found in the database.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {dbBookings.map((b) => (
              <div key={b.id} className="group relative overflow-hidden bg-card/50 backdrop-blur-xl p-6 rounded-3xl border border-white/10 transition-all duration-300 hover:shadow-xl hover:bg-card">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="relative z-10 flex flex-col md:flex-row gap-6 md:items-center">
                  
                  {/* Left Column - User Info */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <MessageSquare className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-foreground">{b.name}</h3>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground mt-0.5">
                          <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" /> {b.email}</span>
                          <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" /> {b.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Middle Column - Request Details */}
                  <div className="flex-1 bg-background/50 p-4 rounded-2xl border border-white/5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Type: {b.type}</span>
                      <span className="text-xs text-muted-foreground">{new Date(b.createdAt).toLocaleDateString()}</span>
                    </div>
                    {b.topic && <p className="font-medium text-sm flex items-center gap-2"><Info className="h-3.5 w-3.5 text-primary"/> {b.topic}</p>}
                    {b.date && <p className="text-sm flex items-center gap-2"><Calendar className="h-3.5 w-3.5 text-primary"/> Preferred Date: {b.date}</p>}
                    {b.details && <p className="text-sm text-muted-foreground mt-2 italic border-l-2 border-primary/20 pl-3">"{b.details}"</p>}
                  </div>

                  {/* Right Column - Actions */}
                  <div className="flex flex-row md:flex-col gap-3 justify-end items-end shrink-0 min-w-[140px]">
                    <form action={async () => {
                      'use server'
                      const nextStatus = b.status === 'pending' ? 'contacted' : b.status === 'contacted' ? 'resolved' : 'pending'
                      await updateBookingStatus(b.id, nextStatus)
                    }} className="w-full">
                      <Button variant={b.status === 'resolved' ? 'outline' : 'default'} className={`w-full rounded-xl transition-all ${
                        b.status === 'pending' ? 'bg-amber-500/20 text-amber-500 hover:bg-amber-500/30' : 
                        b.status === 'contacted' ? 'bg-blue-500/20 text-blue-500 hover:bg-blue-500/30' : 
                        'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                      }`}>
                        {b.status.toUpperCase()}
                      </Button>
                    </form>

                    <form action={async () => {
                      'use server'
                      await deleteBooking(b.id)
                    }} className="w-full">
                      <Button variant="ghost" type="submit" className="w-full rounded-xl text-muted-foreground hover:bg-red-500 hover:text-white transition-colors duration-300">
                        <Trash2 className="size-4 mr-2" /> Delete
                      </Button>
                    </form>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
