import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "../db/index.js";
import { appSettings } from "../db/schema.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "GET") {
    const rows = await db.select().from(appSettings);
    const result: Record<string, unknown> = {};
    for (const row of rows) {
      try {
        result[row.key] = JSON.parse(row.value);
      } catch {
        result[row.key] = row.value;
      }
    }
    return res.status(200).json(result);
  }

  if (req.method === "PUT") {
    const body = req.body;
    for (const [key, val] of Object.entries(body)) {
      const value = JSON.stringify(val);
      await db.insert(appSettings)
        .values({ key, value })
        .onConflictDoUpdate({ target: appSettings.key, set: { value } });
    }
    return res.status(204).send(null);
  }

  return res.status(405).send("Method not allowed");
}
