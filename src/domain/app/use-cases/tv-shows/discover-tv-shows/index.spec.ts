import { makeTvShow } from "@/test/factories/make-tv-show"
import { InMemoryTvShowsRepository } from "@/test/repositories/in-memory-tv-shows-repository"
import { DiscoverTvShowsUseCase } from "."

let tvShowsRepository: InMemoryTvShowsRepository
let sut: DiscoverTvShowsUseCase

describe("Discover Tv Shows Use Case", () => {
  beforeEach(() => {
    tvShowsRepository = new InMemoryTvShowsRepository()
    sut = new DiscoverTvShowsUseCase(tvShowsRepository)
  })

  it("should be able to return TV Shows by it release", async () => {
    const tvShow = makeTvShow()
    tvShowsRepository.items.push(tvShow)

    const result = await sut.execute({
      page: 1,
    })

    expect(result.isRight()).toBeTruthy()

    if (result.isRight()) {
      expect(result.value.tvShows).toEqual(
        expect.arrayContaining([
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
