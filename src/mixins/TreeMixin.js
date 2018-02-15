import Tree from '@/lib/Tree'


export default {
  mounted() {
    const tree = new Tree(this)

    this.model = tree.parse(this.data, this.options.modelParse)

    this.tree = tree
    this.tree.setModel(this.model)

    this._provided.tree = tree
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
