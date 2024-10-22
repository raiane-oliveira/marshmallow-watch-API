ALTER TABLE "playlists" ADD COLUMN "created_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "playlists" ADD COLUMN "updated_at" date;--> statement-breakpoint
ALTER TABLE "user_favorites" ADD COLUMN "favorite_at" timestamp with time zone;