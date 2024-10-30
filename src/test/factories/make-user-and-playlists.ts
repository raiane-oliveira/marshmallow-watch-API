import type { PlaylistProps } from "@/domain/app/entities/playlist"
import type { UserProps } from "@/domain/app/entities/user"
import { makePlaylist } from "./make-playlist"
import { makeUser } from "./make-user"

export function makeUserAndPlaylists(override?: {
  user: Partial<UserProps>
  playlist: Partial<PlaylistProps>
}) {
  const user = makeUser(override?.user)

  const playlistProps = override?.playlist
    ? {
        ...override.playlist,
        userId: user.id,
      }
    : {
        userId: user.id,
      }
  const playlist1 = makePlaylist(playlistProps)
  const playlist2 = makePlaylist(playlistProps)
  const playlist3 = makePlaylist(playlistProps)

  return {
    user,
    playlists: [playlist1, playlist2, playlist3],
  }
}
