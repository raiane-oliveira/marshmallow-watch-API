import { makeMovie } from "@/test/factories/make-movie"
import { InMemoryMoviesRepository } from "@/test/repositories/in-memory-movies-repository"
import { DiscoverMoviesAndShowsUseCase } from "."
import { InMemoryTvShowsRepository } from "@/test/repositories/in-memory-tv-shows-repository"
import { makeTvShow } from "@/test/factories/make-tv-show"

let tvShowsRepository: InMemoryTvShowsRepository
let moviesRepository: InMemoryMoviesRepository
let sut: DiscoverMoviesAndShowsUseCase

describe("Discover Movies and Tv Shows Use Case", () => {
  beforeEach(() => {
    moviesRepository = new InMemoryMoviesRepository()
    tvShowsRepository = new InMemoryTvShowsRepository()
    sut = new DiscoverMoviesAndShowsUseCase(moviesRepository, tvShowsRepository)
  })

  it("should be able to return movies and tv shows by its release", async () => {
    const movie = makeMovie()
    moviesRepository.items.push(movie)

    const tvShow = makeTvShow()
    tvShowsRepository.items.push(tvShow)

    const result = await sut.execute({
      page: 1,
    })

    expect(result.isRight()).toBeTruthy()

    if (result.isRight()) {
      expect(result.value.medias).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            title: movie.title,
            description: movie.description,
            imagePath: movie.imagePath,
          }),
          expect.objectContaining({
            title: tvShow.title,
            description: tvShow.description,
            imagePath: tvShow.imagePath,
          }),
        ])
      )
    }
  })
})
