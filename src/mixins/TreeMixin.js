import Tree from '../lib/Tree'
import initKeyboardNavigation from '../utils/keyboardNavigation'
import assert from '../utils/assert'

function initEvents (vm) {
  const { multiple, checkbox } = vm.opts
  const tree = vm.tree

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

  emitter()

  tree.$on('node:selected', emitter)
  tree.$on('node:unselected', emitter)

  if (checkbox) {
    tree.$on('node:checked', emitter)
    tree.$on('node:unchecked', emitter)
  }

  tree.$on('node:added', (targetNode, newNode) => {
    const node = newNode || targetNode

    if (checkbox) {
      if (node.state('checked') && !tree.checkedNodes.has(node)) {
        tree.checkedNodes.add(node)
      }

      node.refreshIndeterminateState()
    }

    if (node.state('selected') && !tree.selectedNodes.has(node)) {
      tree.select(node)
    }

    emitter()
  })
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
      if (!data) {
        data = []
      }

      if (this.opts.store) {
        this.connectStore(this.opts.store)
      } else {
        this.tree.setModel(data)
      }

      if (this.loading) {
        this.loading = false
      }

      this.$emit('tree:mounted', this)

      initEvents(this)
    })

    if (this.opts.keyboardNavigation !== false) {
      initKeyboardNavigation(tree)
    }
  },

  methods: {
    connectStore (store) {
      const { store: Store, mutations, getter, dispatcher } = store

      assert(typeof getter === 'function', '`getter` must be a function')
      assert(typeof dispatcher === 'function', '`dispatcher` must be a function')

      if (undefined !== mutations) {
        assert(Array.isArray(mutations), '`mutations` must be an array')
      }

      Store.subscribe((action, state) => {
        if (!mutations) {
          this.tree.setModel(getter())
        } else if (mutations.includes(action.type)) {
          this.tree.setModel(getter())
        }
      })

      this.tree.setModel(getter())

      this.$on('LIQUOR_NOISE', () => {
        this.$nextTick(_ => {
          dispatcher(this.toJSON())
        })
      })
    },

    recurseDown (fn) {
      this.tree.recurseDown(fn)
    },

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

    expandAll () {
      return this.tree.expandAll()
    },

    updateData (criteria, callback) {
      return this.tree.updateData(criteria, callback)
    },

    collapseAll () {
      return this.tree.collapseAll()
    },

    sortTree (compareFn, deep) {
      return this.tree.sortTree(compareFn, deep)
    },

    sort (...args) {
      return this.tree.sort(...args)
    },

    setModel (data) {
      return this.tree.setModel(data)
    },

    getRootNode () {
      return this.tree.model.length === 1
        ? this.tree.model[0]
        : this.tree.model
    },

    toJSON () {
      return JSON.parse(
        JSON.stringify(this.model)
      )
    }
  }

/*eslint semi: 0 */
/* https://github.com/vuejs/rollup-plugin-vue/issues/169 */
};
