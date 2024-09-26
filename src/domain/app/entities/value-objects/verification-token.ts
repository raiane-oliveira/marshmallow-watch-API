import { randomBytes } from "node:crypto"

export class VerificationToken {
  private value: string

  constructor(code?: string | null) {
    this.value = code ?? randomBytes(32).toString("hex")
  }

  toString() {
    return this.value
  }
}
