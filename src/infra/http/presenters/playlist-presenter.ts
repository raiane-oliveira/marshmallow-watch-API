import type { Playlist } from "@/domain/app/entities/playlist"

export class PlaylistPresenter {
  static toHTTP(playlist: Playlist) {
    return {
      id: playlist.id.toString(),
      name: playlist.name,
      visibility: playlist.visibility,
      mediasId: playlist.mediasId,
      createdAt: playlist.createdAt,
      updatedAt: playlist.updatedAt,
    }
  }
}
