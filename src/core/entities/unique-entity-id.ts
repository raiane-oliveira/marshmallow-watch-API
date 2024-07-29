import { randomUUID } from "crypto"

export class UniqueEntityId {
  private value: string

  constructor(value?: string) {
    this.value = value ?? randomUUID()
  }

  toString() {
    return this.value
  }
}
