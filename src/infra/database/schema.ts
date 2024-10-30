import { createId } from "@paralleldrive/cuid2"
import { relations } from "drizzle-orm"
import {
  date,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
  username: text("username").notNull().unique(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  avatarUrlId: text("avatar_url_id"),
  verificationToken: text("verification_token"),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const userFavorites = pgTable("user_favorites", {
  id: serial("id").primaryKey(),
  tmdbMediaId: integer("tmdb_media_id").notNull(),
  favoriteAt: timestamp("favorite_at", { withTimezone: true }),
  userId: text("user_id").references(() => users.id, {
    onDelete: "cascade",
  }),
})

export const userFavoritesRelations = relations(userFavorites, ({ one }) => ({
  user: one(users, {
    fields: [userFavorites.userId],
    references: [users.id],
  }),
}))

export const playlists = pgTable("playlists", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
  updatedAt: date("updated_at"),
  userId: text("user_id")
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .notNull(),
})

export const tmdbMediasInPlaylists = pgTable("tmdb_medias_in_playlists", {
  tmdbMediaId: integer("tmdb_media_id").notNull(),
  playlistId: text("playlist_id")
    .notNull()
    .references(() => playlists.id, {
      onDelete: "cascade",
    }),
})

export const playlistsRelations = relations(playlists, ({ one }) => ({
  user: one(users, {
    fields: [playlists.userId],
    references: [users.id],
  }),
}))

export const tmdbMediasInPlaylistsRelations = relations(
  tmdbMediasInPlaylists,
  ({ one }) => ({
    playlist: one(playlists, {
      fields: [tmdbMediasInPlaylists.playlistId],
      references: [playlists.id],
    }),
  })
)

export type SelectUser = typeof users.$inferSelect
export type InsertUser = typeof users.$inferInsert
export type InsertPlaylist = typeof playlists.$inferInsert
export type SelectPlaylist = typeof playlists.$inferSelect
