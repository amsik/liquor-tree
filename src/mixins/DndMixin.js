const DropPosition = {
  ABOVE: 'drag-above',
  BELOW: 'drag-below',
  ON: 'drag-on'
}

function isMovingStarted (event, start) {
  return Math.abs(event.clientX - start[0]) > 5 || Math.abs(event.clientY - start[1]) > 5
}

function composedPath (event) {
  let el = event.target
  const path = []

  while (el) {
    path.push(el)

    if (el.tagName === 'HTML') {
      path.push(document)
      path.push(window)

      return path
    }

    el = el.parentElement
  }

  return path
}

function getPath (event) {
  if (event.path) {
    return event.path
  }

  if (event.composedPath) {
    return event.composedPath()
  }

  return composedPath(event)
}

function getSelectedNode (event) {
  let className
  let i = 0

  const path = getPath(event)

  for (; i < path.length; i++) {
    className = path[i].className || ''

    if (/tree-node/.test(className)) {
      return path[i]
    }
  }

  return null
}

function getDropDestination (e) {
  const selectedNode = getSelectedNode(e)

  if (!selectedNode) {
    return null
  }

  return selectedNode
}

function updateHelperClasses (target, classes) {
  if (!target) {
    return
  }

  let className = target.className

  if (!classes) {
    for (const i in DropPosition) {
      className = className.replace(DropPosition[i], '')
    }

    className.replace('dragging', '')
  } else if (!new RegExp(classes).test(className)) {
    className += ' ' + classes
  }

  target.className = className.replace(/\s+/g, ' ')
}

function getDropPosition (e, element) {
  const coords = element.getBoundingClientRect()
  const nodeSection = coords.height / 3

  let dropPosition = DropPosition.ON

  if (coords.top + nodeSection >= e.clientY) {
    dropPosition = DropPosition.ABOVE
  } else if (coords.top + nodeSection * 2 <= e.clientY) {
    (
      dropPosition = DropPosition.BELOW
    )
  }

  return dropPosition
}

function callDndCb (args, opts, method) {
  if (!opts || !opts[method] || typeof opts[method] !== 'function') {
    return
  }

  return opts[method](...args) === false ? false : true
}

function clearDropClasses(parent) {
  for (let key in DropPosition) {
    const el = parent.querySelectorAll(`.${DropPosition[key]}`)

    for (let i = 0; i < el.length; i++) {
      updateHelperClasses(el[i])
    }
  }
}

export default {
  methods: {
    onDragStart (e) {
      e.preventDefault()
    },

    startDragging (node, event) {
      if (!node.isDraggable() || callDndCb([node], this.tree.options.dnd, 'onDragStart') === false) {
        return
      }

      this.$$startDragPosition = [event.clientX, event.clientY]
      this.$$possibleDragNode = node

      this.initDragListeners()
    },

    initDragListeners () {
      let dropPosition

      const removeListeners = () => {
        window.removeEventListener('mouseup', onMouseUp, true)
        window.removeEventListener('mousemove', onMouseMove, true)
      }

      const onMouseUp = (e) => {
        if (!this.$$startDragPosition) {
          e.stopPropagation()
        }

        if (this.draggableNode) {
          this.draggableNode.node.state('dragging', false)
        }

        if (this.$$dropDestination && this.tree.isNode(this.$$dropDestination) && this.$$dropDestination.vm) {
          updateHelperClasses(this.$$dropDestination.vm.$el, null)

          const cbResult = callDndCb(
            [this.draggableNode.node, this.$$dropDestination],
            this.tree.options.dnd,
            'onDragFinish'
          )

          if (cbResult !== false && !(!this.$$dropDestination.isDropable() && dropPosition === DropPosition.ON || !dropPosition)) {
            this.draggableNode.node.finishDragging(this.$$dropDestination, dropPosition)
          }

          this.$$dropDestination = null
        }

        this.$$possibleDragNode = null
        this.$set(this, 'draggableNode', null)

        removeListeners()
      }

      const onMouseMove = (e) => {
        if (this.$$startDragPosition && !isMovingStarted(e, this.$$startDragPosition)) {
          return
        } else {
          this.$$startDragPosition = null
        }

        if (this.$$possibleDragNode) {
          if (this.$$possibleDragNode.startDragging() === false) {
            removeListeners()
            this.$$possibleDragNode = null

            return
          }

          this.$set(this, 'draggableNode', { node: this.$$possibleDragNode, left: 0, top: 0 })
          this.$$possibleDragNode = null
        }

        this.draggableNode.left = e.clientX
        this.draggableNode.top = e.clientY

        const dropDestination = getDropDestination(e)

        clearDropClasses(this.$el)

        if (dropDestination) {
          const dropDestinationId = dropDestination.getAttribute('data-id')

          if (this.draggableNode.node.id === dropDestinationId) {
            return
          }

          if (!this.$$dropDestination || this.$$dropDestination.id !== dropDestinationId) {
            this.$$dropDestination = this.tree.getNodeById(dropDestinationId)
          }

          if (this.$$dropDestination && this.draggableNode.node) {
            const path = this.$$dropDestination.getPath()

            if (path.includes(this.draggableNode.node)) {
              this.$$dropDestination = null
              return
            }
          }

          const cbResult = callDndCb(
            [this.draggableNode.node, this.$$dropDestination],
            this.tree.options.dnd,
            'onDragOn'
          )

          const isDropable = this.$$dropDestination.isDropable() && cbResult !== false

          dropPosition = getDropPosition(e, dropDestination)

          if (!isDropable && dropPosition === DropPosition.ON) {
            dropPosition = null
          }

          updateHelperClasses(dropDestination, dropPosition)
        }
      }

      window.addEventListener('mouseup', onMouseUp, true)
      window.addEventListener('mousemove', onMouseMove, true)
    }
  }
}
