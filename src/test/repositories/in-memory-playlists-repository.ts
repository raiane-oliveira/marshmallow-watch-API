import type { Playlist } from "@/domain/app/entities/playlist"
import type { PlaylistsRepository } from "@/domain/app/repositories/playlists-repository"

export class InMemoryPlaylistsRepository implements PlaylistsRepository {
  public items: Playlist[] = []

  async create(playlist: Playlist): Promise<Playlist> {
    this.items.push(playlist)
    return playlist
  }
}
