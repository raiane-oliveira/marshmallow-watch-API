import type { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { Movie, type MovieProps } from "@/domain/app/entities/movie"
import { faker } from "@faker-js/faker"

export function makeMovie(override?: Partial<MovieProps>, id?: UniqueEntityId) {
  const movie = Movie.create(
    {
      title: faker.person.fullName(),
      imagePath: faker.image.avatar(),
      description: faker.person.bio(),
      genreIds: [],
      addedAt: faker.date.recent(),
      releaseAt: faker.date.recent(),
      ...override,
    },
    id
  )

  return movie
}
