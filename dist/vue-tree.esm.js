var TreeNode = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{staticClass:"tree-node",class:_vm.nodeClass},[_c('i',{staticClass:"tree-arrow",on:{"click":_vm.toggle}}),_vm._v(" "),(_vm.options.multiple)?_c('i',{staticClass:"tree-checkbox",on:{"click":_vm.check}}):_vm._e(),_vm._v(" "),_c('a',{staticClass:"tree-anchor",attrs:{"href":"javascript:void(0)"},domProps:{"innerHTML":_vm._s(_vm.data.text)},on:{"click":_vm.select}}),_vm._v(" "),_c('transition',{attrs:{"name":"l-fade"}},[(_vm.hasChildren() && _vm.state.opened)?_c('ul',{staticClass:"tree-children"},_vm._l((_vm.data.children),function(child,i){return _c('node',{key:i,attrs:{"data":child,"root":_vm.data,"options":_vm.options},on:{"toggle":_vm.onToggle,"selected":_vm.onSelected,"checked":_vm.onChecked}})})):_vm._e()])],1)},staticRenderFns: [],
  name: 'Node',

  props: ['data', 'root', 'options'],

  data: function data() {
    return {
      state: this.data.state
    }
  },

  computed: {
    nodeClass: function nodeClass() {
      var state = this.data.state;
      var hasChildren = this.hasChildren();
      var classes = {
        'tree--has-child': hasChildren,
        'tree--opened': hasChildren && state.opened,
        'tree--selected': state.selected
      };

      if (this.options.multiple) {
        classes['tree--checked'] = state.checked;
        classes['tree--mixed'] = state.mixed;
      }

      return classes
    }
  },

  methods: {
    onToggle: function onToggle(data) {
      this.$emit('toggle', data);
    },

    onChecked: function onChecked(data) {
      this.$emit('checked', data);
    },

    onSelected: function onSelected(data, ctrlKey) {
      this.$emit('selected', data, ctrlKey);
    },

    check: function check() {
      this.data.state.checked = !this.data.state.checked;
      this.data.state.selected = this.data.state.checked;

      this.$emit('checked', this.data);
    },

    select: function select(evnt) {
      if (!this.options.parentSelect && this.hasChildren()) {
        return this.toggle()
      }

      this.data.state.selected = !this.data.state.selected;
      this.$emit('selected', this.data, evnt.ctrlKey);
    },

    toggle: function toggle() {
      if (this.hasChildren()) {
        this.data.state.opened = !this.data.state.opened;
        this.$emit('toggle', this.data);
      }
    },

    hasChildren: function hasChildren() {
      return this.data.children && this.data.children.length > 0
    }
  }
};

var defaults = {
  selected: false,
  opened: false,
  disabled: false,
  checked: false,
  mixed: false
};

var extend = Object.assign;

function hierarchy(node, i) {
  var state = node.state || {};
  var id = i + 1;

  node.state = extend({}, defaults, state);

  if (undefined === node.id) {
    node.id = node.parent ? ((node.parent.id) + "." + id) : '' + id;
  }

  if (node.children) {
    node.children.forEach(function (el, i) {
      el.parent = node;
      hierarchy(el, i);
    });
  }

  return node;
}


function Hierarchy(data) {
  return data.map(hierarchy);
}

var TreeAPI = {
  getCheckedNodes: function getCheckedNodes() {
    if (!this.options.checkbox) {
      return null;
    }

    var checkedList = [];
    var testCheckedState = function (item) {
      if (item.state.checked && !item.children) {
        checkedList.push(item);
      } else if (item.children) {
        item.children.forEach(testCheckedState);
      }
    };

    this.computedData.forEach(testCheckedState);

    return checkedList;
  },

  getSelectedNodes: function getSelectedNodes() {
    return this.selectedNodes || null;
  },

  getNodes: function getNodes() {
    return !this.options.multiple ?
      this.selectedNodes :
      this.getChecked();
  }
}

var List = {
  add: function add(source, target) {
    if (source.push) {
      source.push(target);
    }
  },

  remove: function remove(source, target) {
    if (source.includes && source.includes(target)) {
      source.splice(
        source.indexOf(target),
        1
      );
    }
  },

  empty: function empty(source) {
    if (source.splice) {
      source.splice(0, source.length);
    }
  }
};

var TreeRoot = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"tree"},[_c('ul',{staticClass:"tree-root"},_vm._l((_vm.computedData),function(child,i){return _c('node',{key:i,attrs:{"data":child,"root":_vm.computedData,"options":_vm.options},on:{"toggle":_vm.onToggle,"selected":_vm.onSelected,"checked":_vm.onChecked}})}))])},staticRenderFns: [],
  name: 'Tree',

  components: {
    'node': TreeNode
  },

  props: {
    data: {
      type: Array,
      default: function (_) { return []; }
    },

    options: {
      type: Object,
      default: function (_) { return ({
        multiple: false,
        parentSelect: false
      }); }
    }
  },

  data: function data() {
    var reducer = function (a, b) {
      if (b.children) {
        a = b.children.reduce(reducer, a);
      }

      if (b.state.selected) {
        a.push(b);
      }

      return a
    };

    var computedData = Hierarchy(this.data);
    var selectedNodes = computedData.reduce(reducer, []);

    return {
      selectedNodes: selectedNodes,
      computedData: computedData
    }
  },

  methods: Object.assign({}, TreeAPI,

    {onToggle: function onToggle(data) {
      this.$emit('toggle', data);
    },

    onChecked: function onChecked(node) {
      if (node.children || node.parent) {
        this.updateCheckedState(node);
      }

      this.$emit('checked', node);
    },

    onSelected: function onSelected(data, ctrlKey) {
      if (ctrlKey) {
        if (data.state.selected) {
          List.add(this.selectedNodes, data);
        } else {
          List.remove(this.selectedNodes, data);
        }
      } else {
        // clear all node selection
        this.selectedNodes.forEach(function (node) { return node.state.selected = false; });

        if (data.state.selected) {
          this.selectedNodes.splice(0, this.selectedNodes.length, data);
        } else {
          List.empty(this.selectedNodes);
        }
      }

      this.$emit('selected', data);
    },

    isMixed: function isMixed(node) {
      if (!node.children) {
        return false
      }

      var childrenLength = node.children.length;
      var checkedChildren = node.children.filter(function (n) { return n.state.checked; }).length;

      return checkedChildren > 0 && checkedChildren < childrenLength
    },

    updateCheckedState: function updateCheckedState(node) {
      var this$1 = this;

      var children = node.children;
      var parent = node.parent;

      if (children) {
        var childrenLength = children.length;
        var checkedChildren = children.filter(function (n) { return n.state.checked; }).length;
        var setState = function (state, key) {
          if ( key === void 0 ) key = 'checked';

          return function updateState(node) {
            node.state[key] = state;

            if (node.children) {
              node.children.forEach(function (child) { return updateState(child); });
            }
          }
        };

        // decheck all children
        if (node.state.mixed) {
          children.forEach(setState(false));
          children.forEach(setState(false, 'mixed'));
          children.forEach(setState(false, 'selected'));

          node.state.checked = false;
          node.state.mixed = false;
          node.state.selected = false;
        } else {
          children.forEach(setState(node.state.checked));
        }
      }

      // check if need set mixed state...
      if (parent) {
        var childrenLength$1 = parent.children.length;
        var checkedChildren$1 = parent.children.filter(function (n) { return n.state.checked; }).length;

        if (checkedChildren$1 > 0) {
          parent.state.mixed = checkedChildren$1 < childrenLength$1;
          parent.state.checked = checkedChildren$1 == childrenLength$1;
        } else {
          parent.state.checked = false;
          parent.state.mixed = false;
        }

        if (parent.parent) {
          var _parent = parent;
          var _mixed;

          while(_parent = _parent.parent) {
            _mixed = this$1.isMixed(_parent);

            if (_parent.state.mixed != _mixed) {
              _parent.state.mixed = _mixed;
              _parent.state.checked = !_mixed;
            }

            // _parent.state.mixed = this.isMixed(_parent)
            //
            // if (_parent.state.mixed) {
            //   _parent.state.checked = false
            // }
          }
        }
      }

    }})
}

var install = function (Vue) {
  Vue.component(TreeRoot.name, TreeRoot);
};

TreeRoot.install = install;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(TreeRoot);
}

export default TreeRoot;
