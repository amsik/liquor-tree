import hierarchy from '@/utils/hierarchy'
import Node from '@/lib/Node'
import { List } from '@/utils/stack'

import { recurseDown } from '@/utils/recurse'

// import EventEmmiter from '@/utils/EventEmmiter'
// export default class Tree extends EventEmmiter {


export default class Tree {
  constructor() {
    this.options = {}
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

    if (!this.options.multiple) {
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
      this.selectedNodes.forEach(node => this.deselect(node))
      this.selectedNodes
        .empty()
        .add(treeNode)
    }

    this.$emit(
      'node:selected',
      treeNode.select()
    )

    return true
  }

  selectAll() {
    if (!this.options.multiple) {
      return false
    }

    this.selectedNodes.empty()

    this.recurseDown(node => {
      node.select()

      this.selectedNodes.add(node)
      this.$emit('node:selected', node)
    })

    return true
  }


  deselect(node) {
    if (!node.selected() || !node.selectable()) {
      return false
    }

    this.$emit(
      'node:deselected',
      node.deselect()
    )

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
        this.checkedNodes.add(child)

        if (!child.checked()) {
          this.$emit(
            'node:checked',
            child.check()
          )
        }
      })
    } else {
      this.checkedNodes.add(node)

      this.$emit(
        'node:checked',
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

        this.checkedNodes.remove(child)

        if (child.checked()) {
          this.$emit(
            'node:unchecked',
            child.uncheck()
          )
        }
      })
    } else {
      this.checkedNodes.remove(node)

      this.$emit(
        'node:unchecked',
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

    this.$emit(
      'node:expanded',
      node.expand()
    )

    return true
  }

  collapse(node) {
    if (!node.expanded()) {
      return false
    }

    this.$emit(
      'node:collapsed',
      node.collapse()
    )

    return true
  }

  toggleExpand(node) {
    if (!node.hasChildren()) {
      return false
    }

    if (node.expanded()) {
      this.collapse(node)
    } else {
      this.expand(node)
    }

    return true
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
