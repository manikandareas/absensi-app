CREATE TABLE IF NOT EXISTS "contacts" (
	"id" serial PRIMARY KEY NOT NULL,
	"whats_app" varchar,
	"telegram" varchar,
	"number_phone" varchar,
	"instagram" varchar,
	"facebook" varchar
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "contacts_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_contacts_id_contacts_id_fk" FOREIGN KEY ("contacts_id") REFERENCES "contacts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_university_id_unique" UNIQUE("university_id");