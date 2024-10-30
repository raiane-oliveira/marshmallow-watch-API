import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { Playlist, type PlaylistProps } from "@/domain/app/entities/playlist"
import { faker } from "@faker-js/faker"

export function makePlaylist(
  override?: Partial<PlaylistProps>,
  id?: UniqueEntityId
) {
  const playlist = Playlist.create(
    {
      name: faker.person.fullName(),
      userId: new UniqueEntityId(),
      mediasId: [],
      ...override,
    },
    id
  )

  return playlist
}
