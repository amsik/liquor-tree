import Tree from '@/lib/Tree'

let treeEvents = [
  'node:selected',
  'node:deselected',
  'node:expanded',
  'node:collapsed',
]

export default {
  mounted() {
    this.model = Tree.parseModel(this.data)

    this._provided.tree = new Tree(this, this.model)
    this.tree = this._provided.tree
  },

  methods: {
    selected() {
      if (this.options.multiple) {
        return this.tree.selectedNodes
      }

      return this.tree.selectedNodes[0] || null
    },

    checked() {
      if (!this.options.checkbox) {
        return null
      }

      return this.tree.checkedNodes
    },

    append(node) {
      return this.tree.append(node)
    },

    prepend(node) {
      return this.tree.prepend(node)
    },

    addNode(node) {
      return this.tree.addNode(node)
    }
  }

};
