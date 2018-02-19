import Tree from '@/lib/Tree'
import initKeyboardNavigation from '@/utils/keyboardNavigation'


export default {
  mounted() {
    const tree = new Tree(this)

    this.model = tree.parse(this.data, this.options.modelParse)

    this.tree = tree
    this.tree.setModel(this.model)

    this._provided.tree = tree

    if (false !== this.options.keyboardNavigation) {
      initKeyboardNavigation(tree)
    }
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

    append(criteria, node) {
      // append to model
      if (!node) {
        return this.tree.addToModel(criteria, this.tree.model.length)
      }

      return this.tree.append(criteria, node)
    },

    prepend(criteria, node) {
      if (!node) {
        return this.tree.addToModel(criteria, 0)
      }

      return this.tree.prepend(criteria, node)
    },

    addChild(criteria, node) {
      return this.tree.addChild(node)
    }
  }

};
