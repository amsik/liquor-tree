
function isMovingStarted(event, start) {
  return Math.abs(event.clientX - start[0]) > 5 || Math.abs(event.clientY - start[1]) > 5
}

function getSelectedNode({path, target}) {
  for (let i = 0; i < path.length; i++ ) {
    if (path[i] !== target && path[i].classList.contains('tree-node')) {
      return path[i]
    }
  }

  return null
}

function highlightSelectedNode(e) {
  const selectedNode = getSelectedNode(e)

  if (!selectedNode) {
    return
  }

  
}

export default {
  methods: {
    startDragging(node, event) {
      this.__startDragPosition = [event.clientX, event.clientY]
      this.__possibleDragNode = node

      this.initDragListeners()
    },

    initDragListeners() {
      let onMouseUp = (e) => {
        this.__possibleDragNode = null
        this.draggableNode = null

        window.removeEventListener('mouseup', onMouseUp, true)
        window.removeEventListener('mousemove', onMouseMove, true)

        e.stopPropagation()
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

        highlightSelectedNode(e)
      }


      window.addEventListener('mouseup', onMouseUp, true)
      window.addEventListener('mousemove', onMouseMove, true)
    }
  }
};
