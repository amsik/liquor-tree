const NodeContent = {
  name: 'node-content',
  props: ['node'],
  render (h) {
    const node = this.node
    const vm = this.node.tree.vm

    if (vm.$scopedSlots.default) {
      return vm.$scopedSlots.default({ node: this.node })
    }

    if (node.isEditing) {
      let nodeText = node.text

      this.$nextTick(_ => {
        this.$refs.editCtrl.focus()
      })

      return h('input', {
        domProps: {
          value: node.text,
          type: 'text'
        },
        class: 'tree-input',
        on: {
          input (e) {
            nodeText = e.target.value
          },
          blur () {
            node.stopEditing(nodeText)
          },
          keyup (e) {
            if (e.keyCode === 13) {
              node.stopEditing(nodeText)
            }
          }
        },
        ref: 'editCtrl'
      })
    }

    return h('span', {
      domProps: {
        innerHTML: node.text
      }
    })
  }
}

export default NodeContent
