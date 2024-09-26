import { InMemoryMoviesRepository } from "@/test/repositories/in-memory-movies-repository"
import { DiscoverMoviesUseCase } from "."
import { makeMovie } from "@/test/factories/make-movie"

let moviesRepository: InMemoryMoviesRepository
let sut: DiscoverMoviesUseCase

describe("Discover Movies Use Case", () => {
  beforeEach(() => {
    moviesRepository = new InMemoryMoviesRepository()
    sut = new DiscoverMoviesUseCase(moviesRepository)
  })

  it("should be able to return movies by it release", async () => {
    const movie = makeMovie()
    moviesRepository.items.push(movie)
    const result = await sut.execute({
      page: 1,
    })

    expect(result.isRight()).toBeTruthy()

    if (result.isRight()) {
      expect(result.value.movies).toEqual(expect.arrayContaining([
        expect.objectContaining({
          title: movie.title,
          description: movie.description,
          imagePath: movie.imagePath,
        }),
      ]))
    }
  })
})
