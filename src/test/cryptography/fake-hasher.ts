import type { HashCompare } from "@/domain/app/cryptography/hash-compare"
import type { HashGenerator } from "@/domain/app/cryptography/hash-generator"

export class FakeHasher implements HashGenerator, HashCompare {
  async hash(plainText: string) {
    return plainText.concat("-hashed")
  }

  async compare(plainText: string, hashedText: string) {
    return plainText.concat("-hashed") === hashedText
  }
}
