import type { UserWithPlaylists } from "@/domain/app/entities/value-objects/user-with-playlists"
import { PlaylistPresenter } from "./playlist-presenter"

export abstract class UserProfileWithPlaylistsPresenter {
  static toHTTP(user: UserWithPlaylists) {
    return {
      id: user.userId.toString(),
      name: user.name,
      username: user.username.toString(),
      email: user.email,
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      playlists: user.playlists.map(PlaylistPresenter.toHTTP),
    }
  }
}
