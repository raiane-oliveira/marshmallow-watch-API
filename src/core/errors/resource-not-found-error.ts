import { UseCaseError } from "./use-case-error"

export class ResourceNotFoundError extends Error implements UseCaseError {
  constructor(identifier?: string) {
    super(`Resource not found. Identifier: ${identifier}`)
  }
}
