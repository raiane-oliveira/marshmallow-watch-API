import { createId } from "@paralleldrive/cuid2"
import { pgTable, text, timestamp } from "drizzle-orm/pg-core"

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

export type SelectUser = typeof users.$inferSelect
export type InsertUser = typeof users.$inferInsert
