'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function requireAuth() {
  const cookieStore = await cookies()
  if (!cookieStore.has('admin_session')) {
    throw new Error('Unauthorized')
  }
}

import { saveFile } from '@/lib/upload'

// -- HERO ACTIONS --

export async function updateHero(formData: FormData) {
  await requireAuth()
  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  
  const videoFile = formData.get('video') as File | null
  const existingVideoUrl = formData.get('existingVideoUrl') as string
  
  let videoUrl = existingVideoUrl
  if (videoFile && videoFile.size > 0) {
    const uploadedPath = await saveFile(videoFile, 'hero')
    if (uploadedPath) videoUrl = uploadedPath
  }

  if (id) {
    await prisma.hero.update({
      where: { id },
      data: { title, description, videoUrl },
    })
  } else {
    await prisma.hero.create({
      data: { title, description, videoUrl },
    })
  }

  revalidatePath('/')
  revalidatePath('/admin/hero')
}

// -- DRONE ACTIONS --

export async function deleteDrone(id: string) {
  await requireAuth()
  await prisma.drone.delete({ where: { id } })
  revalidatePath('/drones')
  revalidatePath('/')
  revalidatePath('/admin/drones')
}

export async function saveDrone(formData: FormData) {
  await requireAuth()
  const id = formData.get('id') as string | null
  
  const imageFile = formData.get('imageFile') as File | null
  const existingImage = formData.get('existingImage') as string
  
  let image = existingImage
  if (imageFile && imageFile.size > 0) {
    const uploadedPath = await saveFile(imageFile, 'drones')
    if (uploadedPath) image = uploadedPath
  }

  const data = {
    name: formData.get('name') as string,
    slug: formData.get('slug') as string,
    tagline: formData.get('tagline') as string,
    price: parseFloat(formData.get('price') as string),
    oldPrice: formData.get('oldPrice') ? parseFloat(formData.get('oldPrice') as string) : null,
    rating: parseFloat(formData.get('rating') as string) || 5,
    reviews: parseInt(formData.get('reviews') as string) || 0,
    badge: formData.get('badge') as string | null,
    inStock: formData.get('inStock') === 'on',
    image: image,
    category: formData.get('category') as string,
    brand: formData.get('brand') as string,
  }

  if (id) {
    await prisma.drone.update({ where: { id }, data })
  } else {
    await prisma.drone.create({ data })
  }

  revalidatePath('/drones')
  revalidatePath('/')
  revalidatePath('/admin/drones')
}

// -- SERVICE ACTIONS --

export async function deleteService(id: string) {
  await requireAuth()
  await prisma.service.delete({ where: { id } })
  revalidatePath('/services')
  revalidatePath('/admin/services')
}

export async function saveService(formData: FormData) {
  await requireAuth()
  const id = formData.get('id') as string | null
  
  const videoFile = formData.get('videoFile') as File | null
  const existingVideoUrl = formData.get('existingVideoUrl') as string
  
  let videoUrl = existingVideoUrl
  if (videoFile && videoFile.size > 0) {
    const uploadedPath = await saveFile(videoFile, 'services')
    if (uploadedPath) videoUrl = uploadedPath
  }

  const data = {
    title: formData.get('title') as string,
    videoUrl: videoUrl,
  }

  if (id) {
    await prisma.service.update({ where: { id }, data })
  } else {
    await prisma.service.create({ data })
  }

  revalidatePath('/services')
  revalidatePath('/admin/services')
}

// -- PORTFOLIO ACTIONS --

export async function deletePortfolio(id: string) {
  await requireAuth()
  await prisma.portfolio.delete({ where: { id } })
  revalidatePath('/portfolio')
  revalidatePath('/')
  revalidatePath('/admin/portfolio')
}

export async function savePortfolio(formData: FormData) {
  await requireAuth()
  const id = formData.get('id') as string | null
  
  const imageFile = formData.get('imageFile') as File | null
  const existingImage = formData.get('existingImage') as string
  
  let image = existingImage
  if (imageFile && imageFile.size > 0) {
    const uploadedPath = await saveFile(imageFile, 'portfolio')
    if (uploadedPath) image = uploadedPath
  }

  const data = {
    title: formData.get('title') as string,
    category: formData.get('category') as string,
    image: image,
  }

  if (id) {
    await prisma.portfolio.update({ where: { id }, data })
  } else {
    await prisma.portfolio.create({ data })
  }

  revalidatePath('/portfolio')
  revalidatePath('/')
  revalidatePath('/admin/portfolio')
}

// -- AUTH ACTIONS --

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_session')
  revalidatePath('/admin')
  redirect('/admin/login')
}

// -- BOOKING ACTIONS --

export async function deleteBooking(id: string) {
  await requireAuth()
  await prisma.booking.delete({ where: { id } })
  revalidatePath('/admin/bookings')
  revalidatePath('/admin')
}

export async function updateBookingStatus(id: string, status: string) {
  await requireAuth()
  await prisma.booking.update({
    where: { id },
    data: { status }
  })
  revalidatePath('/admin/bookings')
}
