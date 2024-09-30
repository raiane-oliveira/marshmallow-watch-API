import type { UseCaseError } from "./use-case-error"

export class InvalidUsernameError extends Error implements UseCaseError {
  constructor() {
    super("Invalid username")
  }
}
