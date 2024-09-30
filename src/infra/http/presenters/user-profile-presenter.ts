import type { User } from "@/domain/app/entities/user"

export abstract class UserProfilePresenter {
  static toHTTP(user: User) {
    return {
      id: user.id.toString(),
      name: user.name,
      username: user.username.toString(),
      email: user.email,
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
}
