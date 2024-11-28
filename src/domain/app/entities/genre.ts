import { Entity } from "@/core/entities/entity"
import type { UniqueEntityId } from "@/core/entities/unique-entity-id"

export interface GenreProps {
  name: string
}

export class Genre extends Entity<GenreProps> {
  get name() {
    return this.props.name
  }

  static create(props: GenreProps, id?: UniqueEntityId) {
    return new Genre(props, id)
  }
}
