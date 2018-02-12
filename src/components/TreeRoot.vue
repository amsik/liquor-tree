<template>
    <div class="tree">
        <ul class="tree-root">
            <node
                v-for="(node, i) in model"
                :key="i"
                :node="node"
                :options="options"
            />
        </ul>
    </div>
</template>

<script>
  import TreeNode from '@/components/TreeNode.vue'
  import TreeMixin from '@/mixins/TreeMixin'
  import Tree from '@/lib/Tree'

  const defaults = {
    multiple: true,
    checkbox: false,
    parentSelect: false
  }

  export default {
    name: 'Tree',
    components: {
      'node': TreeNode
    },

    mixins: [TreeMixin],

    provide: _ => ({
      tree: new Tree()
    }),

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
      // we should not mutating a prop directly... that's why we add if it necessary
      for (let prop in defaults) {
        if ( false === (prop in this.options) ) {
          this.options[prop] = defaults[prop]
        }
      }

      return {
        model: null,
        tree: null
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
