import Tree from '@/lib/Tree'

let treeEvents = [
  'node:selected',
  'node:deselected',
  'node:expanded',
  'node:collapsed',
]

function addEvents(target, source) {
  treeEvents.forEach(evntName => {
    source.$on(evntName, (...args) => {
      target.$emit(evntName, ...args)
    })
  })
}

export default {
  mounted() {
    this.tree = this._provided.tree

    // Add links to Vue's event methods
    // TODO: Temporary solution
    this.tree.$on = this.$on.bind(this)
    this.tree.$emit = this.$emit.bind(this)
    this.tree.$off = this.$off.bind(this)
    this.tree.$once = this.$once.bind(this)

    this.model = Tree.parseModel(this.data)

    this.tree.setModel(this.model)
    this.tree.options = this.options



    // addEvents(
    //   this,
    //   this.tree
    // )
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
    }
  }

};
