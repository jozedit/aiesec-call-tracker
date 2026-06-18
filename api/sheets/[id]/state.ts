import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "../../../db/index.js";
import { sheetStates } from "../../../db/schema.js";
import { eq } from "drizzle-orm";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const sheetId = parseInt(req.query.id as string);
  if (isNaN(sheetId)) return res.status(400).send("Bad request");

  if (req.method === "GET") {
    const [state] = await db.select().from(sheetStates).where(eq(sheetStates.sheetId, sheetId));
    if (!state) {
      return res.status(200).json({ callEdits: {}, assignments: {} });
    }
    return res.status(200).json({
      callEdits: JSON.parse(state.callEditsJson),
      assignments: JSON.parse(state.assignmentsJson),
    });
  }

  if (req.method === "PUT") {
    const body = req.body;
    const callEditsJson = JSON.stringify(body.callEdits ?? {});
    const assignmentsJson = JSON.stringify(body.assignments ?? {});

    await db.insert(sheetStates)
      .values({ sheetId, callEditsJson, assignmentsJson })
      .onConflictDoUpdate({
        target: sheetStates.sheetId,
        set: { callEditsJson, assignmentsJson },
      });

    return res.status(204).send(null);
  }

  return res.status(405).send("Method not allowed");
}
