export class Username {
  private value: string

  constructor(username: string) {
    this.value = username
  }

  static create(username: string) {
    const transformedString = username
      .normalize("NFKD")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "")

    return new Username(transformedString)
  }

  static isValid(username: string) {
    const isValidUsername = new RegExp(/^(\w|\-)+$/g)
    return isValidUsername.test(username)
  }

  toString() {
    return this.value
  }

  equals(username: string) {
    return this.value === username
  }
}
