ALTER TABLE "class_presences" ADD COLUMN "tolerance_times" integer DEFAULT 30;--> statement-breakpoint
ALTER TABLE "barcodes" DROP COLUMN IF EXISTS "expire_at";