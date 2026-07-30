export type Product = {
  slug: string
  name: string
  category: string
  brand: string
  price: number
  oldPrice?: number
  rating: number
  reviews: number
  inStock: boolean
  image: string
  tagline: string
  badge?: string
  specs: { label: string; value: string }[]
  features: string[]
}

export const products: Product[] = [
  {
    slug: 'skyloom-aero-pro',
    name: 'Skyloom Aero Pro',
    category: 'Professional',
    brand: 'DJI',
    price: 2499,
    oldPrice: 2799,
    rating: 4.9,
    reviews: 312,
    inStock: true,
    image: '/images/drone-pro.png',
    tagline: 'Cinema-grade 8K aerial cinematography',
    badge: 'Best Seller',
    specs: [
      { label: 'Camera', value: '8K / 60fps' },
      { label: 'Flight Time', value: '46 min' },
      { label: 'Range', value: '15 km' },
      { label: 'Weight', value: '895 g' },
    ],
    features: [
      'Triple-camera Hasselblad system',
      'Omnidirectional obstacle sensing',
      'ActiveTrack 6.0 subject tracking',
      'O4+ transmission with 1080p feed',
    ],
  },
  {
    slug: 'skyloom-air-mini',
    name: 'Skyloom Air Mini',
    category: 'Consumer',
    brand: 'DJI',
    price: 749,
    rating: 4.8,
    reviews: 528,
    inStock: true,
    image: '/images/drone-mini.png',
    tagline: 'Ultra-light travel companion under 249g',
    badge: 'New',
    specs: [
      { label: 'Camera', value: '4K / 100fps' },
      { label: 'Flight Time', value: '34 min' },
      { label: 'Range', value: '10 km' },
      { label: 'Weight', value: '249 g' },
    ],
    features: [
      'Foldable, pocket-sized design',
      'Vertical shooting for social',
      'QuickShots automated moves',
      'Tri-directional obstacle sensing',
    ],
  },
  {
    slug: 'skyloom-velocity-fpv',
    name: 'Skyloom Velocity FPV',
    category: 'FPV',
    brand: 'BETAFPV',
    price: 1099,
    rating: 4.7,
    reviews: 194,
    inStock: true,
    image: '/images/drone-fpv.png',
    tagline: 'Immersive first-person racing at 140 km/h',
    specs: [
      { label: 'Camera', value: '4K / 120fps' },
      { label: 'Flight Time', value: '20 min' },
      { label: 'Top Speed', value: '140 km/h' },
      { label: 'Weight', value: '795 g' },
    ],
    features: [
      'Immersive goggles with low latency',
      'Motion controller support',
      'Emergency brake and hover',
      'RockSteady stabilization',
    ],
  },
  {
    slug: 'skyloom-agri-x6',
    name: 'Skyloom Agri X6',
    category: 'Agriculture',
    brand: 'Autel',
    price: 8999,
    rating: 4.9,
    reviews: 87,
    inStock: true,
    image: '/images/drone-agri.png',
    tagline: 'Precision spraying across 40 acres per hour',
    badge: 'Pro',
    specs: [
      { label: 'Tank', value: '40 L' },
      { label: 'Coverage', value: '40 ac/hr' },
      { label: 'Rotors', value: '6' },
      { label: 'Radar', value: 'Omni 4D' },
    ],
    features: [
      'Active phased-array radar',
      'Centimeter-level RTK positioning',
      'Dual atomizing spray nozzles',
      'Terrain-following flight',
    ],
  },
  {
    slug: 'skyloom-survey-s5',
    name: 'Skyloom Survey S5',
    category: 'Survey',
    brand: 'Autel',
    price: 5499,
    rating: 4.8,
    reviews: 63,
    inStock: true,
    image: '/images/drone-pro.png',
    tagline: 'Mapping and surveying with RTK precision',
    specs: [
      { label: 'Camera', value: '20 MP RTK' },
      { label: 'Flight Time', value: '43 min' },
      { label: 'Accuracy', value: '1 cm' },
      { label: 'Weight', value: '1350 g' },
    ],
    features: [
      'Mechanical shutter for mapping',
      'RTK & PPK workflows',
      'Smart oblique capture',
      'Cloud photogrammetry ready',
    ],
  },
  {
    slug: 'skyloom-nova-2',
    name: 'Skyloom Nova 2',
    category: 'Consumer',
    brand: 'Potensic',
    price: 429,
    oldPrice: 499,
    rating: 4.6,
    reviews: 741,
    inStock: true,
    image: '/images/drone-mini.png',
    tagline: 'Your first serious camera drone',
    specs: [
      { label: 'Camera', value: '4K / 30fps' },
      { label: 'Flight Time', value: '31 min' },
      { label: 'Range', value: '6 km' },
      { label: 'Weight', value: '245 g' },
    ],
    features: [
      'GPS return-to-home',
      'Beginner-friendly controls',
      'Two batteries included',
      'Wind resistance level 5',
    ],
  },
  {
    slug: 'skyloom-raptor-fpv',
    name: 'Skyloom Raptor FPV',
    category: 'FPV',
    brand: 'BETAFPV',
    price: 1399,
    rating: 4.8,
    reviews: 122,
    inStock: false,
    image: '/images/drone-fpv.png',
    tagline: 'Freestyle cinematic FPV powerhouse',
    specs: [
      { label: 'Camera', value: '4K / 60fps' },
      { label: 'Flight Time', value: '18 min' },
      { label: 'Top Speed', value: '160 km/h' },
      { label: 'Weight', value: '820 g' },
    ],
    features: [
      'Analog + digital HD modes',
      'Swappable prop guards',
      'GPS rescue mode',
      'Carbon-fiber airframe',
    ],
  },
  {
    slug: 'skyloom-titan-heavy',
    name: 'Skyloom Titan Heavy',
    category: 'Professional',
    brand: 'Parrot',
    price: 12999,
    rating: 5.0,
    reviews: 41,
    inStock: true,
    image: '/images/drone-pro.png',
    tagline: 'Heavy-lift platform for industrial payloads',
    badge: 'Pro',
    specs: [
      { label: 'Payload', value: '10 kg' },
      { label: 'Flight Time', value: '55 min' },
      { label: 'Range', value: '20 km' },
      { label: 'IP Rating', value: 'IP55' },
    ],
    features: [
      'Interchangeable payload mounts',
      'Redundant flight controllers',
      'Thermal & zoom camera options',
      'Weatherproof airframe',
    ],
  },
]

export const categories = [
  'Consumer',
  'Professional',
  'FPV',
  'Agriculture',
  'Survey',
  'Accessories',
]

export const homeFeatures = [
  { title: 'Genuine Products', desc: '100% authentic, manufacturer-sealed drones and parts.' },
  { title: 'Expert Technicians', desc: 'Certified engineers with 5+ years of repair experience.' },
  { title: 'Fast Delivery', desc: 'Free next-day shipping on eligible orders nationwide.' },
  { title: 'Warranty Support', desc: 'Up to 3-year extended coverage on every drone.' },
  { title: '24/7 Support', desc: 'Real humans ready to help, any time of day.' },
]

export const services = [
  {
    slug: 'wedding',
    title: 'Wedding Shoots',
    desc: 'Cinematic aerial coverage that turns your day into a film.',
    image: '/images/service-wedding.jpg',
    video: 'https://assets.mixkit.co/videos/4998/4998-360.mp4',
  },
  {
    slug: 'events',
    title: 'Event Coverage',
    desc: 'Sweeping crowd shots and reveals for events of any scale.',
    image: '/images/service-events.jpg',
    video: 'https://assets.mixkit.co/videos/581/581-360.mp4',
  },
  {
    slug: 'real-estate',
    title: 'Real Estate',
    desc: 'Showcase properties with striking aerial perspectives.',
    image: '/images/service-real-estate.jpg',
    video: 'https://assets.mixkit.co/videos/2788/2788-360.mp4',
  },
  {
    slug: 'survey',
    title: 'Survey & Mapping',
    desc: 'Centimeter-accurate orthomosaics and 3D terrain models.',
    image: '/images/service-survey.jpg',
    video: 'https://assets.mixkit.co/videos/2789/2789-360.mp4',
  },
  {
    slug: 'inspection',
    title: 'Industrial Inspection',
    desc: 'Safe, detailed inspection of towers, roofs, and turbines.',
    image: '/images/service-industrial.jpg',
    video: 'https://assets.mixkit.co/videos/16125/16125-360.mp4',
  },
  {
    slug: 'agriculture',
    title: 'Agriculture',
    desc: 'Crop health mapping and precision spraying at scale.',
    image: '/images/service-agriculture.jpg',
    video: 'https://assets.mixkit.co/active_storage/video_items/100416/1724198612/100416-video-360.mp4',
  },
]

export const stats = [
  { value: '5+', label: 'Years Experience' },
  { value: '2500+', label: 'Happy Clients' },
  { value: '3000+', label: 'Projects Delivered' },
  { value: '25+', label: 'Expert Pilots' },
  { value: '24/7', label: 'Support' },
]

export const testimonials = [
  {
    name: 'pratik k',
    role: 'Local Guide',
    quote:
      'We had our dji drone repaired here today and the servuce was first class. Very knowledgeable, skilled and also showed us a demo of the flight later. I highly recommend them.',
    rating: 5,
  },
  {
    name: 'SARAF KHAN SK',
    role: 'Local Guide',
    quote: '🙌🏻',
    rating: 5,
  },
  {
    name: 'Mir Zahid',
    role: 'Customer',
    quote: 'Excellent service.',
    rating: 5,
  },
]

export const brands = ['DJI', 'Autel', 'Holy Stone', 'Potensic', 'Parrot', 'BETAFPV']

export const posts = [
  {
    slug: 'best-drones-2026',
    title: 'The Best Camera Drones to Buy in 2026',
    category: 'Buying Guide',
    excerpt: 'From pocket flyers to cinema rigs, here are the drones worth your money this year.',
    image: '/images/aerial-1.png',
    date: 'Jul 12, 2026',
  },
  {
    slug: 'golden-hour-tips',
    title: '7 Tips for Stunning Golden Hour Aerials',
    category: 'Photography Tips',
    excerpt: 'Master light, angles, and movement to make your sunset footage unforgettable.',
    image: '/images/aerial-2.png',
    date: 'Jun 28, 2026',
  },
  {
    slug: 'drone-maintenance',
    title: 'A Simple Maintenance Routine for a Longer Drone Life',
    category: 'Repair Tips',
    excerpt: 'Small habits that keep your motors, gimbal, and battery healthy for years.',
    image: '/images/repair.png',
    date: 'Jun 09, 2026',
  },
  {
    slug: 'new-drone-regulations',
    title: 'What the New Drone Regulations Mean for You',
    category: 'Regulations',
    excerpt: 'A plain-language breakdown of the latest airspace rules for pilots.',
    image: '/images/aerial-3.png',
    date: 'May 22, 2026',
  },
]

export const portfolio = [
  { title: 'Coastal Wedding Film', category: 'Wedding', image: '/images/aerial-1.png' },
  { title: 'Mountain Resort', category: 'Real Estate', image: '/images/aerial-2.png' },
  { title: 'Luxury Villa Tour', category: 'Real Estate', image: '/images/aerial-3.png' },
  { title: 'Vineyard Survey', category: 'Agriculture', image: '/images/aerial-1.png' },
  { title: 'Highway Interchange', category: 'Survey', image: '/images/aerial-2.png' },
  { title: 'Solar Farm Inspection', category: 'Industrial', image: '/images/aerial-3.png' },
  { title: 'City Skyline Reel', category: 'Films', image: '/images/aerial-2.png' },
  { title: 'Corporate Campus', category: 'Corporate', image: '/images/aerial-3.png' },
]

export const repairServices = [
  { name: 'Camera & Gimbal Repair', time: '3-5 business days', price: 'from ₹7,500', icon: 'Camera' },
  { name: 'Motor & Propulsion', time: '2-4 business days', price: 'from ₹5,500', icon: 'CircleDot' },
  { name: 'Battery Service', time: '1-2 business days', price: 'from ₹3,900', icon: 'Battery' },
  { name: 'Mainboard & ESC', time: '4-6 business days', price: 'from ₹9,900', icon: 'Cpu' },
  { name: 'Firmware Recovery', time: '1-3 business days', price: 'from ₹4,900', icon: 'Wrench' },
  { name: 'Water Damage Restoration', time: '5-7 business days', price: 'from ₹12,500', icon: 'PackageCheck' },
]

export const repairFaqs = [
  {
    q: 'How long does a typical repair take?',
    a: 'Most repairs are completed within 5 business days of receiving your drone. Battery and firmware services are often turned around in 1-3 days. You can track live status with your ticket number at any time.',
  },
  {
    q: 'Do you offer a warranty on repairs?',
    a: 'Yes. Every repair is backed by a 90-day workmanship warranty. If the same issue reappears within that window, we fix it free of charge.',
  },
  {
    q: 'Will you use genuine parts?',
    a: 'Always. We only install manufacturer-genuine or OEM-grade components, and we never substitute uncertified parts without your explicit approval.',
  },
  {
    q: 'What if my drone can’t be repaired?',
    a: 'Diagnosis is always free. If a repair is not economical, we’ll tell you upfront and can apply a credit toward a new Skyloom drone instead.',
  },
  {
    q: 'How do I send my drone in?',
    a: 'Book online and we’ll email you a prepaid shipping label. Pack your drone securely, drop it off, and we’ll take it from there.',
  },
]

export const repairSteps = [
  { step: '01', title: 'Book Online', desc: 'Tell us the issue and get an instant estimate.' },
  { step: '02', title: 'Free Diagnosis', desc: 'Our technicians inspect and confirm the quote.' },
  { step: '03', title: 'Expert Repair', desc: 'Genuine parts, precision work, tested twice.' },
  { step: '04', title: 'Fly Again', desc: 'We ship it back, calibrated and ready to fly.' },
]

export const team = [
  { name: 'Marcus Reid', role: 'Founder & Chief Pilot' },
  { name: 'Elena Voss', role: 'Head of Cinematography' },
  { name: 'Kofi Mensah', role: 'Lead Repair Engineer' },
  { name: 'Sara Lindqvist', role: 'Survey & Mapping Lead' },
]

export function formatPrice(n: number) {
  return `₹${n.toLocaleString('en-IN')}`
}
