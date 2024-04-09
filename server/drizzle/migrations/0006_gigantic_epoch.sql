ALTER TABLE "user_presences" DROP CONSTRAINT "user_presences_barcodes_id_barcodes_id_fk";
--> statement-breakpoint
ALTER TABLE "user_presences" DROP COLUMN IF EXISTS "barcodes_id";