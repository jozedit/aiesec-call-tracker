import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core'

export const sheets = pgTable('sheets', {
  id: serial().primaryKey(),
  name: text().notNull(),
  csvData: text('csv_data').notNull(),
  createdBy: text('created_by').notNull(),
  rowCount: integer('row_count').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow(),
})
