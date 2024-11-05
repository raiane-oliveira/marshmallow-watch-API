import type { Playlist } from "@/domain/app/entities/playlist"

export class PlaylistPresenter {
  static toHTTP(playlist: Playlist) {
    return {
      id: playlist.id.toString(),
      name: playlist.name,
      visibility: playlist.visibility,
      color: playlist.color,
      mediasId:
        playlist.mediasId.length === 1 && playlist.mediasId[0] === null
          ? []
          : playlist.mediasId,
      createdAt: playlist.createdAt,
      updatedAt: playlist.updatedAt,
    }
  }
}
