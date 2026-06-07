import type { VercelRequest, VercelResponse } from '@vercel/node'
import { db } from '../db/index.js'
import { sheets } from '../db/schema.js'
import { eq } from 'drizzle-orm'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers for local dev
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()

  if (req.method === 'GET') {
    const { id } = req.query
    if (id) {
      const [sheet] = await db.select().from(sheets).where(eq(sheets.id, parseInt(id as string)))
      if (!sheet) return res.status(404).json({ error: 'Not Found' })
      return res.status(200).json(sheet)
    }
    const allSheets = await db
      .select({
        id: sheets.id,
        name: sheets.name,
        rowCount: sheets.rowCount,
        createdBy: sheets.createdBy,
        createdAt: sheets.createdAt,
      })
      .from(sheets)
      .orderBy(sheets.createdAt)
    return res.status(200).json(allSheets)
  }

  if (req.method === 'POST') {
    const { name, csvData, createdBy, rowCount } = req.body
    if (!name || !csvData || !createdBy) return res.status(400).json({ error: 'Bad Request' })
    const [sheet] = await db
      .insert(sheets)
      .values({ name, csvData, createdBy, rowCount: rowCount ?? 0 })
      .returning()
    return res.status(201).json(sheet)
  }

  if (req.method === 'DELETE') {
    const { id } = req.query
    if (!id) return res.status(400).json({ error: 'Bad Request' })
    await db.delete(sheets).where(eq(sheets.id, parseInt(id as string)))
    return res.status(204).end()
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
