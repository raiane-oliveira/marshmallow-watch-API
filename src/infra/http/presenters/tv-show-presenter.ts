import type { TvShow } from "@/domain/app/entities/tv-show"

export abstract class TvShowPresenter {
  static toHTTP(tvShow: TvShow) {
    return {
      id: tvShow.id.toString(),
      title: tvShow.title,
      description: tvShow.description,
      genreIds: tvShow.genreIds.map(id => id.toString()),
      imageUrl: `https://image.tmdb.org/t/p/original${tvShow.imagePath}`,
      firstAirDate: tvShow.firstAirDate,
    }
  }
}
