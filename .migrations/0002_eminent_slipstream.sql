CREATE TABLE IF NOT EXISTS "playlists" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"user_id" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tmdb_medias_in_playlists" (
	"tmdb_media_id" integer NOT NULL,
	"playlist_id" text NOT NULL,
	CONSTRAINT "tmdb_medias_in_playlists_playlist_id_pk" PRIMARY KEY("playlist_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_favorites" (
	"id" serial PRIMARY KEY NOT NULL,
	"tmdb_media_id" integer NOT NULL,
	"user_id" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "playlists" ADD CONSTRAINT "playlists_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tmdb_medias_in_playlists" ADD CONSTRAINT "tmdb_medias_in_playlists_playlist_id_playlists_id_fk" FOREIGN KEY ("playlist_id") REFERENCES "public"."playlists"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_favorites" ADD CONSTRAINT "user_favorites_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
