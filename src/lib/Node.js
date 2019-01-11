import { recurseDown } from '@/utils/recurse'
import find from '@/utils/find'
import uuidV4 from '@/utils/uuidV4'
import Selection from '@/lib/Selection'

export default class Node {
  constructor (tree, item) {
    if (!item) {
      throw new Error('Node can not be empty')
    }

    this.id = item.id || uuidV4()
    this.states = item.state || {}

    this.showChildren = true
    this.children = item.children || []
    this.parent = item.parent || null

    this.isBatch = item.isBatch || false
    this.isEditing = false

    this.data = Object.assign({}, item.data || {}, {
      text: item.text
    })

    if (!tree) {
      throw new Error('Node must has a Tree context!')
    }

    this.tree = tree
  }

  $emit (evnt, ...args) {
    this.tree.$emit(`node:${evnt}`, this, ...args)
  }

  getPath () {
    if (!this.parent) {
      return [this]
    }

    const path = [this]
    let el = this

    while ((el = el.parent) !== null) {
      path.push(el)
    }

    return path
  }

  get key () {
    return this.id + this.text
  }

  get depth () {
    let depth = 0
    let parent = this.parent

    if (!parent || this.showChildren === false) {
      return depth
    }

    do {
      depth++
    } while (parent = parent.parent)

    return depth
  }

  get text () {
    return this.data.text
  }

  set text (text) {
    const oldText = this.text

    if (oldText !== text) {
      this.data.text = text
      this.$emit('text:changed', text, oldText)
    }
  }

  state (name, value) {
    if (undefined === value) {
      return this.states[name]
    }

    // TODO: check if it for example `selectable` state it should unselect node

    this.states[name] = value

    return this
  }

  recurseUp (fn, node = this) {
    if (!node.parent) {
      return
    }

    if (fn(node.parent) !== false) {
      return this.recurseUp(fn, node.parent)
    }
  }

  recurseDown (fn, ignoreThis) {
    if (ignoreThis !== true) {
      fn(this)
    }

    if (this.hasChildren()) {
      recurseDown(this.children, fn)
    }
  }

  refreshIndeterminateState () {
    if (!this.tree.options.autoCheckChildren) {
      return this
    }

    this.state('indeterminate', false)

    if (this.hasChildren()) {
      const childrenCount = this.children.length
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

      if (checked > 0 && checked === childrenCount - disabled) {
        if (!this.checked()) {
          this.state('checked', true)
          this.tree.check(this)

          this.$emit('checked')
        }
      } else {
        if (this.checked()) {
          this.state('checked', false)
          this.tree.uncheck(this)

          this.$emit('unchecked')
        }

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

  indeterminate () {
    return this.state('indeterminate')
  }

  editable () {
    return !this.state('disabled') && this.state('editable')
  }

  selectable () {
    return !this.state('disabled') && this.state('selectable')
  }

  selected () {
    return this.state('selected')
  }

  select (extendList) {
    if (!this.selectable() || this.selected()) {
      return this
    }

    this.tree.select(this, extendList)

    this.state('selected', true)
    this.$emit('selected')

    return this
  }

  unselect () {
    if (!this.selectable() || !this.selected()) {
      return this
    }

    this.tree.unselect(this)

    this.state('selected', false)
    this.$emit('unselected')

    return this
  }

  checked () {
    return this.state('checked')
  }

  check () {
    if (this.checked() || this.disabled()) {
      return this
    }

    if (this.indeterminate()) {
      return this.uncheck()
    }

    if (this.tree.options.autoCheckChildren) {
      this.recurseDown(node => {
        node.state('indeterminate', false)

        if (!node.checked()) {
          this.tree.check(node)

          node.state('checked', true)
          node.$emit('checked')
        }
      })

      if (this.parent) {
        this.parent.refreshIndeterminateState()
      }
    } else {
      this.tree.check(this)

      this.state('checked', true)
      this.$emit('checked')
    }

    return this
  }

  uncheck () {
    if (!this.indeterminate() && !this.checked() || this.disabled()) {
      return this
    }

    if (this.tree.options.autoCheckChildren) {
      this.recurseDown(node => {
        node.state('indeterminate', false)

        if (node.checked()) {
          this.tree.uncheck(node)

          node.state('checked', false)
          node.$emit('unchecked')
        }
      })

      if (this.parent) {
        this.parent.refreshIndeterminateState()
      }
    } else {
      this.tree.uncheck(this)

      this.state('checked', false)
      this.$emit('unchecked')
    }

    return this
  }

  show () {
    if (this.visible()) {
      return this
    }

    this.state('visible', true)
    this.$emit('shown')

    return this
  }

  hide () {
    if (this.hidden()) {
      return this
    }

    this.state('visible', false)
    this.$emit('hidden')

    return this
  }

  visible () {
    return this.state('visible')
  }

  hidden () {
    return !this.state('visible')
  }

  enable () {
    if (this.enabled()) {
      return this
    }

    if (!this.tree.options.autoDisableChildren) {
      this.recurseDown(node => {
        if (node.disabled()) {
          node.state('disabled', false)
          node.$emit('enabled')
        }
      })
    } else {
      this.state('disabled', false)
      this.$emit('enabled')
    }

    return this
  }

  enabled () {
    return !this.state('disabled')
  }

  disable () {
    if (this.disabled()) {
      return this
    }

    if (this.tree.options.autoDisableChildren) {
      this.recurseDown(node => {
        if (node.enabled()) {
          node.state('disabled', true)
          node.$emit('disabled')
        }
      })
    } else {
      this.state('disabled', true)
      this.$emit('disabled')
    }

    return this
  }

  disabled () {
    return this.state('disabled')
  }

  expandTop (ignoreEvent) {
    this.recurseUp(parent => {
      parent.state('expanded', true)

      if (ignoreEvent !== true) {
        this.$emit('expanded', parent)
      }
    })
  }

  expand () {
    if (!this.canExpand()) {
      return this
    }

    if (this.isBatch) {
      this.tree.loadChildren(this).then(_ => {
        this.state('expanded', true)
        this.$emit('expanded')
      })
    } else {
      this.state('expanded', true)
      this.$emit('expanded')
    }

    return this
  }

  canExpand () {
    return this.collapsed() &&
      this.hasChildren() &&
      (!this.tree.autoDisableChildren || this.disabled())
  }

  canCollapse () {
    return this.expanded() &&
      this.hasChildren() &&
      (!this.tree.autoDisableChildren || this.disabled())
  }

  expanded () {
    return this.state('expanded')
  }

  collapse () {
    if (!this.canCollapse()) {
      return this
    }

    this.state('expanded', false)
    this.$emit('collapsed')

    return this
  }

  collapsed () {
    return !this.state('expanded')
  }

  toggleExpand () {
    return this._toggleOpenedState()
  }

  toggleCollapse () {
    return this._toggleOpenedState()
  }

  _toggleOpenedState () {
    if (this.canCollapse()) {
      return this.collapse()
    } else if (this.canExpand()) {
      return this.expand()
    }
  }

  isDropable () {
    return this.enabled() && this.state('dropable')
  }

  isDraggable () {
    return this.enabled() && this.state('draggable') && !this.isEditing
  }

  startDragging () {
    if (!this.isDraggable() || this.state('dragging')) {
      return false
    }

    // root element
    if (this.isRoot() && this.tree.model.length === 1) {
      return false
    }

    if (this.tree.options.store) {
      this.tree.__silence = true
    }

    this.select()
    this.state('dragging', true)
    this.$emit('dragging:start')

    this.tree.__silence = false

    return true
  }

  finishDragging (destination, destinationPosition) {
    if (!destination.isDropable() && destinationPosition === 'drag-on') {
      return
    }

    const tree = this.tree
    const clone = this.clone()
    const parent = this.parent

    clone.id = this.id
    tree.__silence = true

    if (destinationPosition === 'drag-on') {
      tree.append(destination, clone)
    } else if (destinationPosition === 'drag-below') {
      tree.after(destination, clone)
    } else if (destinationPosition === 'drag-above') {
      tree.before(destination, clone)
    }

    this.remove()

    destination.refreshIndeterminateState()

    parent && parent.refreshIndeterminateState()
    tree.__silence = false

    clone.state('dragging', false)
    this.state('dragging', false)
    this.$emit('dragging:finish')

    if (clone.state('selected')) {
      tree.selectedNodes.remove(this)
      tree.selectedNodes.add(clone)

      tree.vm.$set(this.state, 'selected', false)
      tree.vm.$set(clone.state, 'selected', true)
    }

    if (this.tree.options.store) {
      this.tree.vm.$emit('LIQUOR_NOISE')
    }
  }

  startEditing () {
    if (this.disabled()) {
      return false
    }

    if (!this.isEditing) {
      this.tree._editingNode = this
      this.tree.activeElement = this
      this.isEditing = true
      this.$emit('editing:start')
    }
  }

  stopEditing (newText) {
    if (!this.isEditing) {
      return
    }

    this.isEditing = false
    this.tree._editingNode = null
    this.tree.activeElement = null

    if (newText && newText !== false && this.text !== newText) {
      this.text = newText
    }

    this.$emit('editing:stop', this.text === newText)
  }

  index (verbose) {
    return this.tree.index(this, verbose)
  }

  first () {
    if (!this.hasChildren()) {
      return null
    }

    return this.children[0]
  }

  last () {
    if (!this.hasChildren()) {
      return null
    }

    return this.children[this.children.length - 1]
  }

  next () {
    return this.tree.nextNode(this)
  }

  prev () {
    return this.tree.prevNode(this)
  }

  insertAt (node, index = this.children.length) {
    if (!node) {
      return
    }

    node = this.tree.objectToNode(node)

    if (Array.isArray(node)) {
      node
        .reverse()
        .map(n => this.insertAt(n, index))

      return new Selection(this.tree, [...node])
    }

    node.parent = this

    this.children.splice(
      index, 0, node
    )

    if (node.disabled() && node.hasChildren()) {
      node.recurseDown(child => {
        child.state('disabled', true)
      })
    }

    if (!this.isBatch) {
      this.$emit('added', node)
    }

    return node
  }

  addChild (node) {
    return this.insertAt(node)
  }

  append (node) {
    return this.addChild(node)
  }

  prepend (node) {
    return this.insertAt(node, 0)
  }

  before (node) {
    return this.tree.before(this, node)
  }

  after (node) {
    return this.tree.after(this, node)
  }

  empty () {
    let node

    while (node = this.children.pop()) {
      node.remove()
    }

    return this
  }

  remove () {
    return this.tree.removeNode(this)
  }

  removeChild (criteria) {
    const node = this.find(criteria)

    if (node) {
      return this.tree.removeNode(node)
    }

    return null
  }

  find (criteria, deep) {
    if (this.tree.isNode(criteria)) {
      return criteria
    }

    return find(this.children, criteria, deep)
  }

  focus () {
    if (this.vm) {
      this.vm.focus()
    }
  }

  hasChildren () {
    return this.showChildren && this.isBatch || this.children.length > 0
  }

  /**
  * Sometimes it's no need to have a parent. It possible to have more than 1 parent
  */
  isRoot () {
    return this.parent === null
  }

  clone () {
    return this.tree.objectToNode(this.toJSON())
  }

  toJSON () {
    return {
      text: this.text,
      data: this.data,
      state: this.states,
      children: this.children.map(node => this.tree.objectToNode(node).toJSON())
    }
  }
}
