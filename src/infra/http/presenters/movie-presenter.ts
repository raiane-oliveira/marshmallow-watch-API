import type { Movie } from "@/domain/app/entities/movie"

export class MoviePresenter {
  static toHTTP(movie: Movie) {
    return {
      id: movie.id.toString(),
      title: movie.title,
      description: movie.description,
      genreIds: movie.genreIds.map(id => id.toString()),
      imageUrl: `https://image.tmdb.org/t/p/original/${movie.imagePath}`,
      releaseAt: movie.releaseAt,
    }
  }
}
