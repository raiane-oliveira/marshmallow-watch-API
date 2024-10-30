import type { Playlist } from "../entities/playlist"

export interface PlaylistsRepository {
  create(playlist: Playlist): Promise<Playlist>
  findById(id: string): Promise<null | Playlist>
  updateMediasId(playlist: Playlist): Promise<Playlist>
}
