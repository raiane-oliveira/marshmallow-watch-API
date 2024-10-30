ALTER TABLE "tmdb_medias_in_playlists" DROP CONSTRAINT "tmdb_medias_in_playlists_playlist_id_pk";--> statement-breakpoint
ALTER TABLE "playlists" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "playlists" ALTER COLUMN "user_id" SET NOT NULL;