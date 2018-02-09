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
        default: _ => ({
          multiple: true,
          checkbox: false,
          parentSelect: false
        })
      }
    },

    data() {
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
