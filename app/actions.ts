'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function submitBooking(formData: FormData) {
  const type = formData.get('type') as string
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const date = formData.get('date') as string | null
  const topic = formData.get('topic') as string | null
  const details = formData.get('details') as string | null

  await prisma.booking.create({
    data: {
      type,
      name,
      email,
      phone,
      date: date || null,
      topic: topic || null,
      details: details || null,
    }
  })

  // We can revalidate the admin path so new bookings show up immediately
  revalidatePath('/admin/bookings')
}
