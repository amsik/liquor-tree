import Node from '../lib/Node'
import Selection from '../lib/Selection'

import find from '../utils/find'
import objectToNode from '../utils/objectToNode'
import { List } from '../utils/stack'
import { TreeParser } from '../utils/treeParser'
import { recurseDown } from '../utils/recurse'
import { get, createTemplate } from '../utils/request'
import sort from '../utils/sort'
import fetchDelay from '../utils/fetchDelay'

export default class Tree {
  constructor (vm) {
    this.vm = vm
    this.options = vm.opts

    this.activeElement = null

    // We have to convert 'fetchData' to function. It must return Promise always
    const fetchData = this.options.fetchData

    if (typeof fetchData === 'string') {
      this.options.fetchData = ((template) => {
        const urlTemplate = createTemplate(template)

        return node => {
          return get(urlTemplate(node)).catch(this.options.onFetchError)
        }
      })(fetchData)
    }
  }

  $on (name, ...args) {
    this.vm.$on(name, ...args)
  }

  $once (name, ...args) {
    this.vm.$once(name, ...args)
  }

  $off (name, ...args) {
    this.vm.$off(name, ...args)
  }

  $emit (name, ...args) {
    if (this.__silence) {
      return
    }

    this.vm.$emit(name, ...args)

    if (this.options.store) {
      this.vm.$emit('LIQUOR_NOISE')
    }
  }

  _sort (source, compareFn, deep) {
    if (deep !== false) {
      this.recurseDown(source, node => {
        if (node.hasChildren()) {
          sort(node.children, compareFn)
        }
      })
    }

    sort(source, compareFn)
  }

  sortTree (compareFn, deep) {
    this._sort(this.model, compareFn, deep)
  }

  sort (query, compareFn, deep) {
    const targetNode = this.find(query, true)

    if (!targetNode || !compareFn) {
      return
    }

    targetNode.forEach(node => {
      this._sort(node.children, compareFn, deep)
    })
  }

  clearFilter () {
    this.recurseDown(node => {
      node.state('matched', false)
      node.state('visible', true)
      node.state('expanded', node.__expanded)

      node.__expanded = undefined
      node.showChildren = true
    })

    this.vm.matches.splice(0)
    this.vm.$emit('tree:filtered', [], '')
  }

  filter (query) {
    if (!query) {
      return this.clearFilter()
    }

    const matches = []
    const predicate = this.options.filter.matcher
    const { showChildren, plainList } = this.options.filter

    // collect nodes
    this.recurseDown(node => {
      if (predicate(query, node)) {
        matches.push(node)
      }

      node.showChildren = true

      // save prev `expanded` state
      if (undefined === node.__expanded) {
        node.__expanded = node.state('expanded')
      }

      node.state('visible', false)
      node.state('matched', false)
      node.state('expanded', true)
    })

    matches.reverse().forEach(node => {
      node.state('matched', true)
      node.state('visible', true)

      node.showChildren = !plainList

      if (node.hasChildren()) {
        node.recurseDown(n => {
          n.state('visible', !!showChildren)
        }, true)
      }

      node.recurseUp(parent => {
        parent.state('visible', true)
        parent.state('expanded', true)
      })

      if (node.hasChildren()) {
        node.state('expanded', false)
      }
    })

    this.vm.matches = matches

    this.vm.$emit('tree:filtered', matches, query)

    return matches
  }

  selected () {
    return new Selection(this, ...this.selectedNodes)
  }

  checked () {
    if (!this.options.checkbox) {
      return null
    }

    return new Selection(this, ...this.checkedNodes)
  }

  loadChildren (node) {
    if (!node) {
      return
    }

    this.$emit('tree:data:fetch', node)

    if (this.options.minFetchDelay > 0 && node.vm) {
      node.vm.loading = true
    }

    const result = this.fetch(node)
      .then(children => {
        node.append(children)
        node.isBatch = false

        if (this.options.autoCheckChildren) {
          if (node.checked()) {
            node.recurseDown(child => {
              child.state('checked', true)
            })
          }

          node.refreshIndeterminateState()
        }

        this.$emit('tree:data:received', node)
      })

    return Promise.all([
      fetchDelay(this.options.minFetchDelay),
      result
    ]).then(_ => {
      if (node.vm) {
        node.vm.loading = false
      }

      return result
    })
  }

  fetch (node, parseData) {
    let result = this.options.fetchData(node)

    if (!result.then) {
      result = get(result)
        .catch(this.options.onFetchError)
    }

    if (parseData === false) {
      return result
    }

    return result
      .then(data => {
        try {
          return this.parse(data, this.options.modelParse)
        } catch (e) {
          throw new Error(e)
        }
      })
      .catch(this.options.onFetchError)
  }

  fetchInitData () {
    // simulate root node
    const node = {
      id: 'root',
      name: 'root'
    }

    return this.fetch(node, false)
  }

  setModel (data) {
    return new Promise(resolve => {
      this.model = this.parse(data, this.options.modelParse)

      /* eslint-disable */
      requestAnimationFrame(_ => {
        this.vm.model = this.model
        resolve()
      })
      /* eslint-enable */

      /**
      * VueJS transform properties to reactives when constructor is running
      * And we lose List object (extended from Array)
      */
      this.selectedNodes = new List()
      this.checkedNodes = new List()

      recurseDown(this.model, node => {
        node.tree = this

        if (node.selected()) {
          this.selectedNodes.add(node)
        }

        if (node.checked()) {
          this.checkedNodes.add(node)

          if (node.parent) {
            node.parent.refreshIndeterminateState()
          }
        }

        if (this.options.autoDisableChildren && node.disabled()) {
          node.recurseDown(child => {
            child.state('disabled', true)
          })
        }
      })

      if (!this.options.multiple && this.selectedNodes.length) {
        const top = this.selectedNodes.top()

        this.selectedNodes.forEach(node => {
          if (top !== node) {
            node.state('selected', false)
          }
        })

        this.selectedNodes
          .empty()
          .add(top)
      }

      // Nodes can't be selected on init. By it's possible to select through API
      if (this.options.checkOnSelect && this.options.checkbox) {
        this.unselectAll()
      }
    })
  }

  recurseDown (node, fn) {
    if (!fn && node) {
      fn = node
      node = this.model
    }

    if (typeof fn !== 'function') {
      new TypeError('Argument must be a function')
    }

    return recurseDown(node, fn)
  }

  select (node, extendList) {
    const treeNode = this.getNode(node)

    if (!treeNode) {
      return false
    }

    if (this.options.multiple && extendList) {
      this.selectedNodes.add(treeNode)
    } else {
      this.unselectAll()
      this.selectedNodes
        .empty()
        .add(treeNode)
    }

    return true
  }

  selectAll () {
    if (!this.options.multiple) {
      return false
    }

    this.selectedNodes.empty()

    this.recurseDown(node => {
      this.selectedNodes.add(
        node.select(true)
      )
    })

    return true
  }

  unselect (node) {
    const treeNode = this.getNode(node)

    if (!treeNode) {
      return false
    }

    this.selectedNodes.remove(treeNode)

    return true
  }

  unselectAll () {
    let node

    while (node = this.selectedNodes.pop()) {
      node.unselect()
    }

    return true
  }

  check (node) {
    this.checkedNodes.add(node)
  }

  uncheck (node) {
    this.checkedNodes.remove(node)
  }

  checkAll () {
    this.recurseDown(node => {
      if (node.depth === 0) {
        if (node.indeterminate()) {
          node.state('indeterminate', false)
        }

        node.check()
      }
    })
  }

  uncheckAll () {
    let node

    while (node = this.checkedNodes.pop()) {
      node.uncheck()
    }

    return true
  }

  expand (node) {
    if (node.expanded()) {
      return false
    }

    node.expand()

    return true
  }

  collapse (node) {
    if (node.collapsed()) {
      return false
    }

    node.collapse()

    return true
  }

  toggleExpand (node) {
    if (!node.hasChildren()) {
      return false
    }

    node.toggleExpand()

    return true
  }

  toggleCollapse (node) {
    if (!node.hasChildren()) {
      return false
    }

    node.toggleCollapse()

    return true
  }

  expandAll () {
    this.recurseDown(node => {
      if (node.hasChildren() && node.collapsed()) {
        node.expand()
      }
    })
  }

  collapseAll () {
    this.recurseDown(node => {
      if (node.hasChildren() && node.expanded()) {
        node.collapse()
      }
    })
  }

  index (node, verbose) {
    let target = node.parent

    if (target) {
      target = target.children
    } else {
      target = this.model
    }

    const index = target.indexOf(node)

    if (verbose) {
      return {
        index: index,
        target,
        node: target[index]
      }
    }

    return index
  }

  nextNode (node) {
    const { target, index } = this.index(node, true)

    return target[index + 1] || null
  }

  nextVisibleNode (node) {
    if (node.hasChildren() && node.expanded()) {
      return node.first()
    }

    const nextNode = this.nextNode(node)

    if (!nextNode && node.parent) {
      return node.parent.next()
    }

    return nextNode
  }

  prevNode (node) {
    const { target, index } = this.index(node, true)

    return target[index - 1] || null
  }

  prevVisibleNode (node) {
    const prevNode = this.prevNode(node)

    if (!prevNode) {
      return node.parent
    }

    if (prevNode.hasChildren() && prevNode.expanded()) {
      return prevNode.last()
    }

    return prevNode
  }

  addToModel (node, index = this.model.length) {
    node = this.objectToNode(node)

    this.model.splice(index, 0, node)
    this.recurseDown(node, n => {
      n.tree = this
    })

    this.$emit('node:added', node)

    return node
  }

  append (criteria, node) {
    const targetNode = this.find(criteria)

    if (targetNode) {
      return targetNode.append(node)
    }

    return false
  }

  prepend (criteria, node) {
    const targetNode = this.find(criteria)

    if (targetNode) {
      return targetNode.prepend(node)
    }

    return false
  }

  before (targetNode, sourceNode) {
    targetNode = this.find(targetNode)

    const position = this.index(targetNode, true)
    const node = this.objectToNode(sourceNode)

    if (!~position.index) {
      return false
    }

    position.target.splice(
      position.index,
      0,
      node
    )

    node.parent = targetNode.parent
    this.$emit('node:added', node)

    return node
  }

  after (targetNode, sourceNode) {
    targetNode = this.find(targetNode)

    const position = this.index(targetNode, true)
    const node = this.objectToNode(sourceNode)

    if (!~position.index) {
      return false
    }

    position.target.splice(
      position.index + 1,
      0,
      node
    )

    node.parent = targetNode.parent
    this.$emit('node:added', node)

    return node
  }

  addNode (node) {
    const index = this.model.length

    node = objectToNode(node)

    this.model.splice(index, 0, node)
    this.$emit('node:added', node)

    return node
  }

  remove (criteria, multiple) {
    return this.removeNode(
      this.find(criteria, multiple)
    )
  }

  removeNode (node) {
    if (node instanceof Selection) {
      return node.remove()
    }

    if (!node) {
      return false
    }

    if (!node.parent) {
      if (~this.model.indexOf(node)) {
        this.model.splice(
          this.model.indexOf(node),
          1
        )
      }
    } else {
      const children = node.parent.children

      if (~children.indexOf(node)) {
        children.splice(
          children.indexOf(node),
          1
        )
      }
    }

    if (node.parent) {
      if (node.parent.indeterminate() && !node.parent.hasChildren()) {
        node.parent.state('indeterminate', false)
      }
    }

    if (this.activeElement !== null) {
      if (node.id === this.activeElement.id) {
        this.activeElement = null
      }
    }

    node.parent = null

    this.$emit('node:removed', node)

    this.selectedNodes.remove(node)
    this.checkedNodes.remove(node)

    const matches = this.vm.matches

    if (matches && matches.length) {
      if (matches.includes(node)) {
        matches.splice(
          matches.indexOf(node),
          1
        )
      }
    }

    return node
  }

  isNode (node) {
    return node instanceof Node
  }

  find (criteria, multiple) {
    if (this.isNode(criteria)) {
      return criteria
    }

    const result = find(this.model, criteria)

    if (!result || !result.length) {
      return new Selection(this, [])
    }

    if (multiple === true) {
      return new Selection(this, result)
    }

    return new Selection(this, [result[0]])
  }

  updateData (criteria, callback) {
    const nodes = this.find(criteria)

    nodes.forEach(node => node.setData(callback(node)))

    return nodes
  }

  getNodeById (id) {
    let targetNode = null

    recurseDown(this.model, node => {
      if ('' + node.id === id) {
        targetNode = node
        return false
      }
    })

    return targetNode
  }

  getNode (node) {
    if (this.isNode(node)) {
      return node
    }

    return null
  }

  objectToNode (obj) {
    return objectToNode(this, obj)
  }

  parse (data, options) {
    if (!options) {
      options = this.options.propertyNames
    }

    try {
      return TreeParser.parse(data, this, options)
    } catch (e) {
      return []
    }
  }
}
