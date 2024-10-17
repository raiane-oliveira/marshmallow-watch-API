import type { User } from "@/domain/app/entities/user"

export class UserPublicProfilePresenter {
  static toHTTP(user: User) {
    return {
      id: user.id.toString(),
      name: user.name,
      username: user.username.toString(),
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
}
