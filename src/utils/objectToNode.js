import Node from '@/lib/Node'
import uuidV4 from '@/utils/uuidV4'

const nodeStates = {
  selected: false,
  selectable: true,
  checked: false,
  expanded: false,
  disabled: false,
  indeterminate: false
}

function merge(state = {}) {
  return Object.assign({}, nodeStates, state)
}

export default function objectToNode(obj) {
  let node = null

  if ('string' == typeof obj) {
    node = new Node({
      text: obj,
      state: merge(),
      id: uuidV4()
    })
  } else if (Array.isArray(obj)) {

  } else {
    node = new Node(obj)
    node.states = merge(node.states)

    if (!node.id) {
      node.id = uuidV4()
    }

    if (node.children.length) {
      node.children = node.children.map(child => {
        child = objectToNode(child)
        child.parent = node

        return child
      })
    }
  }

  return node
}
