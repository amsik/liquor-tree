(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=" .tree-node { white-space: nowrap; } .tree-anchor { display: inline-block; text-decoration: none; color: #343434; vertical-align: top; height: 24px; line-height: 24px; padding: 3px 6px; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } .tree-anchor:hover { background-color: #fafafa; } .tree--selected > .tree-anchor { background: #f0f0f0; } .tree-checkbox { display: inline-block; height: 30px; width: 30px; cursor: pointer; background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAABaCAYAAACv+ebYAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAejAAAHowEwL7LFAAAAB3RJTUUH4gIDCy4HZhufyQAAAZVJREFUaN7t2U8og3EYB/DvO3pdRKR2UIiViNzsyE4yHCQiSSIHkQOSFuZPSqklDliSkhknBw4UhYPiJgebNaQtorc5rHfz6nVz0cqYdzt8n+PvOXz69TxPPfUI/pdXFXEIHeIUhAkTTmzY73/G9bVbW1iSApiZXYL3/lE7OBiUMTtnR2lJIWrNJm1gRfmAbX4NmRnp6Oxo1KbGqqpi2e6ALIfQ39eOpCSdNvCWcw8ezwOGBrqQkiLGpqvtq9t4V5SI+YPDM5ycXmB4qBtpaamxGyef7wmT04uQpMC33MXlFZw7+xgc6IRenxXbObaM9CAvNxuWMRtuXN6vd5fbi6UVB3p72lCQnxN1eYSfbiBHx+fY2NxFa0sdiosMsE4tormpBqZK46/6Qohm9XG57zC/sA5ZDsFcXYGG+qpfN6QQ7c4lSW9wub0wlpf9aRIELnuECRMmTJgwYcKECRMmTJgwYcKECRMmTJgwYcL/EMmRElMTVnhubyGKIhDtnUYAwuEwCgwGjI5bE+vHvDsRJkyYMOGI8Ql68IQ9vE0/3AAAAABJRU5ErkJggg=='); background-repeat: no-repeat; background-position-x: center; background-position-y: -30px; } .tree--checked > .tree-checkbox { background-position-y: 0; } .tree--mixed > .tree-checkbox { background-position-y: -60px; } .tree--checked > .tree-anchor { background: #dadada; } .tree-arrow { display: inline-block; height: 30px; cursor: pointer; margin-left: 30px; width: 0; } .tree--has-child > .tree-arrow { margin-left: 0; width: 30px; background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAQAAACROWYpAAAACXBIWXMAAA3XAAAN1wFCKJt4AAADGGlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjaY2BgnuDo4uTKJMDAUFBUUuQe5BgZERmlwH6egY2BmYGBgYGBITG5uMAxIMCHgYGBIS8/L5UBFTAyMHy7xsDIwMDAcFnX0cXJlYE0wJpcUFTCwMBwgIGBwSgltTiZgYHhCwMDQ3p5SUEJAwNjDAMDg0hSdkEJAwNjAQMDg0h2SJAzAwNjCwMDE09JakUJAwMDg3N+QWVRZnpGiYKhpaWlgmNKflKqQnBlcUlqbrGCZ15yflFBflFiSWoKAwMD1A4GBgYGXpf8EgX3xMw8BSMDVQYqg4jIKAUICxE+CDEESC4tKoMHJQODAIMCgwGDA0MAQyJDPcMChqMMbxjFGV0YSxlXMN5jEmMKYprAdIFZmDmSeSHzGxZLlg6WW6x6rK2s99gs2aaxfWMPZ9/NocTRxfGFM5HzApcj1xZuTe4FPFI8U3mFeCfxCfNN45fhXyygI7BD0FXwilCq0A/hXhEVkb2i4aJfxCaJG4lfkaiQlJM8JpUvLS19QqZMVl32llyfvIv8H4WtioVKekpvldeqFKiaqP5UO6jepRGqqaT5QeuA9iSdVF0rPUG9V/pHDBYY1hrFGNuayJsym740u2C+02KJ5QSrOutcmzjbQDtXe2sHY0cdJzVnJRcFV3k3BXdlD3VPXS8Tbxsfd99gvwT//ID6wIlBS4N3hVwMfRnOFCEXaRUVEV0RMzN2T9yDBLZE3aSw5IaUNak30zkyLDIzs+ZmX8xlz7PPryjYVPiuWLskq3RV2ZsK/cqSql01jLVedVPrHzbqNdU0n22VaytsP9op3VXUfbpXta+x/+5Em0mzJ/+dGj/t8AyNmf2zvs9JmHt6vvmCpYtEFrcu+bYsc/m9lSGrTq9xWbtvveWGbZtMNm/ZarJt+w6rnft3u+45uy9s/4ODOYd+Hmk/Jn58xUnrU+fOJJ/9dX7SRe1LR68kXv13fc5Nm1t379TfU75/4mHeY7En+59lvhB5efB1/lv5dxc+NH0y/fzq64Lv4T8Ffp360/rP8f9/AA0ADzT6lvFdAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAACCSURBVHja7JSxDkBQDEVPzYIVg/gAETaL//8NFonJKiRMwlAR78UgtOs9uU1vU1kwL4cffjcsrkTC3vecUxq8S+tFbSBnJNxMT1SnMFT0JKYw1AwEpjCUzASmMBR0xLrKKucHx7ZYmEVUFkeSMR3PU1eJ/gDFx6c9wqrq/56fgNcBAInl7e4ANk/XAAAAAElFTkSuQmCC'); background-repeat: no-repeat; transition: transform .3s; } .tree--opened > .tree-arrow { transform: rotate(90deg); } .l-fade-enter-active, .l-fade-leave-active { transition: opacity .3s, transform .3s; transform: translateX(0); } .l-fade-enter, .l-fade-leave-to { opacity: 0; transform: translateX(-2em); } "; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();































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

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=" .tree { overflow: auto; } .tree-root, .tree-children { list-style: none; } .tree > .tree-root { padding: 0; } "; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();

















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

    updateCheckedState: function updateCheckedState(node) {
      var children = node.children;
      var parent = node.parent;

      if (parent) {
        var childrenLength = parent.children.length;
        var checkedChildren = parent.children.filter(function (n) { return n.state.checked || n.state.mixed; }).length;

        if (checkedChildren > 0) {
          parent.state.mixed = checkedChildren < childrenLength;
          parent.state.checked = checkedChildren == childrenLength;
        } else {
          parent.state.checked = false;
          parent.state.mixed = false;
        }

        if (parent.parent) {
          var _parent = parent;
          var mixed = parent.state.mixed;

          while(_parent = _parent.parent) {
            _parent.state.mixed = mixed;
          }
        }
      }

      if (children) {
        var childrenLength$1 = children.length;
        var checkedChildren$1 = children.filter(function (n) { return n.state.checked; }).length;
        var setState = function (state, key) {
          if ( key === void 0 ) key = 'checked';

          return function updateState(node) {
            node.state[key] = state;

            if (node.children) {
              node.children.forEach(function (child) { return updateState(child); });
            }
          }
        };

        if (node.state.mixed) {
          children.forEach(setState(false));
          children.forEach(setState(false, 'mixed'));

          node.state.checked = false;
          node.state.mixed = false;
        } else {
          children.forEach(setState(node.state.checked));
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
