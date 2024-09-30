import type { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { TvShow, type TvShowProps } from "@/domain/app/entities/tv-show"
import { faker } from "@faker-js/faker"

export function makeTvShow(
  override?: Partial<TvShowProps>,
  id?: UniqueEntityId
) {
  const tvShow = TvShow.create(
    {
      title: faker.person.fullName(),
      description: faker.person.bio(),
      genreIds: [],
      imagePath: faker.image.avatar(),
      firstAirDate: faker.date.recent(),
      ...override,
    },
    id
  )

  return tvShow
}
