import { makePlaylist } from "@/test/factories/make-playlist"
import { makeUser } from "@/test/factories/make-user"
import { InMemoryPlaylistsRepository } from "@/test/repositories/in-memory-playlists-repository"
import { InMemoryUsersRepository } from "@/test/repositories/in-memory-users-repository"
import { GetUserPlaylistsUseCase } from "."

let usersRepository: InMemoryUsersRepository
let playlistsRepository: InMemoryPlaylistsRepository
let sut: GetUserPlaylistsUseCase

describe("Get User Playlists Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    playlistsRepository = new InMemoryPlaylistsRepository()
    sut = new GetUserPlaylistsUseCase(usersRepository, playlistsRepository)
  })

  it("should be able to get all playlists from user", async () => {
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
        visibility: "private",
      })
    )
    playlistsRepository.items.push(
      makePlaylist({
        userId: user.id,
      })
    )

    const result = await sut.execute({
      username: user.username.toString(),
      with: ["all"],
      page: 1,
    })

    expect(result.isRight())

    if (result.isRight()) {
      expect(result.value.playlists).toHaveLength(3)
    }
  })

  it("should be able to get correct playlists visibility", async () => {
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
        visibility: "private",
      })
    )
    playlistsRepository.items.push(
      makePlaylist({
        userId: user.id,
      })
    )

    const resultPrivatePlaylists = await sut.execute({
      username: user.username.toString(),
      with: ["private"],
      page: 1,
    })

    const resultPublicPlaylists = await sut.execute({
      username: user.username.toString(),
      with: ["public"],
      page: 1,
    })

    if (resultPrivatePlaylists.isRight()) {
      expect(resultPrivatePlaylists.value.playlists).toHaveLength(1)
    }

    if (resultPublicPlaylists.isRight()) {
      expect(resultPublicPlaylists.value.playlists).toHaveLength(2)
    }
  })
})
