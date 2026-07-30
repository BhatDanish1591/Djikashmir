import Link from 'next/link'
import { Plane, Layers, Image as ImageIcon, LayoutDashboard, LogOut } from 'lucide-react'

import { logout } from './actions'
import { AdminSidebar } from './admin-sidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-background text-foreground selection:bg-primary/30">
      <AdminSidebar logoutAction={logout} />

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-muted/20">
        <div className="mx-auto max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  )
}
