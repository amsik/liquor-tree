
function isMovingStarted(event, start) {
  return Math.abs(event.clientX - start[0]) > 5 || Math.abs(event.clientY - start[1]) > 5
}

export default {
  methods: {
    initDnd(node, event) {
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

        // highlightSelectedNode(selectedNode, )
        console.log(e)
      }

      let selectedNode;

      window.addEventListener('mouseup', onMouseUp, true)
      window.addEventListener('mousemove', onMouseMove, true)
    }
  }
};
