(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.LiquorTree = factory());
}(this, (function () { 'use strict';

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=" li.tree-node { white-space: nowrap; display: flex; flex-direction: column; } a.tree-anchor { display: inline-block; text-decoration: none; color: #343434; vertical-align: top; height: 24px; line-height: 24px; padding: 3px 6px; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } a.tree-anchor:hover { background-color: #fafafa; } .tree--selected > .tree-node__content > .tree-anchor { background: #f0f0f0; } .tree-checkbox { display: inline-block; height: 30px; width: 30px; cursor: pointer; background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAABaCAYAAACv+ebYAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAejAAAHowEwL7LFAAAAB3RJTUUH4gIDCy4HZhufyQAAAZVJREFUaN7t2U8og3EYB/DvO3pdRKR2UIiViNzsyE4yHCQiSSIHkQOSFuZPSqklDliSkhknBw4UhYPiJgebNaQtorc5rHfz6nVz0cqYdzt8n+PvOXz69TxPPfUI/pdXFXEIHeIUhAkTTmzY73/G9bVbW1iSApiZXYL3/lE7OBiUMTtnR2lJIWrNJm1gRfmAbX4NmRnp6Oxo1KbGqqpi2e6ALIfQ39eOpCSdNvCWcw8ezwOGBrqQkiLGpqvtq9t4V5SI+YPDM5ycXmB4qBtpaamxGyef7wmT04uQpMC33MXlFZw7+xgc6IRenxXbObaM9CAvNxuWMRtuXN6vd5fbi6UVB3p72lCQnxN1eYSfbiBHx+fY2NxFa0sdiosMsE4tormpBqZK46/6Qohm9XG57zC/sA5ZDsFcXYGG+qpfN6QQ7c4lSW9wub0wlpf9aRIELnuECRMmTJgwYcKECRMmTJgwYcKECRMmTJgwYcL/EMmRElMTVnhubyGKIhDtnUYAwuEwCgwGjI5bE+vHvDsRJkyYMOGI8Ql68IQ9vE0/3AAAAABJRU5ErkJggg=='); background-repeat: no-repeat; background-position-x: center; background-position-y: -30px; } .tree--checked > .tree-node__content > .tree-checkbox { background-position-y: 0; } .tree--indeterminate > .tree-node__content > .tree-checkbox { background-position-y: -60px; } .tree--checked > .tree-node__content > .tree-anchor { background: #dadada; } .tree-arrow { display: inline-block; height: 30px; cursor: pointer; margin-left: 30px; width: 0; } .tree--has-child > .tree-node__content > .tree-arrow { margin-left: 0; width: 30px; background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAQAAACROWYpAAAACXBIWXMAAA3XAAAN1wFCKJt4AAADGGlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjaY2BgnuDo4uTKJMDAUFBUUuQe5BgZERmlwH6egY2BmYGBgYGBITG5uMAxIMCHgYGBIS8/L5UBFTAyMHy7xsDIwMDAcFnX0cXJlYE0wJpcUFTCwMBwgIGBwSgltTiZgYHhCwMDQ3p5SUEJAwNjDAMDg0hSdkEJAwNjAQMDg0h2SJAzAwNjCwMDE09JakUJAwMDg3N+QWVRZnpGiYKhpaWlgmNKflKqQnBlcUlqbrGCZ15yflFBflFiSWoKAwMD1A4GBgYGXpf8EgX3xMw8BSMDVQYqg4jIKAUICxE+CDEESC4tKoMHJQODAIMCgwGDA0MAQyJDPcMChqMMbxjFGV0YSxlXMN5jEmMKYprAdIFZmDmSeSHzGxZLlg6WW6x6rK2s99gs2aaxfWMPZ9/NocTRxfGFM5HzApcj1xZuTe4FPFI8U3mFeCfxCfNN45fhXyygI7BD0FXwilCq0A/hXhEVkb2i4aJfxCaJG4lfkaiQlJM8JpUvLS19QqZMVl32llyfvIv8H4WtioVKekpvldeqFKiaqP5UO6jepRGqqaT5QeuA9iSdVF0rPUG9V/pHDBYY1hrFGNuayJsym740u2C+02KJ5QSrOutcmzjbQDtXe2sHY0cdJzVnJRcFV3k3BXdlD3VPXS8Tbxsfd99gvwT//ID6wIlBS4N3hVwMfRnOFCEXaRUVEV0RMzN2T9yDBLZE3aSw5IaUNak30zkyLDIzs+ZmX8xlz7PPryjYVPiuWLskq3RV2ZsK/cqSql01jLVedVPrHzbqNdU0n22VaytsP9op3VXUfbpXta+x/+5Em0mzJ/+dGj/t8AyNmf2zvs9JmHt6vvmCpYtEFrcu+bYsc/m9lSGrTq9xWbtvveWGbZtMNm/ZarJt+w6rnft3u+45uy9s/4ODOYd+Hmk/Jn58xUnrU+fOJJ/9dX7SRe1LR68kXv13fc5Nm1t379TfU75/4mHeY7En+59lvhB5efB1/lv5dxc+NH0y/fzq64Lv4T8Ffp360/rP8f9/AA0ADzT6lvFdAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAACCSURBVHja7JSxDkBQDEVPzYIVg/gAETaL//8NFonJKiRMwlAR78UgtOs9uU1vU1kwL4cffjcsrkTC3vecUxq8S+tFbSBnJNxMT1SnMFT0JKYw1AwEpjCUzASmMBR0xLrKKucHx7ZYmEVUFkeSMR3PU1eJ/gDFx6c9wqrq/56fgNcBAInl7e4ANk/XAAAAAElFTkSuQmCC'); background-repeat: no-repeat; transition: transform .3s; } .tree--expanded > .tree-node__content > .tree-arrow { transform: rotate(90deg); } .l-fade-enter-active, .l-fade-leave-active { transition: opacity .3s, transform .3s; transform: translateX(0); } .l-fade-enter, .l-fade-leave-to { opacity: 0; transform: translateX(-2em); } "; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();






























var TreeNode = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{staticClass:"tree-node",class:_vm.nodeClass},[_c('div',{staticClass:"tree-node__content"},[_c('i',{staticClass:"tree-arrow",on:{"click":_vm.toggleExpand}}),_vm._v(" "),(_vm.options.checkbox)?_c('i',{staticClass:"tree-checkbox",on:{"click":_vm.check}}):_vm._e(),_vm._v(" "),_c('a',{staticClass:"tree-anchor",attrs:{"href":"javascript:void(0)"},on:{"click":_vm.select}},[_c('node-content',{attrs:{"node":_vm.node}})],1)]),_vm._v(" "),_c('transition',{attrs:{"name":"l-fade"}},[(_vm.hasChildren() && _vm.state.expanded)?_c('ul',{staticClass:"tree-children"},_vm._l((_vm.node.children),function(child,i){return _c('node',{key:i,attrs:{"node":child,"options":_vm.options}})})):_vm._e()])],1)},staticRenderFns: [],
  name: 'Node',
  inject: ['tree'],
  props: ['node', 'options'],

  components: {
    NodeContent: {
      props: ['node'],
      render: function render(h) {
        var node = this.node;
        var vm = this.node.tree.vm;

        return vm.$scopedSlots.default
          ? vm.$scopedSlots.default({ node: this.node })
          : h('span', {
            domProps: {
              innerHTML: node.text
            }
          })
      }
    }
  },

  data: function data() {
    return {
      state: this.node.states
    }
  },

  computed: {
    nodeClass: function nodeClass() {
      var state = this.state;
      var hasChildren = this.hasChildren();
      var classes = {
        'tree--has-child': hasChildren,
        'tree--expanded': hasChildren && state.expanded,
        'tree--selected': state.selected
      };

      if (this.options.checkbox) {
        classes['tree--checked'] = state.checked;
        classes['tree--indeterminate'] = state.indeterminate;
      }

      return classes
    }
  },


  methods: {
    check: function check() {
      if (this.node.checked()) {
        this.tree.uncheck(this.node);
      } else {
        this.tree.check(this.node);
      }
    },

    select: function select(evnt) {
      if (!this.options.parentSelect && this.hasChildren()) {
        return this.toggleExpand()
      }

      if (!this.node.selected()) {
        this.tree.select(
          this.node, evnt.ctrlKey
        );
      } else {
        if (evnt.ctrlKey) {
          this.tree.deselect(this.node);
        } else {
          this.tree.deselectAll();

          if (this.options.multiple) {
            this.tree.select(this.node);
          }
        }
      }
    },

    toggleExpand: function toggleExpand() {
      if (this.hasChildren()) {
        this.tree.toggleExpand(
          this.node
        );
      }
    },

    hasChildren: function hasChildren() {
      return this.node.hasChildren()
    }
  }
};

var Node = function Node(data) {
  this.id = data.id;
  this.states = data.state;
  this.text = data.text;
  this.children = data.children || [];
  this.parent = data.parent || null;

  if (data.component) {
    this.component = data.component;
  }
};

Node.prototype.state = function state (name, value) {
  if (undefined === value) {
    return this.states[name]
  }

  this.states[name] = value;
  return this
};

Node.prototype.refreshIndeterminateState = function refreshIndeterminateState () {
  this.state('indeterminate', false);

  if (this.hasChildren()) {
    var childrenCount = this.children.length;
    var checked = 0;
    var indeterminate = 0;

    this.children.forEach(function (child) {
      if (child.checked()) {
        checked++;
      }

      if (child.indeterminate()) {
        indeterminate++;
      }
    });

    if (checked == childrenCount) {
      if (!this.checked()) {
        this.tree.$emit(
          'node:checked',
          this.check()
        );
      }
    } else {
      if (this.checked()) {
        this.tree.$emit(
          'node:unchecked',
          this.uncheck()
        );
      }
    }

    if (!this.checked()) {
      this.state(
        'indeterminate',
        indeterminate > 0 || (checked > 0 && checked < childrenCount)
      );
    }
  }

  if (this.parent) {
    this.parent.refreshIndeterminateState();
  }
};


Node.prototype.indeterminate = function indeterminate () {
  return this.state('indeterminate')
};


Node.prototype.selectable = function selectable () {
  return this.state('selectable')
};

Node.prototype.selected = function selected () {
  return this.state('selected')
};

Node.prototype.select = function select () {
  return this.state('selected', true)
};

Node.prototype.deselect = function deselect () {
  return this.state('selected', false)
};


Node.prototype.checked = function checked () {
  return this.state('checked')
};

Node.prototype.check = function check () {
  return this.state('checked', true)
};

Node.prototype.uncheck = function uncheck () {
  return this.state('checked', false)
};


Node.prototype.expanded = function expanded () {
  return this.state('expanded')
};

Node.prototype.toggleExpand = function toggleExpand () {
  return this.toggleState('expanded')
};

Node.prototype.collapse = function collapse () {
  return this.state('expanded', false)
};

Node.prototype.expand = function expand () {
  return this.state('expanded', true)
};

Node.prototype.remove = function remove () {
  return this.tree.removeNode(this)
};


Node.prototype.toggleState = function toggleState (state) {
  if (state in this.states) {
    this.states[state] = !this.states[state];
  }
};

Node.prototype.hasChildren = function hasChildren () {
  return this.children.length > 0
};

/**
* Sometimes it's no need to have a parent. It possible to have more than 1 parent
*/
Node.prototype.isRoot = function isRoot () {
  return null === this.parent
};

var defaults = {
  selected: false,
  selectable: true,
  checked: false,
  expanded: false,
  disabled: false,
  indeterminate: false
};

var extend = Object.assign;


function hierarchy(n, i) {
  var node = new Node(n);
  var state = node.states || {};
  var id = i + 1;

  node.states = extend({}, defaults, state);

  if (undefined === node.id) {
    node.id = node.parent ? ((node.parent.id) + "." + id) : '' + id;
  }

  if (node.children) {
    node.children = node.children.map(function (el, i) {
      el.parent = node;
      return hierarchy(el, i);
    });
  }

  return node;
}


function hierarchy$1(data) {
  return data.map(hierarchy);
}

var nodeStates = {
  selected: false,
  selectable: true,
  checked: false,
  expanded: false,
  disabled: false,
  indeterminate: false
};

function merge(state) {
  if ( state === void 0 ) state = {};

  return Object.assign({}, nodeStates, state)
}

function objectToNode(obj) {
  var node = null;

  if ('string' == typeof obj) {
    node = new Node({
      text: obj,
      state: merge()
    });
  } else if (Array.isArray(obj)) {

  } else {
    node = new Node(obj);
    node.states = merge(node.states);

    if (node.children.length) {
      node.children = node.children.map(function (child) {
        child = objectToNode(child);
        child.parent = node;

        return child
      });
    }
  }

  return node
}

var List = (function (Array) {
  function List() {
    Array.call(this);
  }

  if ( Array ) List.__proto__ = Array;
  List.prototype = Object.create( Array && Array.prototype );
  List.prototype.constructor = List;

  List.prototype.empty = function empty () {
    this.length = 0;

    return this
  };

  List.prototype.add = function add () {
    var ref;

    var items = [], len = arguments.length;
    while ( len-- ) items[ len ] = arguments[ len ];
    (ref = this).push.apply(ref, items);

    return this
  };

  List.prototype.remove = function remove (item) {
    this.splice(
      this.indexOf(item),
      1
    );

    return this
  };

  List.prototype.removeAll = function removeAll (item) {
    var this$1 = this;

    while(this.includes(item)) {
      this$1.remove(item);
    }

    return this
  };

  List.prototype.top = function top () {
    return this[this.length - 1]
  };

  return List;
}(Array));

function recurseDown(obj, fn) {
  var res;

  if (Array.isArray(obj)) {
    return obj.map(function (node) { return recurseDown(node, fn); })
  }

  res = fn(obj);

  // Recurse children
  if (res !== false && obj.hasChildren()) {
      res = recurseDown(obj.children, fn);
  }

  return res;
}

var Tree = function Tree(vm) {
  this.vm = vm;
  this.options = vm.options;

  this.setModel(vm.model);
};

Tree.prototype.$on = function $on (name) {
    var ref;

    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];
  (ref = this.vm).$on.apply(ref, [ name ].concat( args ));
};

Tree.prototype.$once = function $once (name) {
    var ref;

    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];
  (ref = this.vm).$once.apply(ref, [ name ].concat( args ));
};

Tree.prototype.$off = function $off (name) {
    var ref;

    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];
  (ref = this.vm).$off.apply(ref, [ name ].concat( args ));
};

Tree.prototype.$emit = function $emit (name) {
    var ref;

    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];
  (ref = this.vm).$emit.apply(ref, [ name ].concat( args ));
};

Tree.prototype.setModel = function setModel (model) {
    var this$1 = this;

  this.model = model;

  /**
  * VueJS transform properties to reactives when constructor is running
  * And we lose List object (extended from Array)
  */
  this.selectedNodes = new List;
  this.checkedNodes = new List;

  recurseDown(model, function (node) {
    node.tree = this$1;

    if (node.selected()) {
      this$1.selectedNodes.add(node);
    }

    if (node.checked()) {
      this$1.checkedNodes.add(node);

      if (node.parent) {
        node.parent.refreshIndeterminateState();
      }
    }
  });

  if (!this.options.multiple && this.selectedNodes.length) {
    var top = this.selectedNodes.top();

    this.selectedNodes.forEach(function (node) {
      if (top !== node) {
        node.state('selected', false);
      }
    });

    this.selectedNodes
      .empty()
      .add(top);
  }
};

Tree.prototype.recurseDown = function recurseDown$1 (node, fn) {
  if (!fn && node) {
    fn = node;
    node = this.model;
  }

  return recurseDown(node, fn)
};


Tree.prototype.select = function select (node, extendList) {
    var this$1 = this;

  if (node.selected() || !node.selectable()) {
    return false
  }

  var treeNode = this.findNode(node);

  if (!treeNode) {
    return false
  }


  if (this.options.multiple && extendList) {
    this.selectedNodes.add(treeNode);
  } else {
    this.selectedNodes.forEach(function (node) { return this$1.deselect(node); });
    this.selectedNodes
      .empty()
      .add(treeNode);
  }

  this.$emit(
    'node:selected',
    treeNode.select()
  );

  return true
};

Tree.prototype.selectAll = function selectAll () {
    var this$1 = this;

  if (!this.options.multiple) {
    return false
  }

  this.selectedNodes.empty();

  this.recurseDown(function (node) {
    node.select();

    this$1.selectedNodes.add(node);
    this$1.$emit('node:selected', node);
  });

  return true
};


Tree.prototype.deselect = function deselect (node) {
  if (!node.selected() || !node.selectable()) {
    return false
  }

  this.$emit(
    'node:deselected',
    node.deselect()
  );

  return true
};

Tree.prototype.deselectAll = function deselectAll () {
    var this$1 = this;

  this.selectedNodes.forEach(function (node) {
    this$1.deselect(node);
  });

  this.selectedNodes.empty();

  return true
};


Tree.prototype.check = function check (node) {
    var this$1 = this;

  if (node.checked()) {
    return false
  }

  if (node.indeterminate()) {
    return this.uncheck(node)
  }

  node.state('indeterminate', false);

  if (node.hasChildren()) {
    this.recurseDown(node, function (child) {
      this$1.checkedNodes.add(child);

      if (!child.checked()) {
        this$1.$emit(
          'node:checked',
          child.check()
        );
      }
    });
  } else {
    this.checkedNodes.add(node);

    this.$emit(
      'node:checked',
      node.check()
    );
  }

  if (node.parent) {
    node.parent.refreshIndeterminateState();
  }
};

Tree.prototype.uncheck = function uncheck (node) {
    var this$1 = this;

  if (!node.checked() && !node.indeterminate()) {
    return false
  }

  node.state('indeterminate', false);

  if (node.hasChildren()) {
    this.recurseDown(node, function (child) {
      child.state('indeterminate', false);

      this$1.checkedNodes.remove(child);

      if (child.checked()) {
        this$1.$emit(
          'node:unchecked',
          child.uncheck()
        );
      }
    });
  } else {
    this.checkedNodes.remove(node);

    this.$emit(
      'node:unchecked',
      node.uncheck()
    );
  }

  if (node.parent) {
    node.parent.refreshIndeterminateState();
  }
};


Tree.prototype.expand = function expand (node) {
  if (node.expanded()) {
    return false
  }

  this.$emit(
    'node:expanded',
    node.expand()
  );

  return true
};

Tree.prototype.collapse = function collapse (node) {
  if (!node.expanded()) {
    return false
  }

  this.$emit(
    'node:collapsed',
    node.collapse()
  );

  return true
};

Tree.prototype.toggleExpand = function toggleExpand (node) {
  if (!node.hasChildren()) {
    return false
  }

  if (node.expanded()) {
    this.collapse(node);
  } else {
    this.expand(node);
  }

  return true
};


Tree.prototype.addNode = function addNode (node) {
  var index = this.model.length;

  node = objectToNode(node);

  this.model.splice(index, 0, node);
  this.$emit('node:added', node);

  return node
};

Tree.prototype.removeNode = function removeNode (node) {
  if (!node.parent) {
    this.model.splice(
      this.model.indexOf(node),
      1
    );
  } else {
    node.parent.children.splice(
      node.parent.children.indexOf(node),
      1
    );
  }

  this.selectedNodes.remove(node);
  this.checkedNodes.remove(node);

  return node
};


Tree.prototype.findNode = function findNode (node) {
  if ('string' == typeof node) {
    // find by id
  } else if (node instanceof Node){
    return node
  }
};


Tree.parseModel = function parseModel (data) {
  return hierarchy$1(data)
};

var TreeMixin = {
  mounted: function mounted() {
    this.model = Tree.parseModel(this.data);

    this._provided.tree = new Tree(this, this.model);
    this.tree = this._provided.tree;
  },

  methods: {
    selected: function selected() {
      if (this.options.multiple) {
        return this.tree.selectedNodes
      }

      return this.tree.selectedNodes[0] || null
    },

    checked: function checked() {
      if (!this.options.checkbox) {
        return null
      }

      return this.tree.checkedNodes
    },

    addNode: function addNode(node) {
      return this.tree.addNode(node)
    }
  }

};

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=" .tree { overflow: auto; } .tree-root, .tree-children { list-style: none; } .tree > .tree-root { padding: 0; } "; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();













var defaults$1 = {
  multiple: true,
  checkbox: false,
  parentSelect: false
};

var TreeRoot = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"tree",attrs:{"role":"tree"}},[_c('ul',{staticClass:"tree-root"},_vm._l((_vm.model),function(node,i){return _c('node',{key:i,attrs:{"node":node,"options":_vm.options}})}))])},staticRenderFns: [],
  name: 'Tree',
  components: {
    'node': TreeNode
  },

  mixins: [TreeMixin],

  provide: function (_) { return ({
    tree: null
  }); },

  props: {
    data: {
      type: Array,
      default: function (_) { return []; }
    },

    options: {
      type: Object,
      default: function (_) { return ({}); }
    }
  },

  data: function data() {
    var this$1 = this;

    // we should not mutating a prop directly...
    // that's why we add if it necessary
    for (var prop in defaults$1) {
      if ( false === (prop in this$1.options) ) {
        this$1.options[prop] = defaults$1[prop];
      }
    }

    return {
      model: null,
      tree: null
    }
  }
}

var install = function (Vue) {
  Vue.component(TreeRoot.name, TreeRoot);
};

TreeRoot.install = install;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(TreeRoot);
}

return TreeRoot;

})));
//# sourceMappingURL=liquor-tree.umd.js.map
