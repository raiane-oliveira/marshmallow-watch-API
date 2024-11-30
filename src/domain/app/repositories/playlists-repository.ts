import type { PaginationParams } from "@/core/pagination-params"
import type { Playlist } from "../entities/playlist"
import type { Visibility } from "@/core/types/utils"
import type { PlaylistDTO } from "@/core/dtos/playlist"

export interface FindManyPlaylistsParams extends PaginationParams {
  with: Visibility[]
}

export interface PlaylistsRepository {
  create(playlist: Playlist): Promise<Playlist>
  findById(id: string): Promise<null | Playlist>
  updateMediasId(playlistId: string, mediasId: string[]): Promise<void>
  findManyByUserId(
    userId: string,
    params: FindManyPlaylistsParams
  ): Promise<{
    playlists: PlaylistDTO[]
    defaultPlaylists: PlaylistDTO[]
  }>
}
