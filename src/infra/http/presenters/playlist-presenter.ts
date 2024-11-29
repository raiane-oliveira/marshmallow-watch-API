import type { PlaylistDTO } from "@/core/dtos/playlist"

export class PlaylistPresenter {
  static toHTTP(playlist: PlaylistDTO) {
    return {
      id: playlist.id.toString(),
      name: playlist.name,
      visibility: playlist.visibility,
      color: playlist.color,
      isDefault: playlist.isDefault,
      mediasId:
        playlist.mediasId.length === 1 && playlist.mediasId[0] === null
          ? []
          : playlist.mediasId,
      createdAt: playlist.createdAt,
      updatedAt: playlist.updatedAt,
    }
  }
}
