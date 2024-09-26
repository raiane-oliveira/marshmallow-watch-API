import type { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTableIfNotExists("users", table => {
    table.uuid("id").primary()
    table.string("name").notNullable()
    table.string("email").unique()
    table.string("password").notNullable()
    table.string("avatar_url_id").nullable()
    table.string("verification_token").nullable()
    table.datetime("updated_at").nullable()
    table.datetime("created_at").defaultTo(knex.fn.now()).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("users")
}
