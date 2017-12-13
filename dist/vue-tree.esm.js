(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=" .tree-anchor { display: inline-block; text-decoration: none; color: #343434; vertical-align: top; height: 24px; line-height: 24px; padding: 3px 6px; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } .tree-anchor:hover { background-color: #fafafa; } .tree--selected > .tree-anchor { background: #f0f0f0; } .tree-checkbox { display: inline-block; height: 30px; width: 30px; cursor: pointer; background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAA8CAYAAABxVAqfAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAejAAAHowEwL7LFAAAAB3RJTUUH4QwLCxc1XFin0wAAAWNJREFUWMNjfP7m7X+GAQBMDAMERi0etXjU4sFt8fPnrxiuXr1NX4vfv//I0NY5g+H+wyf0s/jbtx8MnT2zGXR11Bl8vBzpY/GfP38Z+ifOZxAS5GdITgylTxz///+fYebs5Qw/fvxkyM+NZ2BmZqKPxStWbmW4e/cRQ2lxCgM7Oxt1UvXsuasYfv/5g1N+1+4jDIcOn2YoL01j4OPjoV52evbsJUNTyxSG9+8/YsidPnOZYeXqbQwlxckM4uIi1M3H1ZVZDAry0gzVdf0MN2/dh4vfun2fYcas5Qw5WbEMykpyJEcPI7EtkH37TzAsWbaRITrSl0FLU4WhoXkKQ0SYN4OjgzlZ6YKRlKbPrdsPGCZOXsjw48dPBi9Pe4bgQHeyEyQjqW2u9+8/Mdy6fZ/B3EyfopzAONrYG7V41OJRi0ctHrV41OJRi0ctHrV41OJRi0ctHrV41OJRi0ctHrWYegAAArh2QRte6KIAAAAASUVORK5CYII='); background-repeat: no-repeat; background-position-x: center; background-position-y: -30px; } .tree--checked > .tree-checkbox { background-position-y: 0; } .tree--checked > .tree-anchor { background: #dadada; } .tree-arrow { display: inline-block; height: 30px; cursor: pointer; margin-left: 30px; width: 0; } .tree--has-child > .tree-arrow { margin-left: 0; width: 30px; background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAA8CAQAAADbXcIUAAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfhDAsIEgqVD8DyAAAAqElEQVRIx+2WvQqDMBRGj53FZk0F8wQiurn4/m8SyJQ1xKFLh1KUxhs69Z41fOTnhnsuKP9My0MeHsl08vhEwtJI4ysBJ999I2Lk8YW9Jj7j6Y+Xbr+sd8WxKx6solQVn6Tqe94ZtDsoiqJc6pvjSTNuv4cHMtOBAnLZlNKRWD/Ek8oVYAlsb7oL2PJ7Nzgiy0uyEXfVWYadmVnqZ4PHyyeS/mwaUZRCnkuXHRqKzB2RAAAAAElFTkSuQmCC'); background-repeat: no-repeat; background-position: 0 0; } .tree--opened > .tree-arrow { background-position: 0 -31px; } "; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();
































var TreeNode = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{staticClass:"tree-node",class:_vm.nodeClass},[_c('i',{staticClass:"tree-arrow",on:{"click":_vm.toggle}}),_vm._v(" "),(_vm.options.checkbox)?_c('i',{staticClass:"tree-checkbox",on:{"click":_vm.check}}):_vm._e(),_vm._v(" "),_c('a',{staticClass:"tree-anchor",attrs:{"href":"javascript:void(0)"},on:{"click":_vm.select,"mouseenter":_vm.onMouseEnter,"mouseleave":_vm.onMouseLeave}},[_vm._v(" "+_vm._s(_vm.data.text)+" ")]),_vm._v(" "),(_vm.hasChildren() && _vm.state.opened)?_c('ul',{staticClass:"tree-children"},_vm._l((_vm.data.children),function(child,i){return _c('node',{key:i,attrs:{"data":child,"root":_vm.data,"options":_vm.options},on:{"toggle":_vm.onToggle,"selected":_vm.onSelected,"checked":_vm.onChecked}})})):_vm._e()])},staticRenderFns: [],
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

            return {
                'tree--has-child': hasChildren,
                'tree--opened': hasChildren && state.opened,
                'tree--selected': state.selected,
                'tree--checked': state.checked && this.options.checkbox
            }
        }
    },

    methods: {
        onToggle: function onToggle(data) {
            this.$emit('toggle', data);
        },

        onChecked: function onChecked(data) {
            this.$emit('checked', data);
        },

        onSelected: function onSelected(data) {
            this.$emit('selected', data);
        },

        onMouseLeave: function onMouseLeave() {

        },

        onMouseEnter: function onMouseEnter() {

        },

        check: function check() {
            this.data.state.checked = !this.data.state.checked;
            this.data.state.selected = this.data.state.checked;

            this.$emit('checked', this.data);
        },

        select: function select() {
            this.data.state.selected = !this.data.state.selected;
            this.$emit('selected', this.data);
        },

        toggle: function toggle() {
            if (this.hasChildren()) {
                this.data.state.opened = !this.data.state.opened;
                this.$emit('toggle', this.data);
            }
        },

        hasChildren: function hasChildren() {
            return this.data.children && this.data.children.length > 0;
        }
    }
};

var defaults = {
    selected: false,
    opened: false,
    disabled: false,
    checked: false
};

var extend = Object.assign;

function hierarchy(node) {
    var state = node.state || {};

    node.state = extend({}, defaults, state);

    if (node.children) {
        node.children.forEach(hierarchy);
    }

    return node;
}


var Hierarchy = function(data) {
    return data.map(hierarchy);
};

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=" .tree-root, .tree-children { list-style: none; } "; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();

















var TreeRoot = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"tree"},[_c('ul',{staticClass:"tree-root"},_vm._l((_vm.computedData),function(child,i){return _c('node',{key:i,attrs:{"data":child,"root":_vm.computedData,"options":_vm.options},on:{"toggle":_vm.onToggle,"selected":_vm.onSelected,"checked":_vm.onChecked}})}))])},staticRenderFns: [],
    name: 'Tree',

    components: {
        'node': TreeNode
    },

    props: ['data', 'options'],

    data: function data() {
        var computedData = Hierarchy(this.data);

        return {
            selectedNodes: [],
            computedData: computedData
        }
    },

    methods: {
        onToggle: function onToggle(data) {
            this.$emit('toggle', data);
        },

        onChecked: function onChecked(data) {
            if (data.state.checked) {
                this.selectedNodes.push(data);
            } else {
                this.selectedNodes.splice(this.selectedNodes.indexOf(data), 1);
            }

            if (data.children) {
                this.deepSelect(data);
            }

            this.$emit('checked', data);
        },

        onSelected: function onSelected(data) {
            console.log('selected');
            var selected = this.selectedNodes[0];

            if (selected) {
                selected.state.selected = false;
            }

            this.selectedNodes.splice(0, 1, data);
            this.$emit('selected', this.selectedNodes[0]);
        },

        deepSelect: function deepSelect(data) {
            var this$1 = this;

            data.children.forEach(function (child) {
                child.state.checked = data.state.checked;

                if (child.children) {
                    this$1.deepSelect(child);
                }
            });
        }
    }
};

var main = {
    TreeRoot: TreeRoot,
    TreeNode: TreeNode
};

export default main;
