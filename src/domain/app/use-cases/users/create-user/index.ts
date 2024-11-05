import { type Either, left, right } from "@/core/errors/either"
import { InvalidUsernameError } from "@/core/errors/invalid-username-error"
import type { HashGenerator } from "@/domain/app/cryptography/hash-generator"
import { Playlist } from "@/domain/app/entities/playlist"
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
    playlists: Playlist[]
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

    const willWatchPlaylist = Playlist.create({
      name: "willWatch",
      userId: user.id,
      color: "#BAE1FF",
      mediasId: [],
      visibility: "private",
    })
    const watchedPlaylist = Playlist.create({
      name: "watched",
      userId: user.id,
      color: "#FFB3BA",
      mediasId: [],
      visibility: "private",
    })
    const watchingPlaylist = Playlist.create({
      name: "watching",
      userId: user.id,
      color: "#FFFFBA",
      mediasId: [],
      visibility: "private",
    })

    await this.usersRepository.createWithPlaylists(user, [
      willWatchPlaylist,
      watchedPlaylist,
      watchingPlaylist,
    ])

    return right({
      user,
      playlists: [willWatchPlaylist, watchedPlaylist, watchingPlaylist],
    })
  }
}
