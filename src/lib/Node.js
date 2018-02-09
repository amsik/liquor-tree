
export default class Node {
  constructor(data) {
    this.id = data.id
    this.states = data.state
    this.text = data.text
    this.children = data.children || []
    this.parent = data.parent || null
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
