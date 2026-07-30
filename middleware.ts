import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if we're trying to access the admin area
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const hasSession = request.cookies.has('admin_session')
    const isLoginPage = request.nextUrl.pathname === '/admin/login'

    if (hasSession && isLoginPage) {
      // Already logged in, redirect away from login page
      return NextResponse.redirect(new URL('/admin', request.url))
    }

    if (!hasSession && !isLoginPage) {
      // Redirect to login if no session, keeping the intended URL
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('next', request.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

// Configure the middleware to only run on admin routes
export const config = {
  matcher: '/admin/:path*',
}
