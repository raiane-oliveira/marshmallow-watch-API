import knexInstance from "knex"
import { env } from "../env"

const { knex: setupKnex } = knexInstance

export const config: knexInstance.Knex.Config = {
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
