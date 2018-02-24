
const keyCodes = {
  'ARROW_LEFT': 37,
  'ARROW_TOP': 38,
  'ARROW_RIGHT': 39,
  'ARROW_BOTTOM': 40,
  'SPACE': 32,
  'DELETE': 46
}

const codesArr = [37, 38, 39, 40, 32]


function focusUp(tree, node) {
  let prevNode = tree.prevVisibleNode(node)

  if (!prevNode) {
    return
  }

  if (prevNode.disabled()) {
    return focusUp(tree, prevNode)
  }

  prevNode.focus()
}

function focusdDown(tree, node) {
  let nextNode = tree.nextVisibleNode(node)

  if (!nextNode) {
    return
  }

  if (nextNode.disabled()) {
    return focusdDown(tree, nextNode)
  }

  nextNode.focus()
}

function checkNode(tree, node) {
  if (node.checked()) {
    node.uncheck()
  } else {
    node.check()
  }
}

function leftArrow(tree, node) {
  if (node.expanded()) {
    node.collapse()
  } else {
    let parent = node.parent

    if (parent) {
      parent.focus()
    }
  }
}

function rightArrow(tree, node) {
  if (node.collapsed()) {
    node.expand()
  } else {
    let first = node.first()

    if (first) {
      first.focus()
    }
  }
}

function deleteNode(tree, node) {
  const deletion = tree.options.deletion

  if (deletion) {
    if ('function' == typeof deletion) {
      if (true === deletion(node)) {
        node.remove()
      }
    } else if (true === deletion) {
      node.remove()
    }
  }
}


export default function(tree) {
  const vm = tree.vm
  const $el = vm.$el

  $el.addEventListener('keydown', e => {
    let code = e.keyCode
    let node = tree.activeElement

    if (!tree.isNode(node)) {
      return
    }

    if (codesArr.includes(code)) {
      e.preventDefault()
      e.stopPropagation()
    }

    switch(code) {
      case keyCodes.ARROW_LEFT: return leftArrow(tree, node)
      case keyCodes.ARROW_RIGHT: return rightArrow(tree, node)
      case keyCodes.ARROW_TOP: return focusUp(tree, node)
      case keyCodes.ARROW_BOTTOM: return focusdDown(tree, node)
      case keyCodes.SPACE: return checkNode(tree, node)
      case keyCodes.DELETE: return deleteNode(tree, node)
    }
  }, true)

};
