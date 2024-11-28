import type { Media } from "@/domain/app/entities/media"
import type {
  MediasRepository,
  MediasTrendingParams,
} from "@/domain/app/repositories/medias-repository"
import { TmdbApiProvider } from "../tmdb-api-provider"
import { TmdbMoviesMapper } from "../mappers/tmdb-movies-mapper"
import type { TmdbMovie } from "../interfaces/tmdb-movie"
import type { TmdbTvShow } from "../interfaces/tmdb-tv-show"
import { TmdbTvShowsMapper } from "../mappers/tmdb-tv-shows-mapper"

export class TmdbMediasRepository
  extends TmdbApiProvider
  implements MediasRepository
{
  async findManyByTrending({
    lang,
    timeWindow = "week",
  }: MediasTrendingParams): Promise<Media[]> {
    const res = await this.api(
      `/trending/all/${timeWindow}?language=${lang ?? "en-US"}`
    )

    const tmdbMedias = await res.json()

    return tmdbMedias.results?.map((tmdb: TmdbMovie | TmdbTvShow) => {
      if ("release_date" in tmdb) {
        return TmdbMoviesMapper.toDomain(tmdb as TmdbMovie)
      }

      return TmdbTvShowsMapper.toDomain(tmdb as TmdbTvShow)
    })
  }
}
