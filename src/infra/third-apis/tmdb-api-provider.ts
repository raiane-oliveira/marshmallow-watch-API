import { env } from "../env"

export class TmdbApiProvider {
  private baseUrl: URL
  private version: number

  constructor() {
    this.version = 3
    this.baseUrl = new URL(env.TMDB_BASE_API_URL)
  }

  api(endpoint: string, options?: RequestInit) {
    const url = new URL(`/${this.version}${endpoint}`, this.baseUrl)
    url.searchParams.append("api_key", env.TMDB_API_KEY)

    return fetch(url, options)
  }
}
