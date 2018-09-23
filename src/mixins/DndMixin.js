const DropPosition = {
  ABOVE: 'drag-above',
  BELOW: 'drag-below',
  ON: 'drag-on'
}

function isMovingStarted(event, start) {
  return Math.abs(event.clientX - start[0]) > 5 || Math.abs(event.clientY - start[1]) > 5
}

function getSelectedNode({path, target}) {
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

export default {
  methods: {
    onDragStart(e) {
      e.preventDefault()
    },

    startDragging(node, event) {
      this.__startDragPosition = [event.clientX, event.clientY]
      this.__possibleDragNode = node

      this.initDragListeners()
    },

    initDragListeners() {
      let onMouseUp = (e) => {
        if (!this.__startDragPosition) {
          e.stopPropagation()
        }

        if (this.__dropDestination) {
          updateHelperClasses(this.__dropDestination)
        }

        this.__possibleDragNode = null
        this.$set(this, 'draggableNode', null)

        window.removeEventListener('mouseup', onMouseUp, true)
        window.removeEventListener('mousemove', onMouseMove, true)
      }

      let onMouseMove = (e) => {
        if (this.__startDragPosition && !isMovingStarted(e, this.__startDragPosition)) {
          return
        } else {
          this.__startDragPosition = null
        }

        if (this.__possibleDragNode) {
          this.$set(this, 'draggableNode', { node: this.__possibleDragNode, left: 0, top: 0 })
          this.__possibleDragNode = null
        }

        this.draggableNode.left = e.clientX
        this.draggableNode.top = e.clientY

        const dropDestination = getDropDestination(e)

        updateHelperClasses(this.__dropDestination, null)

        this.__dropDestination = dropDestination
        this.highlightDropDestination(e)
      }

      window.addEventListener('mouseup', onMouseUp, true)
      window.addEventListener('mousemove', onMouseMove, true)
    },

    highlightDropDestination(e) {
      if (!this.__dropDestination) {
        return
      }

      const coords = this.__dropDestination.getBoundingClientRect()
      const nodeSection = coords.height / 3

      let dropPosition = DropPosition.ON

      if (coords.top + nodeSection >= e.clientY) {
        dropPosition = DropPosition.ABOVE
      } else if (coords.top + nodeSection * 2 <= e.clientY) (
        dropPosition = DropPosition.BELOW
      )

      updateHelperClasses(this.__dropDestination, dropPosition)
    }
  }
};
