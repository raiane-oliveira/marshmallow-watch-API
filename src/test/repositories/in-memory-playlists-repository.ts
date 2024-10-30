import type { Playlist } from "@/domain/app/entities/playlist"
import type { PlaylistsRepository } from "@/domain/app/repositories/playlists-repository"

export class InMemoryPlaylistsRepository implements PlaylistsRepository {
  public items: Playlist[] = []

  async create(playlist: Playlist): Promise<Playlist> {
    this.items.push(playlist)
    return playlist
  }

  async updateMediasId(playlist: Playlist): Promise<Playlist> {
    const playlistIndex = this.items.findIndex(
      item => item.id.toString() === playlist.id.toString()
    )

    if (playlistIndex < 0) {
      throw new Error(
        `Playlist '${playlist.name}-${playlist.id.toString()}' does not exist!`
      )
    }

    this.items[playlistIndex] = playlist

    return playlist
  }

  async findById(id: string): Promise<null | Playlist> {
    const playlist = this.items.find(item => item.id.toString() === id)

    if (!playlist) {
      return null
    }

    return playlist
  }
}
