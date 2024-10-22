import type { Playlist } from "../entities/playlist"

export interface PlaylistsRepository {
  create(playlist: Playlist): Promise<Playlist>
}
