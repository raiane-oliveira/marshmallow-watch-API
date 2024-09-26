import type { HashCompare } from "@/domain/app/cryptography/hash-compare"
import type { HashGenerator } from "@/domain/app/cryptography/hash-generator"
import bcryptjs from "bcryptjs"

export class BcryptHasher implements HashGenerator, HashCompare {
  private HASH_SALT_LENGTH = 8

  async hash(plainText: string) {
    const hash = await bcryptjs.hash(plainText, this.HASH_SALT_LENGTH)

    return hash
  }

  async compare(plainText: string, hashedText: string) {
    return await bcryptjs.compare(plainText, hashedText)
  }
}
