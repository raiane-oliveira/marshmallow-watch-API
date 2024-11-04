import type { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { Media, type MediaProps } from "./media"

export interface MovieProps extends MediaProps {
  releaseAt: Date | null
}

export class Movie extends Media<MovieProps> {
  get releaseAt() {
    return this.props.releaseAt
  }

  static create(props: MovieProps, id?: UniqueEntityId) {
    return new Movie(props, id)
  }
}
