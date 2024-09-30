import { Entity } from "@/core/entities/entity"
import type { UniqueEntityId } from "@/core/entities/unique-entity-id"

export interface TvShowProps {
  title: string
  description: string
  imagePath?: string
  genreIds: UniqueEntityId[]
  firstAirDate: Date
}

export class TvShow extends Entity<TvShowProps> {
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

  get firstAirDate() {
    return this.props.firstAirDate
  }

  static create(props: TvShowProps, id?: UniqueEntityId) {
    const tvShow = new TvShow(props, id)

    return tvShow
  }
}
