import { Entity } from "@/core/entities/entity"
import type { UniqueEntityId } from "@/core/entities/unique-entity-id"

export interface MovieProps {
  title: string
  description: string
  imagePath?: string
  genreIds: UniqueEntityId[]
  releaseAt: Date | null
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

  static create(props: MovieProps, id?: UniqueEntityId) {
    return new Movie(props, id)
  }
}
