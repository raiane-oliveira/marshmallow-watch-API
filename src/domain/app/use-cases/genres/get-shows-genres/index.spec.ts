import { InMemoryGenresRepository } from "@/test/repositories/in-memory-genres-repository"
import { GetShowGenresUseCase } from "."
import { Genre } from "@/domain/app/entities/genre"

let genresRepository: InMemoryGenresRepository
let sut: GetShowGenresUseCase

describe("Get Show Genres Use Case", () => {
  beforeEach(() => {
    genresRepository = new InMemoryGenresRepository()
    sut = new GetShowGenresUseCase(genresRepository)
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
