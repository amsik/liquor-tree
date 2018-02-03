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
        default: _ => ({})
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

      onChecked(data) {
        if (data.children) {
          this.deepSelect(data)
        }

        this.$emit('checked', data)
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

      deepSelect(data) {
        data.children.forEach(child => {
          child.state.checked = data.state.checked

          if (child.children) {
            this.deepSelect(child)
          }
        });
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
