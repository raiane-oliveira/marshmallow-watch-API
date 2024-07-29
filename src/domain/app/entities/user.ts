import { Entity } from "@/core/entities/entity"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { Optional } from "@/core/types/optional"

export interface UserProps {
  name: string
  email: string
  password: string
  avatarUrl?: string | null
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

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: Optional<UserProps, "createdAt">, id?: UniqueEntityId) {
    const user = new User({
      ...props,
      createdAt: props.createdAt ?? new Date(),
    }, id)

    return user
  }
}
