import Tree from '@/lib/Tree'
import initKeyboardNavigation from '@/utils/keyboardNavigation'

function initEvents (vm) {
  const { multiple, checkbox } = vm.opts

  const emitter = (obj) => {
    const selected = vm.selected()

    if (!checkbox) {
      vm.$emit('input', multiple ? selected : (selected[0] || null))
    } else {
      vm.$emit('input', {
        selected: multiple ? selected : (selected[0] || null),
        checked: vm.checked()
      })
    }
  }

  vm.tree.$on('node:selected', node => {
    if (multiple) {
      emitter(vm.selected())
    } else {
      emitter(node)
    }
  })

  vm.tree.$on('node:unselected', emitter)

  if (checkbox) {
    vm.tree.$on('node:checked', emitter)
    vm.tree.$on('node:unchecked', emitter)
  }
}

export default {
  mounted () {
    const tree = new Tree(this)
    let dataProvider

    this.tree = tree
    this._provided.tree = tree

    if (!this.data && this.opts.fetchData) {
      // Get initial data if we don't have a data directly
      // In this case we call 'fetcher' with node.id == 'root' && node.name == 'root'
      dataProvider = tree.fetchInitData()
    } else if (this.data && this.data.then) {
      // Yeah... nice check!
      dataProvider = this.data
      this.loading = true
    } else {
      dataProvider = Promise.resolve(this.data)
    }

    dataProvider.then(data => {
      if (!data) { // It can be an async request
        return (this.loading = false)
      }

      this.model = tree.parse(data, this.opts.modelParse)
      this.tree.setModel(this.model)

      if (this.loading) {
        this.loading = false
      }
    })

    if (this.opts.keyboardNavigation !== false) {
      initKeyboardNavigation(tree)
    }

    initEvents(this)
  },

  methods: {
    selected () {
      return this.tree.selected()
    },

    checked () {
      return this.tree.checked()
    },

    append (criteria, node) {
      // append to model
      if (!node) {
        return this.tree.addToModel(criteria, this.tree.model.length)
      }

      return this.tree.append(criteria, node)
    },

    prepend (criteria, node) {
      if (!node) {
        return this.tree.addToModel(criteria, 0)
      }

      return this.tree.prepend(criteria, node)
    },

    addChild (criteria, node) {
      return this.append(criteria, node)
    },

    remove (criteria, multiple) {
      return this.tree.remove(criteria, multiple)
    },

    before (criteria, node) {
      if (!node) {
        return this.prepend(criteria)
      }

      return this.tree.before(criteria, node)
    },

    after (criteria, node) {
      if (!node) {
        return this.append(criteria)
      }

      return this.tree.after(criteria, node)
    },

    find (criteria, multiple) {
      return this.tree.find(criteria, multiple)
    },

    findAll (criteria) {
      return this.tree.find(criteria, true)
    },

    recursiveDown () {

    },

    expandReqursice () {

    }
  }

/*eslint semi: 0 */
/* https://github.com/vuejs/rollup-plugin-vue/issues/169 */
};
