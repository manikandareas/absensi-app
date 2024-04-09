ALTER TABLE "contacts" DROP CONSTRAINT "contacts_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "contacts_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_contacts_id_contacts_id_fk" FOREIGN KEY ("contacts_id") REFERENCES "contacts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "contacts" DROP COLUMN IF EXISTS "user_id";