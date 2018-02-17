
export default class Node {
  constructor(tree, item) {
    this.id = item.id
    this.states = item.state

    this.children = item.children || []
    this.parent = item.parent || null

    this._data = Object.assign({}, {
      text: item.text
    }, item.data || {})

    if (!tree) {
      throw new Error('Node must has a Tree context!')
    }

    this.tree = tree
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

  get depth() {
    let depth = 0
    let parent = this.parent

    if (!parent) {
      return depth
    }

    do {
      depth++
    } while(parent = parent.parent)

    return depth
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

  recurseUp(fn, node = this) {
    if (!node.parent) {
      return
    }

    if (false !== fn(node.parent)) {
      return this.recurseUp(fn, node.parent)
    }
  }

  refreshIndeterminateState() {
    this.state('indeterminate', false)

    if (this.hasChildren()) {
      let childrenCount = this.children.length
      let checked = 0
      let indeterminate = 0
      let disabled = 0

      this.children.forEach(child => {
        if (child.checked()) {
          checked++
        }

        if (child.disabled()) {
          disabled++
        }

        if (child.indeterminate()) {
          indeterminate++
        }
      })

      if (checked == childrenCount - disabled) {
        if (!this.checked()) {
          this.check()
        }
      } else {
        if (this.checked()) {
          this.uncheck()
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
    this.$emit('checked')
    this.refreshIndeterminateState()

    return this
  }

  uncheck(ignoreIndeterminate) {
    if (!this.checked()) {
      return this
    }

    this.state('checked', false)
    this.$emit('unchecked')
    this.refreshIndeterminateState()

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

    this.tree.recurseDown(this, node => {
      if (node.disabled()) {
        node.state('disabled', false)
        node.$emit('enabled')
      }
    })

    return this
  }

  enabled() {
    return !this.state('disabled')
  }

  disable() {
    if (this.disabled()) {
      return this
    }

    this.tree.recurseDown(this, node => {
      if (node.enabled()) {
        node.state('disabled', true)
        node.$emit('disabled')
      }
    })

    return this
  }

  disabled() {
    return this.state('disabled')
  }


  expand() {
    if (!this.hasChildren() || this.expanded()) {
      return this
    }

    this.state('expanded', true)
    this.$emit('expanded')

    return this
  }

  expanded() {
    return this.state('expanded')
  }

  collapse() {
    if (!this.hasChildren() || this.collapsed()) {
      return this
    }

    this.state('expanded', false)
    this.$emit('collapsed')

    return this
  }

  collapsed() {
    return !this.state('expanded')
  }

  toggleExpand() {
    return this._toggleOpenedState()
  }

  toggleCollapse() {
    return this._toggleOpenedState()
  }


  _toggleOpenedState() {
    if (this.expanded()) {
      return this.collapse()
    }

    return this.expand()
  }

  index() {
    return this.tree.index(this, verbose)
  }


  first() {
    if (!this.hasChildren()) {
      return null
    }

    return this.children[0]
  }

  last() {
    if (!this.hasChildren()) {
      return null
    }

    return this.children[this.children.length - 1]
  }


  next() {
    return this.tree.nextNode(this)
  }

  prev() {
    return this.tree.prevNode(this)
  }


  focus() {
    if (this.vm) {
      this.vm.focus()
    }
  }

  remove() {
    this.tree.removeNode(this)
    this.$emit('removed')

    return this
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
