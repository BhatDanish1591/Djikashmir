import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { randomBytes } from 'crypto'

export async function saveFile(file: File, folder: string): Promise<string | null> {
  if (!file || file.size === 0) return null

  try {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Generate unique filename
    const ext = path.extname(file.name) || (file.type.includes('video') ? '.mp4' : '.jpg')
    const hash = randomBytes(8).toString('hex')
    const filename = `${Date.now()}-${hash}${ext}`

    // Ensure uploads directory exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder)
    await mkdir(uploadDir, { recursive: true })

    // Save file
    const filepath = path.join(uploadDir, filename)
    await writeFile(filepath, buffer)

    // Return public URL path
    return `/uploads/${folder}/${filename}`
  } catch (error) {
    console.error('Error saving file:', error)
    return null
  }
}
