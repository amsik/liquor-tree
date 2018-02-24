
export class List extends Array {
  empty() {
    this.splice(0, this.length)

    return this
  }

  add(...items) {
    this.push(...items)

    return this
  }

  remove(item) {
    let index = this.indexOf(item)

    if (-1 == index) {
      return this
    }

    this.splice(index, 1)

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
