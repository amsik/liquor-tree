const DropPosition = {
  ABOVE: 'drag-above',
  BELOW: 'drag-below',
  ON: 'drag-on'
}

function isMovingStarted(event, start) {
  return Math.abs(event.clientX - start[0]) > 5 || Math.abs(event.clientY - start[1]) > 5
}

function getSelectedNode({path}) {
  let className
  let i = 0

  for (; i < path.length; i++ ) {
    className = path[i].className || ''

    if (/tree-node/.test(className)) {
      return path[i]
    }
  }

  return null
}

function getDropDestination(e) {
  const selectedNode = getSelectedNode(e)

  if (!selectedNode) {
    return null
  }

  return selectedNode
}

function updateHelperClasses(target, classes) {
  if (!target) {
    return
  }

  let className = target.className

  if (!classes) {
    for (let i in DropPosition) {
      className = className.replace(DropPosition[i], '')
    }

    className.replace('dragging', '')
  } else if (!new RegExp(classes).test(className)) {
    className += " " + classes
  }

  target.className = className.replace(/\s+/g, ' ')
}

function highlightDropDestination(e, element) {
  const coords = element.getBoundingClientRect()
  const nodeSection = coords.height / 3

  let dropPosition = DropPosition.ON

  if (coords.top + nodeSection >= e.clientY) {
    dropPosition = DropPosition.ABOVE
  } else if (coords.top + nodeSection * 2 <= e.clientY) (
    dropPosition = DropPosition.BELOW
  )

  updateHelperClasses(element, dropPosition)

  return dropPosition
}

export default {
  methods: {
    onDragStart(e) {
      e.preventDefault()
    },

    startDragging(node, event) {
      this.$$startDragPosition = [event.clientX, event.clientY]
      this.$$possibleDragNode = node

      this.initDragListeners()
    },

    initDragListeners() {
      let dropPosition

      let onMouseUp = (e) => {
        if (!this.$$startDragPosition) {
          e.stopPropagation()
        }

        if (this.$$dropDestination) {
          updateHelperClasses(this.$$dropDestination.vm.$el, null)
          this.draggableNode.node.finishDragging(this.$$dropDestination, dropPosition)

          this.$$dropDestination = null

          // const draggableNode = this.draggableNode.node.toJSON()
          // draggableNode.state.selected = false

          // this.$$dropDestination.append(draggableNode)
          // this.$$dropDestination = null

          // this.draggableNode.node.remove()
        }

        this.$$possibleDragNode = null
        this.$set(this, 'draggableNode', null)

        window.removeEventListener('mouseup', onMouseUp, true)
        window.removeEventListener('mousemove', onMouseMove, true)
      }

      let onMouseMove = (e) => {
        if (this.$$startDragPosition && !isMovingStarted(e, this.$$startDragPosition)) {
          return
        } else {
          this.$$startDragPosition = null
        }

        if (this.$$possibleDragNode) {
          this.$set(this, 'draggableNode', { node: this.$$possibleDragNode, left: 0, top: 0 })
          this.$$possibleDragNode.startDragging()
          this.$$possibleDragNode = null
        }

        this.draggableNode.left = e.clientX
        this.draggableNode.top = e.clientY

        const dropDestination = getDropDestination(e)

        if (this.$$dropDestination) {
          updateHelperClasses(this.$$dropDestination.vm.$el, null)
        }

        if (dropDestination) {
          const dropDestinationId = dropDestination.getAttribute('data-id')

          if (this.draggableNode.node.id === dropDestinationId) {
            return
          }

          if (!this.$$dropDestination || this.$$dropDestination.id !== dropDestinationId) {
            this.$$dropDestination = this.tree.getNodeById(dropDestinationId)
          }

          dropPosition = highlightDropDestination(e, dropDestination)
        }
      }

      window.addEventListener('mouseup', onMouseUp, true)
      window.addEventListener('mousemove', onMouseMove, true)
    }
  }
};
