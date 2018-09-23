<template>
  <div role="tree" :class="{'tree': true, 'tree-loading': this.loading, 'tree--draggable' : !!this.draggableNode}">
    <template v-if="filter && matches.length == 0" >
      <div class="tree-filter-empty">{{ opts.filter.emptyText }}</div>
    </template>
    <template v-else>
      <ul class="tree-root" @dragstart="onDragStart">
        <template v-if="opts.filter.plainList && matches.length > 0">
          <TreeNode
            v-for="node in matches"
            v-if="node.visible()"

            :key="node.id"
            :node="node"
            :options="opts"
          />
        </template>
        <template v-else>
          <TreeNode
            v-for="node in model"
            v-if="node.visible()"

            :key="node.id"
            :node="node"
            :options="opts"
          />
        </template>
      </ul>
    </template>

    <DraggableNode v-if="draggableNode" :target="draggableNode" />
  </div>
</template>

<script>
  import TreeNode from '@/components/TreeNode'
  import DraggableNode from '@/components/DraggableNode'
  import TreeMixin from '@/mixins/TreeMixin'
  import TreeDnd from '@/mixins/DndMixin'
  import Tree from '@/lib/Tree'

  const defaults = {
    multiple: true,
    checkbox: false,
    checkOnSelect: false,
    autoCheckChildren: true,
    parentSelect: false,
    keyboardNavigation: true,
    paddingLeft: 24,
    fetchData: null,
    propertyNames: null,
    deletion: false,
    dnd: false,
    onFetchError: function(err) { throw err }
  }

  const filterDefaults = {
    emptyText: 'Nothing found!',
    matcher(query, node) {
      return new RegExp(query, 'i').test(node.text)
    },
    plainList: false,
    showChildren: true
  }

  export default {
    name: 'Tree',
    components: {
      TreeNode,
      DraggableNode
    },

    mixins: [TreeMixin, TreeDnd],

    provide: _ => ({
      tree: null
    }),

    props: {
      data: {},

      options: {
        type: Object,
        default: _ => ({})
      },

      filter: String
    },

    watch: {
      filter (term) {
        this.tree.filter(term)
      }
    },

    data () {
      // we should not mutating a prop directly...
      // that's why we have to create a new object
      // TODO: add method for changing options
      let opts = Object.assign({}, defaults, this.options)

      opts.filter = Object.assign(
        {},
        filterDefaults,
        opts.filter
      )

      return {
        model: null,
        tree: null,
        loading: false,
        opts,
        matches: [],
        draggableNode: null
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
    padding: 0;
  }

  .tree > .tree-root,
  .tree > .tree-filter-empty {
    padding: 3px;
    box-sizing: border-box;
  }

  .tree.tree--draggable .tree-node:not(.selected) > .tree-content:hover {
    background: transparent;
  }
/* 
  .tree.tree--draggable .tree-node.has-child > .tree-content:hover {
    border: 1px solid #d7e3f3;
  } */

  .drag-above,
  .drag-below,
  .drag-on {
    position: relative;
  }

  .drag-on {
    background: #cfe0f6;
    outline: 1px solid #7baff2;
  }

  .drag-above::before, .drag-below::before {
    background-color: rgb(51, 103, 214);
    border: 3px solid rgb(51, 103, 214);
    background-clip: padding-box;
    border-bottom-color: transparent;
    border-top-color: transparent;
    border-radius: 0;
    box-sizing: border-box;
    content: '';
    display: block;
    height: 8px;
    width: 100%;
    position: absolute;
  }

  .drag-above::before {
    top: 0;
    transform: translateY(-50%);
  }

  .drag-below::before {
    bottom: 0;
    transform: translateY(50%);
  }
</style>
