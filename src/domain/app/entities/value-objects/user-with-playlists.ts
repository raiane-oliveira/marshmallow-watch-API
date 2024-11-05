import type { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { ValueObject } from "@/core/entities/value-object"
import type { Username } from "./username"
import type { VerificationToken } from "./verification-token"
import type { Playlist } from "../playlist"

export interface UserWithPlaylistsProps {
  userId: UniqueEntityId
  name: string
  username: Username
  email: string
  avatarUrl?: string | null
  verificationToken?: VerificationToken | null
  createdAt: Date
  updatedAt?: Date | null
  playlists: Playlist[]
}

export class UserWithPlaylists extends ValueObject<UserWithPlaylistsProps> {
  get userId() {
    return this.props.userId
  }

  get name() {
    return this.props.name
  }

  get username() {
    return this.props.username
  }

  get email() {
    return this.props.email
  }

  get avatarUrl() {
    return this.props.avatarUrl
  }

  get verificationToken() {
    return this.props.verificationToken
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get playlists() {
    return this.props.playlists
  }

  static create(props: UserWithPlaylistsProps) {
    return new UserWithPlaylists(props)
  }
}
