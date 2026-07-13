import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "../../db/index.js";
import { sheets, sheetStates, appSettings } from "../../db/schema.js";
import { desc } from "drizzle-orm";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "GET") {
    const all = await db.select({
      id: sheets.id,
      name: sheets.name,
      rowCount: sheets.rowCount,
      createdBy: sheets.createdBy,
      createdAt: sheets.createdAt,
    }).from(sheets).orderBy(desc(sheets.createdAt));
    return res.status(200).json(all);
  }

  if (req.method === "POST") {
    const { name, csvData, createdBy, rowCount } = req.body;
    const [sheet] = await db.insert(sheets)
      .values({ name, csvData, createdBy, rowCount })
      .returning();

    await db.insert(sheetStates)
      .values({ sheetId: sheet.id })
      .onConflictDoNothing();

    await db.insert(appSettings)
      .values({ key: "activeSheetId", value: String(sheet.id) })
      .onConflictDoUpdate({ target: appSettings.key, set: { value: String(sheet.id) } });

    return res.status(201).json(sheet);
  }

  return res.status(405).send("Method not allowed");
}
