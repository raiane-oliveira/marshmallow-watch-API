import { CreatePlaylistUseCase } from "."
import { InMemoryUsersRepository } from "@/test/repositories/in-memory-users-repository"
import { InMemoryPlaylistsRepository } from "@/test/repositories/in-memory-playlists-repository"
import { makeUserAndPlaylists } from "@/test/factories/make-user-and-playlists"

let usersRepository: InMemoryUsersRepository
let playlistsRepository: InMemoryPlaylistsRepository
let sut: CreatePlaylistUseCase

describe("Create Playlist Use Case", () => {
  beforeEach(() => {
    playlistsRepository = new InMemoryPlaylistsRepository()
    usersRepository = new InMemoryUsersRepository(playlistsRepository)
    sut = new CreatePlaylistUseCase(playlistsRepository, usersRepository)
  })

  it("should be able to create a playlist", async () => {
    const { user, playlists } = makeUserAndPlaylists()
    usersRepository.createWithPlaylists(user, playlists)

    const result = await sut.execute({
      name: "Playlist 1",
      userId: user.id.toString(),
    })

    expect(result.isRight()).toBe(true)
  })
})
