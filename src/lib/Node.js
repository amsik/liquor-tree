
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

  $emit(evnt, ...args) {
    this.tree.$emit(`node:${evnt}`, this, ...args)
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

    // TODO: check if it for example `selectable` state it should unselect node

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
    if (this.selected()) {
      return this
    }

    this.state('selected', true)
    this.$emit('selected')

    return this
  }

  unselect() {
    if (!this.selected()) {
      return this
    }

    this.state('selected', false)
    this.$emit('unselected')

    return this
  }



  checked() {
    return this.state('checked')
  }

  check() {
    if (this.checked()) {
      return this
    }

    this.state('checked', true)
    this.refreshIndeterminateState()
    this.$emit('checked')

    return this
  }

  uncheck() {
    if (!this.checked()) {
      return this
    }

    this.state('checked', false)
    this.refreshIndeterminateState()
    this.$emit('unchecked')

    return this
  }



  show() {
    if (this.visible()) {
      return this
    }

    this.state('visible', true)
    this.$emit('shown')

    return this
  }

  hide() {
    if (this.hidden()) {
      return this
    }

    this.state('visible', false)
    this.$emit('hidden')

    return this
  }

  visible() {
    return this.state('visible')
  }

  hidden() {
    return !this.state('visible')
  }



  enable() {
    if (this.enabled()) {
      return this
    }

    this.state('disabled', false)
    this.$emit('enabled')

    return this
  }

  enabled() {
    return !this.state('disabled')
  }

  disable() {
    if (this.disabled()) {
      return this
    }

    this.state('disabled', true)
    this.$emit('disabled')

    return this
  }

  disabled() {
    return this.state('disabled')
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
