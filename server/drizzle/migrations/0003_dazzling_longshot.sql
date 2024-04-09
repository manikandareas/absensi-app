ALTER TABLE "class_presences" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "class_presences" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "class_presences" ALTER COLUMN "class_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "class_presences" ALTER COLUMN "lecturer_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "classes" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "classes" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "classes" ALTER COLUMN "lecturer_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "user_classes" ALTER COLUMN "class_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "user_classes" ALTER COLUMN "user_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "user_presences" ALTER COLUMN "user_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "user_presences" ALTER COLUMN "class_presences_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "classes" ADD CONSTRAINT "classes_slug_unique" UNIQUE("slug");--> statement-breakpoint
ALTER TABLE "classes" ADD CONSTRAINT "classes_invitation_token_unique" UNIQUE("invitation_token");