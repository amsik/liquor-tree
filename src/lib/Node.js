
export default class Node {
  constructor(data) {
    this.id = data.id
    this.states = data.state

    this.children = data.children || []
    this.parent = data.parent || null

    this._data = Object.assign({}, {
      text: data.text
    }, data.data || {})

    if (data.tree) {
      this.tree = data.tree
    }
  }

  get text() {
    return this.data('text')
  }

  set text(text) {
    let oldText = this.text

    this.data('text', text)
    this.tree.$emit('node:text:changed', text, oldText)
  }

  data(name, value) {
    if (undefined === value) {
      return this._data[name]
    }

    this._data[name] = value
    return this
  }

  state(name, value) {
    if (undefined === value) {
      return this.states[name]
    }

    this.states[name] = value
    return this
  }

  refreshIndeterminateState() {
    this.state('indeterminate', false);

    if (this.hasChildren()) {
      let childrenCount = this.children.length
      let checked = 0
      let indeterminate = 0

      this.children.forEach(child => {
        if (child.checked()) {
          checked++
        }

        if (child.indeterminate()) {
          indeterminate++
        }
      })

      if (checked == childrenCount) {
        if (!this.checked()) {
          this.tree.$emit(
            'node:checked',
            this.check()
          )
        }
      } else {
        if (this.checked()) {
          this.tree.$emit(
            'node:unchecked',
            this.uncheck()
          )
        }
      }

      if (!this.checked()) {
        this.state(
          'indeterminate',
          indeterminate > 0 || (checked > 0 && checked < childrenCount)
        )
      }
    }

    if (this.parent) {
      this.parent.refreshIndeterminateState()
    }
  }


  indeterminate() {
    return this.state('indeterminate')
  }


  selectable() {
    return this.state('selectable')
  }

  selected() {
    return this.state('selected')
  }

  select() {
    return this.state('selected', true)
  }

  deselect() {
    return this.state('selected', false)
  }


  checked() {
    return this.state('checked')
  }

  check() {
    return this.state('checked', true)
  }

  uncheck() {
    return this.state('checked', false)
  }


  expanded() {
    return this.state('expanded')
  }

  toggleExpand() {
    return this.toggleState('expanded')
  }

  collapse() {
    return this.state('expanded', false)
  }

  expand() {
    return this.state('expanded', true)
  }

  remove() {
    return this.tree.removeNode(this)
  }


  toggleState(state) {
    if (state in this.states) {
      this.states[state] = !this.states[state]
    }
  }

  hasChildren() {
    return this.children.length > 0
  }

  /**
  * Sometimes it's no need to have a parent. It possible to have more than 1 parent
  */
  isRoot() {
    return null === this.parent
  }
}
