import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "../../db/index.js";
import { sheets } from "../../db/schema.js";
import { eq } from "drizzle-orm";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const id = parseInt(req.query.id as string);
  if (isNaN(id)) return res.status(400).send("Bad request");

  if (req.method === "GET") {
    const [sheet] = await db.select().from(sheets).where(eq(sheets.id, id));
    if (!sheet) return res.status(404).send("Not found");
    return res.status(200).json(sheet);
  }

  if (req.method === "DELETE") {
    await db.delete(sheets).where(eq(sheets.id, id));
    return res.status(204).send(null);
  }

  return res.status(405).send("Method not allowed");
}
