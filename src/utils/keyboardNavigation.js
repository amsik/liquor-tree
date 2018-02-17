
const keyCodes = {
  'ARROW_LEFT': 37,
  'ARROW_TOP': 38,
  'ARROW_RIGHT': 39,
  'ARROW_BOTTOM': 40,
  'SPACE': 32
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
    tree.uncheck(node)
  } else {
    tree.check(node)
  }
}


console.log(`навигация КАК в сайдбаре винды.
  Для чуваков, которые имеют детей:
    Стрелка вправо - открываем. Если открыто, то делаем имитацию СТРЕЛКИ ВНИЗ
    Стрелка влево - для закрытого элемента выделяем РОДИТЕЛЯ
`)


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
      case keyCodes.ARROW_LEFT: return node.collapse()
      case keyCodes.ARROW_RIGHT: return node.expand()
      case keyCodes.ARROW_TOP: return focusUp(tree, node)
      case keyCodes.ARROW_BOTTOM: return focusdDown(tree, node)
      case keyCodes.SPACE: return checkNode(tree, node)
    }
  }, true)

};
