import { createId } from "@paralleldrive/cuid2"

export class UniqueEntityId {
  private value: string

  constructor(value?: string) {
    this.value = value ?? createId()
  }

  toString() {
    return this.value
  }
}
