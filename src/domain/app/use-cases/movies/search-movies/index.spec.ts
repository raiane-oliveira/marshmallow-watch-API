import { makeMovie } from "@/test/factories/make-movie"
import { InMemoryMoviesRepository } from "@/test/repositories/in-memory-movies-repository"
import { SearchMoviesUseCase } from "."

let moviesRepository: InMemoryMoviesRepository
let sut: SearchMoviesUseCase

describe("Search Movies Use Case", () => {
  beforeEach(() => {
    moviesRepository = new InMemoryMoviesRepository()
    sut = new SearchMoviesUseCase(moviesRepository)
  })

  it("should be able to search movies by name", async () => {
    for (let i = 0; i < 22; i++) {
      moviesRepository.items.push(
        makeMovie({
          title: `movie-${i + 1}`,
        })
      )
    }

    const result = await sut.execute({
      query: "movie-18",
      page: 1,
    })

    expect(result.isRight()).toBeTruthy()

    if (result.isRight()) {
      expect(result.value.movies).toHaveLength(1)
      expect(result.value.movies).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            title: "movie-18",
          }),
        ])
      )
    }
  })

  it("should be able to search movies by name and year", async () => {
    for (let i = 0; i < 22; i++) {
      moviesRepository.items.push(
        makeMovie({
          title: `movie-${i + 1}`,
          releaseAt: new Date(
            new Date().getFullYear() - i,
            new Date().getMonth(),
            new Date().getDate()
          ),
        })
      )
    }

    const result = await sut.execute({
      query: "movie-8",
      year: 2017,
      page: 1,
    })

    expect(result.isRight()).toBeTruthy()

    if (result.isRight()) {
      expect(result.value.movies).toHaveLength(1)
      expect(result.value.movies).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            title: "movie-8",
          }),
        ])
      )
    }
  })

  it("should not be able to search movies by name and year in wrong page", async () => {
    for (let i = 0; i < 22; i++) {
      moviesRepository.items.push(
        makeMovie({
          title: `movie-${i + 1}`,
          releaseAt: new Date(
            new Date().getFullYear() - i,
            new Date().getMonth(),
            new Date().getDate()
          ),
        })
      )
    }

    const result = await sut.execute({
      query: "movie-22",
      year: 2013,
      page: 1,
    })

    expect(result.isRight()).toBeTruthy()

    if (result.isRight()) {
      expect(result.value.movies).toHaveLength(0)
    }
  })
})
