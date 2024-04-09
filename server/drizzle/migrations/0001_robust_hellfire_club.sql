ALTER TABLE "classes" ALTER COLUMN "title" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "classes" ADD COLUMN "slug" varchar;--> statement-breakpoint
ALTER TABLE "classes" ADD COLUMN "invitation_token" varchar;