import { prisma } from '@/lib/prisma'
import { Plane, Layers, Image as ImageIcon, ArrowUpRight, MessageSquare } from 'lucide-react'

export default async function AdminDashboardPage() {
  const [dronesCount, servicesCount, portfolioCount, bookingsCount] = await Promise.all([
    prisma.drone.count(),
    prisma.service.count(),
    prisma.portfolio.count(),
    prisma.booking.count(),
  ])

  return (
    <div className="p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-10">
        <h1 className="font-display text-4xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-2 text-lg">Manage your Skyloom platform from one centralized hub.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Bookings" 
          value={bookingsCount} 
          icon={MessageSquare} 
          gradient="from-indigo-500/20 to-violet-500/20"
          iconColor="text-violet-500"
        />
        <StatCard 
          title="Total Drones" 
          value={dronesCount} 
          icon={Plane} 
          gradient="from-blue-500/20 to-cyan-500/20"
          iconColor="text-cyan-500"
        />
        <StatCard 
          title="Active Services" 
          value={servicesCount} 
          icon={Layers} 
          gradient="from-emerald-500/20 to-teal-500/20"
          iconColor="text-teal-500"
        />
        <StatCard 
          title="Portfolio Items" 
          value={portfolioCount} 
          icon={ImageIcon} 
          gradient="from-purple-500/20 to-pink-500/20"
          iconColor="text-pink-500"
        />
      </div>
    </div>
  )
}

function StatCard({ title, value, icon: Icon, gradient, iconColor }: any) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className={`absolute inset-0 bg-gradient-to-br opacity-50 transition-opacity duration-300 group-hover:opacity-100 ${gradient}`} />
      <div className="relative z-10 flex items-center justify-between mb-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 shadow-inner backdrop-blur-md ${iconColor}`}>
          <Icon className="h-6 w-6" />
        </div>
        <ArrowUpRight className="h-5 w-5 text-muted-foreground opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1" />
      </div>
      <div className="relative z-10">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <p className="mt-2 font-display text-4xl font-bold tracking-tight">{value}</p>
      </div>
    </div>
  )
}
