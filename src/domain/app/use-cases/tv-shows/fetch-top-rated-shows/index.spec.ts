import { FetchTopRatedShowsUseCase } from "."
import { InMemoryTvShowsRepository } from "@/test/repositories/in-memory-tv-shows-repository"
import { makeTvShow } from "@/test/factories/make-tv-show"

let tvShowsRepository: InMemoryTvShowsRepository
let sut: FetchTopRatedShowsUseCase

describe("Fetch Upcoming Movies Use Case", () => {
  beforeEach(() => {
    tvShowsRepository = new InMemoryTvShowsRepository()
    sut = new FetchTopRatedShowsUseCase(tvShowsRepository)
  })

  it("should be able to fetch top rated tv shows", async () => {
    for (let i = 0; i < 30; i++) {
      tvShowsRepository.items.push(
        makeTvShow({
          title: `show-${i + 1}`,
        })
      )
    }

    const result = await sut.execute({
      page: 1,
    })

    expect(result.isRight()).toBeTruthy()

    if (result.isRight()) {
      expect(result.value.tvShows).toHaveLength(20)
      expect(result.value.tvShows).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            title: "show-20",
          }),
        ])
      )
    }
  })
})
