ALTER TABLE "playlists" DROP CONSTRAINT "playlists_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "tmdb_medias_in_playlists" DROP CONSTRAINT "tmdb_medias_in_playlists_playlist_id_playlists_id_fk";
--> statement-breakpoint
ALTER TABLE "user_favorites" DROP CONSTRAINT "user_favorites_user_id_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "playlists" ADD CONSTRAINT "playlists_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tmdb_medias_in_playlists" ADD CONSTRAINT "tmdb_medias_in_playlists_playlist_id_playlists_id_fk" FOREIGN KEY ("playlist_id") REFERENCES "public"."playlists"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_favorites" ADD CONSTRAINT "user_favorites_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
