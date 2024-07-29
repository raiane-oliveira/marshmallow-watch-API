export interface HashCompare {
  compare(plainText: string, hashedText: string): Promise<boolean>
}
