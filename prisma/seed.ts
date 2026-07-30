import { PrismaClient } from '../lib/generated/prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'

import { products, services, portfolio } from '../lib/data'

const adapter = new PrismaBetterSqlite3({ url: 'file:./dev.db' })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Start seeding...')

  // Seed Drones (products)
  for (const drone of products) {
    await prisma.drone.upsert({
      where: { slug: drone.slug },
      update: {},
      create: {
        slug: drone.slug,
        name: drone.name,
        category: drone.category,
        brand: drone.brand,
        price: drone.price,
        oldPrice: drone.oldPrice ?? null,
        rating: drone.rating,
        reviews: drone.reviews,
        inStock: drone.inStock,
        image: drone.image,
        tagline: drone.tagline,
        badge: drone.badge ?? null,
        features: JSON.stringify(drone.features),
        specs: JSON.stringify(drone.specs),
      },
    })
  }
  console.log('Seeded Drones')

  // Seed Services
  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: {
        slug: service.slug,
        title: service.title,
        desc: service.desc,
        image: service.image,
        video: service.video,
      },
    })
  }
  console.log('Seeded Services')

  // Seed Portfolio
  for (const item of portfolio) {
    await prisma.portfolio.create({
      data: {
        title: item.title,
        category: item.category,
        image: item.image,
      },
    })
  }
  console.log('Seeded Portfolio')

  // Seed Hero
  await prisma.hero.create({
    data: {
      title: 'Cinematic precision',
      subtitle: 'From sub-250g travelers to heavy-lift cinema rigs, Skyloom equips creators with the tools to capture the extraordinary.',
      videoUrl: 'https://assets.mixkit.co/videos/4998/4998-360.mp4',
      posterImage: '/images/hero_services.jpg',
    },
  })
  console.log('Seeded Hero')

  // Seed Admin (password: 'admin123')
  const bcrypt = require('bcryptjs')
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
    },
  })
  console.log('Seeded Admin')

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
