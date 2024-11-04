import type { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { Media, type MediaProps } from "./media"

export interface TvShowProps extends MediaProps {
  firstAirDate: Date
}

export class TvShow extends Media<TvShowProps> {
  get firstAirDate() {
    return this.props.firstAirDate
  }

  static create(props: TvShowProps, id?: UniqueEntityId) {
    const tvShow = new TvShow(props, id)

    return tvShow
  }
}
