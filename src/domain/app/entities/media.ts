import { Entity } from "@/core/entities/entity"
import type { UniqueEntityId } from "@/core/entities/unique-entity-id"

export interface MediaProps {
  title: string
  description: string
  imagePath?: string
  genreIds: UniqueEntityId[]
  popularity: number
}

export class Media<
  Props extends MediaProps = MediaProps,
> extends Entity<Props> {
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

  get popularity() {
    return this.props.popularity
  }

  static create(props: MediaProps, id?: UniqueEntityId) {
    return new Media(props, id)
  }
}
