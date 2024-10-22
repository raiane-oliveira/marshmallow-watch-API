import { CreatePlaylistUseCase } from "."
import { InMemoryUsersRepository } from "@/test/repositories/in-memory-users-repository"
import { InMemoryPlaylistsRepository } from "@/test/repositories/in-memory-playlists-repository"
import { makeUser } from "@/test/factories/make-user"

let usersRepository: InMemoryUsersRepository
let playlistsRepository: InMemoryPlaylistsRepository
let sut: CreatePlaylistUseCase

describe("Create Playlist Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    playlistsRepository = new InMemoryPlaylistsRepository()
    sut = new CreatePlaylistUseCase(playlistsRepository, usersRepository)
  })

  it("should be able to create a playlist", async () => {
    const user = makeUser()
    usersRepository.create(user)

    const result = await sut.execute({
      name: "Playlist 1",
      userId: user.id.toString(),
    })

    expect(result.isRight()).toBe(true)
  })
})
