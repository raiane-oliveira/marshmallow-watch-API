// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Knex } from "knex"

declare module "knex/types/tables" {
  export interface UserDb {
    id: string
    name: string
    email: string
    password: string
    avatar_url_id?: string | null
    verification_token?: string | null
    created_at: string
    updated_at?: string | null
  }

  export interface Tables {
    users: UserDb
  }
}
