export interface HashGenerator {
  hash(plainText: string): Promise<string>
}
