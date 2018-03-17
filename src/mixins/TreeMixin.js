import Tree from '@/lib/Tree'
import initKeyboardNavigation from '@/utils/keyboardNavigation'

function initEvents(vm) {
  vm.tree.$on('node:selected', node => {
    vm.$emit('input', node)
  })
}

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

    initEvents(this)
  },

  methods: {
    selected() {
      return this.tree.selected()
    },

    checked() {
      return this.tree.checked()
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
      return this.append(criteria, node)
    },

    remove(criteria, multiple) {
      return this.tree.remove(criteria, multiple)
    },

    before(criteria, node) {
      if (!node) {
        return this.prepend(criteria)
      }

      return this.tree.before(criteria, node)
    },

    after(criteria, node) {
      if (!node) {
        return this.append(criteria)
      }

      return this.tree.after(criteria, node)
    },

    find(criteria, multiple) {
      return this.tree.find(criteria, multiple)
    },

    findAll(criteria) {
      return this.tree.find(criteria, true)
    },

    recursiveDown() {

    },

    expandReqursice() {

    }
  }

};
