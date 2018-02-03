<template>
    <div class="tree">
        <ul class="tree-root">
            <node
                v-for="(child, i) in computedData"
                :key="i"
                :data="child"
                :root="computedData"
                :options="options"
                @toggle="onToggle"
                @selected="onSelected"
                @checked="onChecked"
            />
        </ul>
    </div>
</template>

<script>
  import TreeNode from './TreeNode.vue'
  import Hierarchy from './utils/Hierarchy'
  import TreeAPI from './utils/TreeAPI'
  import List from './utils/list'

  export default {
    name: 'Tree',

    components: {
      'node': TreeNode
    },

    props: {
      data: {
        type: Array,
        default: _ => []
      },

      options: {
        type: Object,
        default: _ => ({
          multiple: false,
          parentSelect: false
        })
      }
    },

    data() {
      let reducer = (a, b) => {
        if (b.children) {
          a = b.children.reduce(reducer, a)
        }

        if (b.state.selected) {
          a.push(b);
        }

        return a
      }

      let computedData = Hierarchy(this.data)
      let selectedNodes = computedData.reduce(reducer, [])

      return {
        selectedNodes,
        computedData
      }
    },

    methods: {
      ...TreeAPI,

      onToggle(data) {
        this.$emit('toggle', data)
      },

      onChecked(node) {
        if (node.children || node.parent) {
          this.updateCheckedState(node)
        }

        this.$emit('checked', node)
      },

      onSelected(data, ctrlKey) {
        if (ctrlKey) {
          if (data.state.selected) {
            List.add(this.selectedNodes, data)
          } else {
            List.remove(this.selectedNodes, data)
          }
        } else {
          // clear all node selection
          this.selectedNodes.forEach(node => node.state.selected = false)

          if (data.state.selected) {
            this.selectedNodes.splice(0, this.selectedNodes.length, data)
          } else {
            List.empty(this.selectedNodes)
          }
        }

        this.$emit('selected', data)
      },

      isMixed(node) {
        if (!node.children) {
          return false
        }

        let childrenLength = node.children.length
        let checkedChildren = node.children.filter(n => n.state.checked).length

        return checkedChildren > 0 && checkedChildren < childrenLength
      },

      updateCheckedState(node) {
        let children = node.children
        let parent = node.parent

        if (children) {
          let childrenLength = children.length
          let checkedChildren = children.filter(n => n.state.checked).length
          let setState = (state, key = 'checked') => {
            return function updateState(node) {
              node.state[key] = state

              if (node.children) {
                node.children.forEach(child => updateState(child))
              }
            }
          }

          // decheck all children
          if (node.state.mixed) {
            children.forEach(setState(false))
            children.forEach(setState(false, 'mixed'))
            children.forEach(setState(false, 'selected'))

            node.state.checked = false
            node.state.mixed = false
            node.state.selected = false
          } else {
            children.forEach(setState(node.state.checked))
          }
        }

        // check if need set mixed state...
        if (parent) {
          let childrenLength = parent.children.length
          let checkedChildren = parent.children.filter(n => n.state.checked).length

          if (checkedChildren > 0) {
            parent.state.mixed = checkedChildren < childrenLength
            parent.state.checked = checkedChildren == childrenLength
          } else {
            parent.state.checked = false
            parent.state.mixed = false
          }

          if (parent.parent) {
            let _parent = parent;
            let _mixed;

            while(_parent = _parent.parent) {
              _mixed = this.isMixed(_parent)

              if (_parent.state.mixed != _mixed) {
                _parent.state.mixed = _mixed
                _parent.state.checked = !_mixed
              }

              // _parent.state.mixed = this.isMixed(_parent)
              //
              // if (_parent.state.mixed) {
              //   _parent.state.checked = false
              // }
            }
          }
        }

      }
    }
  }
</script>

<style>
  .tree {
    overflow: auto;
  }

  .tree-root,
  .tree-children {
    list-style: none;
  }

  .tree > .tree-root {
    padding: 0;
  }
</style>
