import bcryptjs from "bcryptjs"
import { HashCompare } from "@/domain/app/cryptography/hash-compare"
import { HashGenerator } from "@/domain/app/cryptography/hash-generator"

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
