import { Entity } from "@/core/entities/entity"
import type { UniqueEntityId } from "@/core/entities/unique-entity-id"
import type { Optional } from "@/core/types/optional"
import type { Username } from "./value-objects/username"
import { VerificationToken } from "./value-objects/verification-token"

export interface UserProps {
  name: string
  username: Username
  email: string
  password: string
  avatarUrl?: string | null
  verificationToken?: VerificationToken | null
  createdAt: Date
  updatedAt?: Date | null
}

export class User extends Entity<UserProps> {
  private touch() {
    this.props.updatedAt = new Date()
  }

  get name() {
    return this.props.name
  }

  set name(value) {
    this.props.name = value
    this.touch()
  }

  get username() {
    return this.props.username
  }

  set username(value) {
    this.props.username = value
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  get avatarUrl() {
    return this.props.avatarUrl
  }

  set avatarUrl(value) {
    this.props.avatarUrl = value
    this.touch()
  }

  get verificationToken() {
    return this.props.verificationToken
  }

  set verificationToken(value) {
    this.props.verificationToken = value
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: Optional<UserProps, "createdAt">, id?: UniqueEntityId) {
    const user = new User(
      {
        ...props,
        verificationToken: props.verificationToken ?? new VerificationToken(),
        createdAt: props.createdAt ?? new Date(),
      },
      id
    )

    return user
  }
}
