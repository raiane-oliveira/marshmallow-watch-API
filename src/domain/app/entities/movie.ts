import { Entity } from "@/core/entities/entity"
import type { UniqueEntityId } from "@/core/entities/unique-entity-id"
import type { Optional } from "@/core/types/optional"

export interface MovieProps {
  title: string
  description: string
  imagePath?: string
  genreIds: UniqueEntityId[]
  releaseAt: Date | null
  addedAt: Date
}

export class Movie extends Entity<MovieProps> {
  get title() {
    return this.props.title
  }

  get description() {
    return this.props.description
  }

  get imagePath() {
    return this.props.imagePath
  }

  get genreIds() {
    return this.props.genreIds
  }

  get releaseAt() {
    return this.props.releaseAt
  }

  get addedAt() {
    return this.props.addedAt
  }

  static create(props: Optional<MovieProps, "addedAt">, id?: UniqueEntityId) {
    return new Movie(
      {
        ...props,
        addedAt: props.addedAt ?? new Date(),
      },
      id
    )
  }
}
