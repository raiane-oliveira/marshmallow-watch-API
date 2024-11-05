import { makeMovie } from "@/test/factories/make-movie"
import { InMemoryMoviesRepository } from "@/test/repositories/in-memory-movies-repository"
import { FetchUpcomingMoviesUseCase } from "."
import dayjs from "dayjs"

let moviesRepository: InMemoryMoviesRepository
let sut: FetchUpcomingMoviesUseCase

describe("Fetch Upcoming Movies Use Case", () => {
  beforeEach(() => {
    moviesRepository = new InMemoryMoviesRepository()
    sut = new FetchUpcomingMoviesUseCase(moviesRepository)
  })

  it("should be able to fetch upcoming movies", async () => {
    for (let i = 0; i < 30; i++) {
      moviesRepository.items.push(
        makeMovie({
          title: `movie-${i + 1}`,
          releaseAt:
            i < 5
              ? dayjs().subtract(1, "week").toDate()
              : dayjs().add(1, "week").toDate(),
        })
      )
    }

    const result = await sut.execute({
      page: 1,
    })

    expect(result.isRight()).toBeTruthy()

    if (result.isRight()) {
      expect(result.value.movies).toHaveLength(15)
      expect(result.value.movies).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            title: "movie-6",
          }),
        ])
      )
    }
  })
})
