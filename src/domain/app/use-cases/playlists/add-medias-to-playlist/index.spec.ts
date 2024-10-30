import { InMemoryPlaylistsRepository } from "@/test/repositories/in-memory-playlists-repository"
import { AddMediasToPlaylistUseCase } from "."
import { InMemoryUsersRepository } from "@/test/repositories/in-memory-users-repository"
import { makeUser } from "@/test/factories/make-user"
import { makePlaylist } from "@/test/factories/make-playlist"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { NotAllowedError } from "@/core/errors/not-allowed-error"

let playlistsRepository: InMemoryPlaylistsRepository
let usersRepository: InMemoryUsersRepository
let sut: AddMediasToPlaylistUseCase

describe("Add Medias to Playlist Use Case", () => {
  beforeEach(() => {
    playlistsRepository = new InMemoryPlaylistsRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new AddMediasToPlaylistUseCase(playlistsRepository)
  })

  it("should be able to add medias to playlist", async () => {
    const user = makeUser()
    usersRepository.create(user)

    const playlist = makePlaylist({
      userId: user.id,
    })
    playlistsRepository.create(playlist)

    const result = await sut.execute({
      mediasId: ["1", "2", "3"],
      playlistId: playlist.id.toString(),
      userId: user.id.toString(),
    })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      expect(result.value.playlist).toEqual(
        expect.objectContaining({
          mediasId: ["1", "2", "3"],
        })
      )
      expect(playlistsRepository.items[0].mediasId).toEqual(["1", "2", "3"])
    }

    expect(playlistsRepository.items).toHaveLength(1)
  })

  it("should not be able to add medias to inexistent playlist", async () => {
    const user = makeUser()
    usersRepository.create(user)

    const result = await sut.execute({
      mediasId: ["1", "2", "3"],
      playlistId: "inexistent-playlist-1",
      userId: user.id.toString(),
    })

    expect(result.isLeft()).toBe(true)

    if (result.isLeft()) {
      expect(result.value).toBeInstanceOf(ResourceNotFoundError)
    }

    expect(playlistsRepository.items).toHaveLength(0)
  })

  it("should not be able to add medias in another user's playlist", async () => {
    const user = makeUser()
    const user2 = makeUser()
    usersRepository.create(user)
    usersRepository.create(user2)

    const playlist = makePlaylist({
      userId: user.id,
    })
    playlistsRepository.create(playlist)

    const result = await sut.execute({
      mediasId: ["1", "2", "3"],
      playlistId: playlist.id.toString(),
      userId: user2.id.toString(),
    })

    expect(result.isLeft()).toBe(true)

    if (result.isLeft()) {
      expect(result.value).toBeInstanceOf(NotAllowedError)
    }

    expect(playlistsRepository.items).toHaveLength(1)
    expect(playlistsRepository.items[0].mediasId).toHaveLength(0)
  })
})
