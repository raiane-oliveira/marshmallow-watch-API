import { makeTvShow } from "@/test/factories/make-tv-show"
import { InMemoryTvShowsRepository } from "@/test/repositories/in-memory-tv-shows-repository"
import { SearchTvShowsUseCase } from "."

let tvShowsRepository: InMemoryTvShowsRepository
let sut: SearchTvShowsUseCase

describe("Search TvShows Use Case", () => {
  beforeEach(() => {
    tvShowsRepository = new InMemoryTvShowsRepository()
    sut = new SearchTvShowsUseCase(tvShowsRepository)
  })

  it("should be able to search tv shows by name", async () => {
    for (let i = 0; i < 22; i++) {
      tvShowsRepository.items.push(
        makeTvShow({
          title: `tv-show-${i + 1}`,
        })
      )
    }

    const result = await sut.execute({
      query: "tv-show-18",
      page: 1,
    })

    expect(result.isRight()).toBeTruthy()

    if (result.isRight()) {
      expect(result.value.tvShows).toHaveLength(1)
      expect(result.value.tvShows).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            title: "tv-show-18",
          }),
        ])
      )
    }
  })

  it("should be able to search tv shows by name and year", async () => {
    for (let i = 0; i < 22; i++) {
      tvShowsRepository.items.push(
        makeTvShow({
          title: `tv-show-${i + 1}`,
          firstAirDate: new Date(
            new Date().getFullYear() - i,
            new Date().getMonth(),
            new Date().getDate()
          ),
        })
      )
    }

    const result = await sut.execute({
      query: "tv-show-8",
      firstAirDateYear: 2017,
      page: 1,
    })

    expect(result.isRight()).toBeTruthy()

    if (result.isRight()) {
      expect(result.value.tvShows).toHaveLength(1)
      expect(result.value.tvShows).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            title: "tv-show-8",
          }),
        ])
      )
    }
  })

  it("should not be able to search tv shows by name and year in wrong page", async () => {
    for (let i = 0; i < 22; i++) {
      tvShowsRepository.items.push(
        makeTvShow({
          title: `tv-show-${i + 1}`,
          firstAirDate: new Date(
            new Date().getFullYear() - i,
            new Date().getMonth(),
            new Date().getDate()
          ),
        })
      )
    }

    const result = await sut.execute({
      query: "tv-show-22",
      firstAirDateYear: 2013,
      page: 1,
    })

    expect(result.isRight()).toBeTruthy()

    if (result.isRight()) {
      expect(result.value.tvShows).toHaveLength(0)
    }
  })
})
