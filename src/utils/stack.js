
export class List extends Array {
  constructor() {
    super()
  }

  empty() {
    this.length = 0

    return this
  }

  add(...items) {
    this.push(...items)

    return this
  }

  remove(item) {
    this.splice(
      this.indexOf(item),
      1
    )

    return this
  }

  removeAll(item) {
    while(this.includes(item)) {
      this.remove(item)
    }

    return this
  }

  top() {
    return this[this.length - 1]
  }
}
