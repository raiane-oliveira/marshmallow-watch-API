import { InMemoryGenresRepository } from "@/test/repositories/in-memory-genres-repository"
import { GetMovieGenresUseCase } from "."
import { Genre } from "@/domain/app/entities/genre"

let genresRepository: InMemoryGenresRepository
let sut: GetMovieGenresUseCase

describe("Get Movie Genres Use Case", () => {
  beforeEach(() => {
    genresRepository = new InMemoryGenresRepository()
    sut = new GetMovieGenresUseCase(genresRepository)
  })

  it("should be able to get genres", async () => {
    genresRepository.items.push(Genre.create({ name: "Animation" }))
    genresRepository.items.push(Genre.create({ name: "Action" }))

    const result = await sut.execute({})

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.genres).toHaveLength(2)
    }
  })
})
