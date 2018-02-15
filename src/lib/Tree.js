import hierarchy from '@/utils/hierarchy'
import objectToNode from '@/utils/objectToNode'
import Node from '@/lib/Node'
import { List } from '@/utils/stack'

import { recurseDown } from '@/utils/recurse'


export default class Tree {
  constructor(vm) {
    this.vm = vm
    this.options = vm.options

    this.setModel(vm.model)
  }

  $on(name, ...args) {
    this.vm.$on(name, ...args)
  }

  $once(name, ...args) {
    this.vm.$once(name, ...args)
  }

  $off(name, ...args) {
    this.vm.$off(name, ...args)
  }

  $emit(name, ...args) {
    this.vm.$emit(name, ...args)
  }

  setModel(model) {
    this.model = model

    /**
    * VueJS transform properties to reactives when constructor is running
    * And we lose List object (extended from Array)
    */
    this.selectedNodes = new List
    this.checkedNodes = new List

    recurseDown(model, node => {
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
    })

    if (!this.options.multiple && this.selectedNodes.length) {
      let top = this.selectedNodes.top()

      this.selectedNodes.forEach(node => {
        if (top !== node) {
          node.state('selected', false)
        }
      })

      this.selectedNodes
        .empty()
        .add(top)
    }
  }

  recurseDown(node, fn) {
    if (!fn && node) {
      fn = node
      node = this.model
    }

    if ('function' != typeof fn) {
      new TypeError('Argument must be a function')
    }

    return recurseDown(node, fn)
  }


  select(node, extendList) {
    if (node.selected() || !node.selectable()) {
      return false
    }

    const treeNode = this.findNode(node)

    if (!treeNode) {
      return false
    }


    if (this.options.multiple && extendList) {
      this.selectedNodes.add(treeNode)
    } else {
      this.selectedNodes.forEach(node => this.unselect(node))
      this.selectedNodes
        .empty()
        .add(treeNode)
    }

    treeNode.select()

    return true
  }

  selectAll() {
    if (!this.options.multiple) {
      return false
    }

    this.selectedNodes.empty()

    this.recurseDown(node => {
      this.selectedNodes.add(
        node.select()
      )
    })

    return true
  }


  unselect(node) {
    if (!node.selected() || !node.selectable()) {
      return false
    }

    node.unselect()

    return true
  }

  deselectAll() {
    this.selectedNodes.forEach(node => {
      this.deselect(node)
    })

    this.selectedNodes.empty()

    return true
  }


  check(node) {
    if (node.checked()) {
      return false
    }

    if (node.indeterminate()) {
      return this.uncheck(node)
    }

    node.state('indeterminate', false)

    if (node.hasChildren()) {
      this.recurseDown(node, child => {
        this.checkedNodes.add(
          child.check()
        )
      })
    } else {
      this.checkedNodes.add(
        node.check()
      )
    }

    if (node.parent) {
      node.parent.refreshIndeterminateState()
    }
  }

  uncheck(node) {
    if (!node.checked() && !node.indeterminate()) {
      return false
    }

    node.state('indeterminate', false)

    if (node.hasChildren()) {
      this.recurseDown(node, child => {
        child.state('indeterminate', false)

        this.checkedNodes.remove(
          child.uncheck()
        )
      })
    } else {
      this.checkedNodes.remove(
        node.uncheck()
      )
    }

    if (node.parent) {
      node.parent.refreshIndeterminateState()
    }
  }


  expand(node) {
    if (node.expanded()) {
      return false
    }

    node.expand()

    return true
  }

  collapse(node) {
    if (node.collapsed()) {
      return false
    }

    node.collapse()

    return true
  }

  toggleExpand(node) {
    if (!node.hasChildren()) {
      return false
    }

    node.toggleExpand()

    return true
  }

  toggleCollapse(node) {
    if (!node.hasChildren()) {
      return false
    }

    node.toggleCollapse()

    return true
  }

  addToModel(node, index = this.model.length) {
    this.model.splice(index, 0, node)
    this.recurseDown(node, n => {
      n.tree = this
    })
  }


  append(node) {
    node = objectToNode(node)

    this.addToModel(node)

    return node
  }

  prepend(node) {
    node = objectToNode(node)

    this.addToModel(node, 0)

    return node
  }

  addNode(node) {
    const index = this.model.length

    node = objectToNode(node)

    this.model.splice(index, 0, node)
    this.$emit('node:added', node)

    return node
  }

  removeNode(node) {
    if (!node.parent) {
      this.model.splice(
        this.model.indexOf(node),
        1
      )
    } else {
      node.parent.children.splice(
        node.parent.children.indexOf(node),
        1
      )
    }

    this.selectedNodes.remove(node)
    this.checkedNodes.remove(node)

    return node
  }


  findNode(node) {
    if ('string' == typeof node) {
      // find by id
    } else if (node instanceof Node)  {
      return node
    }
  }


  static parseModel(data) {
    return hierarchy(data)
  }
}
