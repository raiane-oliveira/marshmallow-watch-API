import type { CreatePlaylistDTO } from "@/core/dtos/playlist"
import { type Either, left, right } from "@/core/errors/either"
import { InvalidUsernameError } from "@/core/errors/invalid-username-error"
import type { HashGenerator } from "@/domain/app/cryptography/hash-generator"
import { User } from "@/domain/app/entities/user"
import { Username } from "@/domain/app/entities/value-objects/username"
import { UserAlreadyExistsError } from "@/domain/app/errors/user-already-exists-error"
import type { UsersRepository } from "@/domain/app/repositories/users-repository"

interface CreateUserUseCaseRequest {
  name: string
  username: string
  email: string
  password: string
}

type CreateUserUseCaseResponse = Either<
  UserAlreadyExistsError | InvalidUsernameError,
  {
    user: User
  }
>

export class CreateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator
  ) {}

  async execute({
    name,
    username,
    email,
    password,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    if (!Username.isValid(username)) {
      return left(new InvalidUsernameError())
    }

    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      return left(new UserAlreadyExistsError(userAlreadyExists.email))
    }

    const passwordHashed = await this.hashGenerator.hash(password)

    const user = User.create({
      name,
      username: Username.create(username),
      email,
      password: passwordHashed,
    })

    const willWatchPlaylist: CreatePlaylistDTO = {
      name: "willWatch",
      userId: user.id.toString(),
      isDefault: true,
      color: "#BAE1FF",
      visibility: "private",
    }
    const watchedPlaylist: CreatePlaylistDTO = {
      name: "watched",
      userId: user.id.toString(),
      isDefault: true,
      color: "#FFB3BA",
      visibility: "private",
    }
    const watchingPlaylist: CreatePlaylistDTO = {
      name: "watching",
      userId: user.id.toString(),
      isDefault: true,
      color: "#FFFFBA",
      visibility: "private",
    }

    await this.usersRepository.createWithPlaylists(user, [
      willWatchPlaylist,
      watchedPlaylist,
      watchingPlaylist,
    ])

    return right({
      user,
    })
  }
}
