import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { makeUser } from "@/test/factories/make-user"
import { InMemoryUsersRepository } from "@/test/repositories/in-memory-users-repository"
import { GetCurrentUserProfileWithPlaylistsUseCase } from "."
import { InMemoryPlaylistsRepository } from "@/test/repositories/in-memory-playlists-repository"
import { makePlaylist } from "@/test/factories/make-playlist"

let playlistsRepository: InMemoryPlaylistsRepository
let usersRepository: InMemoryUsersRepository
let sut: GetCurrentUserProfileWithPlaylistsUseCase

describe("Get Current User Profile With Playlists Use Case", () => {
  beforeEach(() => {
    playlistsRepository = new InMemoryPlaylistsRepository()
    usersRepository = new InMemoryUsersRepository(playlistsRepository)
    sut = new GetCurrentUserProfileWithPlaylistsUseCase(usersRepository)
  })

  it("should be able to get all data from user profile", async () => {
    const user = makeUser()
    usersRepository.items.push(user)
    usersRepository.items.push(makeUser())

    playlistsRepository.items.push(
      makePlaylist({
        userId: user.id,
      })
    )
    playlistsRepository.items.push(
      makePlaylist({
        userId: user.id,
      })
    )

    const result = await sut.execute({
      username: user.username.toString(),
    })

    expect(result.isRight())

    if (result.isRight()) {
      expect(result.value.user).toEqual(
        expect.objectContaining({
          name: user.name,
          email: user.email,
          username: user.username,
          avatarUrl: user.avatarUrl,
          playlists: expect.any(Array),
        })
      )
    }
  })

  it("should not be able to get inexistent user profile", async () => {
    const result = await sut.execute({
      username: "inexistentusername",
    })

    expect(result.isLeft())
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
