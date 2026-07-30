import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    // Find the admin
    const admin = await prisma.admin.findUnique({
      where: { username },
    })

    if (!admin) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      )
    }

    const isValid = await bcrypt.compare(password, admin.password)

    if (!isValid) {
      // Fallback for development if password is not hashed yet
      if (admin.password !== password) {
        return NextResponse.json(
          { error: 'Invalid username or password' },
          { status: 401 }
        )
      } else {
        // Auto-upgrade password to hash
        const hashed = await bcrypt.hash(password, 10)
        await prisma.admin.update({
          where: { id: admin.id },
          data: { password: hashed }
        })
      }
    }

    // Set a simple auth cookie (in production, use a signed JWT)
    const cookieStore = await cookies()
    cookieStore.set('admin_session', admin.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
