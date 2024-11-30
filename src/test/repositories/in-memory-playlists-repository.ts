import type { Playlist } from "@/domain/app/entities/playlist"
import type {
  FindManyPlaylistsParams,
  PlaylistsRepository,
} from "@/domain/app/repositories/playlists-repository"

export class InMemoryPlaylistsRepository implements PlaylistsRepository {
  public items: Playlist[] = []

  async create(playlist: Playlist): Promise<Playlist> {
    this.items.push(playlist)
    return playlist
  }

  async updateMediasId(playlistId: string, mediasId: string[]) {
    const playlistIndex = this.items.findIndex(
      item => item.id.toString() === playlistId
    )

    if (playlistIndex < 0) {
      throw new Error(`Playlist '${playlistId}' does not exist!`)
    }

    const playlist = this.items[playlistIndex]
    this.items[playlistIndex].mediasId = playlist.mediasId.concat(mediasId)
  }

  async findById(id: string): Promise<null | Playlist> {
    const playlist = this.items.find(item => item.id.toString() === id)

    if (!playlist) {
      return null
    }

    return playlist
  }

  async findManyByUserId(userId: string, params: FindManyPlaylistsParams) {
    const allPlaylists = this.items.filter(item => {
      const isPlaylistInsideFilterVisibility = params.with.includes(
        item.visibility
      )

      return (
        item.userId.toString() === userId && isPlaylistInsideFilterVisibility
      )
    })

    const playlists = allPlaylists.slice(
      (params.page - 1) * 20,
      params.page * 20
    )

    const playlistsDTO = playlists.map(playlist => ({
      id: playlist.id.toString(),
      name: playlist.name,
      color: playlist.name,
      mediasId: playlist.mediasId,
      visibility: playlist.visibility,
      isDefault: false,
      createdAt: playlist.createdAt,
      updatedAt: playlist.updatedAt,
    }))

    return {
      playlists: playlistsDTO,
      defaultPlaylists: playlistsDTO,
    }
  }
}
