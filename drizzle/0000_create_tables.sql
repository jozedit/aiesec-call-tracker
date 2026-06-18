CREATE TABLE "app_settings" (
	"key" text PRIMARY KEY,
	"value" text NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "sheet_states" (
	"sheet_id" integer PRIMARY KEY,
	"call_edits_json" text DEFAULT '{}' NOT NULL,
	"assignments_json" text DEFAULT '{}' NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "sheets" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"csv_data" text NOT NULL,
	"row_count" integer DEFAULT 0 NOT NULL,
	"created_by" text DEFAULT '' NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "sheet_states" ADD CONSTRAINT "sheet_states_sheet_id_sheets_id_fkey" FOREIGN KEY ("sheet_id") REFERENCES "sheets"("id") ON DELETE CASCADE;