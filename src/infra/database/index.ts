import { Knex, knex as setupKnex } from "knex"
import { env } from "../env"

export const config: Knex.Config = {
  client: "pg",
  connection: env.DATABASE_URL,
  debug: env.NODE_ENV === "dev",
  pool: {
    min: 0,
    max: 10,
  },
  migrations: {
    extension: "ts",
    tableName: "migrations",
    directory: "./db/migrations",
  },
  useNullAsDefault: true,
  // TODO: log: {}
}

export const database = setupKnex(config)
