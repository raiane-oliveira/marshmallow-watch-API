import { env } from "../env"

export class TmdbApiProvider {
  private baseUrl: URL

  constructor() {
    this.baseUrl = new URL("/3", env.TMDB_BASE_API_URL)
  }

  api(endpoint: string, options?: RequestInit) {
    const url = new URL(endpoint, this.baseUrl)
    url.searchParams.append("api_key", env.TMDB_API_KEY)

    return fetch(url, options)
  }
}
