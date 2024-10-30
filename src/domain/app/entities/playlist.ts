import { Entity } from "@/core/entities/entity"
import type { UniqueEntityId } from "@/core/entities/unique-entity-id"
import type { Optional } from "@/core/types/optional"

export interface PlaylistProps {
  name: string
  createdAt: Date
  updatedAt?: Date | null
  mediasId: string[]
  userId: UniqueEntityId
}

export class Playlist extends Entity<PlaylistProps> {
  get name() {
    return this.props.name
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get mediasId() {
    return this.props.mediasId
  }

  get userId() {
    return this.props.userId
  }

  static create(
    props: Optional<PlaylistProps, "createdAt">,
    id?: UniqueEntityId
  ) {
    const playlist = new Playlist(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    )

    return playlist
  }
}
