import { makeMovie } from "@/test/factories/make-movie"
import { DiscoverMoviesAndShowsUseCase } from "."
import { makeTvShow } from "@/test/factories/make-tv-show"
import { InMemoryMediasRepository } from "@/test/repositories/in-memory-medias-repository"

let mediasRepository: InMemoryMediasRepository
let sut: DiscoverMoviesAndShowsUseCase

describe("Discover Movies and Tv Shows Use Case", () => {
  beforeEach(() => {
    mediasRepository = new InMemoryMediasRepository()
    sut = new DiscoverMoviesAndShowsUseCase(mediasRepository)
  })

  it("should be able to return movies and tv shows by its release", async () => {
    const movie = makeMovie()
    mediasRepository.items.push(movie)

    const tvShow = makeTvShow()
    mediasRepository.items.push(tvShow)

    const result = await sut.execute({
      timeWindow: "week",
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
