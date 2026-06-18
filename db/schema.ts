import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

export const sheets = pgTable("sheets", {
  id: serial().primaryKey(),
  name: text().notNull(),
  csvData: text("csv_data").notNull(),
  rowCount: integer("row_count").notNull().default(0),
  createdBy: text("created_by").notNull().default(''),
  createdAt: timestamp("created_at").defaultNow(),
});

export const sheetStates = pgTable("sheet_states", {
  sheetId: integer("sheet_id").primaryKey().references(() => sheets.id, { onDelete: 'cascade' }),
  callEditsJson: text("call_edits_json").notNull().default('{}'),
  assignmentsJson: text("assignments_json").notNull().default('{}'),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const appSettings = pgTable("app_settings", {
  key: text().primaryKey(),
  value: text().notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
