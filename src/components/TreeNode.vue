<template>
  <li class="tree-node" :class="nodeClass">
    <i class="tree-arrow" @click="toggleExpand"></i>
    <i class="tree-checkbox" v-if="options.checkbox" @click="check"></i>

    <a
      href="javascript:void(0)"
      class="tree-anchor"
      tabindex="1"
      ref="anchor"
      @focus="onNodeFocus"
      @click="select">
        <node-content :node="node" />
    </a>

    <transition name="l-fade">
      <ul
        v-if="hasChildren() && state.expanded"
        class="tree-children">
          <node
            v-for="(child, i) in node.children"
            v-if="child.visible()"

            :key="child.id"
            :node="child"
            :options="options"
            >
          </node>
      </ul>
    </transition>
  </li>
</template>

<script>
  const TreeNode = {
    name: 'Node',
    inject: ['tree'],
    props: ['node', 'options'],

    components: {
      NodeContent: {
        props: ['node'],
        render(h) {
          const node = this.node
          const vm = this.node.tree.vm

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

    data() {
      this.node.vm = this

      return {
        state: this.node.states
      }
    },

    computed: {
      nodeClass() {
        let state = this.state
        let hasChildren = this.hasChildren()
        let classes = {
          'tree--has-child': hasChildren,
          'tree--expanded': hasChildren && state.expanded,
          'tree--selected': state.selected,
          'tree--disabled': state.disabled
        }

        if (this.options.checkbox) {
          classes['tree--checked'] = state.checked
          classes['tree--indeterminate'] = state.indeterminate
        }

        return classes
      }
    },


    methods: {
      onNodeFocus() {
        this.tree.activeElement = this.node
      },

      focus() {
        this.$refs.anchor.focus()
      },

      check() {
        if (this.node.checked()) {
          this.node.uncheck()
        } else {
          this.node.check()
        }
      },

      select({ctrlKey} = evnt) {
        const opts = this.options

        if (opts.checkbox && opts.checkOnSelect) {
          if (!opts.parentSelect && this.hasChildren()) {
            return this.toggleExpand()
          }

          return this.check(ctrlKey)
        }

        // 'parentSelect' behaviour.
        // For nodes which has a children list we have to expand/collapse
        if (!opts.parentSelect && this.hasChildren()) {
          return this.toggleExpand()
        }

        let tree = this.tree
        let node = this.node

        if (opts.multiple) {
          if (!node.selected()) {
            node.select(ctrlKey)
          } else {
            if (ctrlKey) {
              node.unselect()
            } else {
              tree.unselectAll()
              node.select()
            }
          }
        } else {
          if (node.selected()) {
            node.unselect()
          } else {
            node.select()
          }
        }
      },

      toggleExpand() {
        if (this.hasChildren()) {
          this.node.toggleExpand()
        }
      },

      hasChildren() {
        return this.node.hasChildren()
      }
    }
  }

  export default TreeNode
</script>

<style>
  .tree-node {
    white-space: nowrap;
  }

  .tree-arrow {
    display: inline-block;
    height: 30px;
    cursor: pointer;
    margin-left: 30px;
    width: 0;
  }

  .tree-checkbox {
    display: inline-block;
    position: relative;
    width: 30px;
    height: 30px;
    box-sizing: border-box;
    border: 1px solid #dadada;
    border-radius: 2px;
    background: #fff;
    transition: border-color .25s, background-color .25s;
  }

  .tree-checkbox:after,
  .tree-arrow:after {
    position: absolute;
    display: block;
    content: "";
  }

  .tree--checked > .tree-checkbox,
  .tree--indeterminate > .tree-checkbox {
    background-color: #3a99fc;
    border-color: #218eff;
  }

  .tree--checked > .tree-checkbox:after {
    box-sizing: content-box;
    border: 1.5px solid #fff; /* probably width would be rounded in most cases */
    border-left: 0;
    border-top: 0;
    left: 9px;
    top: 3px;
    height: 15px;
    width: 8px;
    transform: rotate(45deg) scaleY(0);
    transition: transform .25s;
    transform-origin: center;
  }

  .tree--checked > .tree-checkbox:after {
    transform: rotate(45deg) scaleY(1);
  }

  .tree--indeterminate > .tree-checkbox:after {
    background-color: #fff;
    top: 50%;
    left: 20%;
    right: 20%;
    height: 2px;
  }

  .tree-anchor {
    outline-color: #eee;
    outline-width: 1px;
    display: inline-block;
    text-decoration: none;
    color: #343434;
    vertical-align: top;
    height: 24px;
    line-height: 24px;
    padding: 3px 6px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .tree-anchor:hover {
    background-color: #fafafa;
  }

  .tree--selected > .tree-anchor {
    background: #f0f0f0;
  }

  .tree--has-child > .tree-arrow {
    margin-left: 0;
    width: 30px;
    position: relative;
  }

  .tree--has-child > .tree-arrow:after {
    border: 1.5px solid #494646;
    position: absolute;
    border-left: 0;
    border-top: 0;
    left: 9px;
    top: 50%;
    height: 9px;
    width: 9px;
    transform: rotate(-45deg) translateY(-50%) translateX(0);
    transition: transform .25s;
    transform-origin: center;
  }

  .tree--expanded > .tree-arrow:after {
    transform: rotate(45deg) translateY(-50%) translateX(-5px);
  }

  .tree--disabled {
    color: #fff;
    background: #fff;
    opacity: .6;
    cursor: default;
  }

  .tree--disabled > .tree-anchor,
  .tree--disabled > .tree-anchor span {
    background: #fff;
    cursor: default;
  }

  .tree--disabled > .tree-anchor:focus {
    outline: none;
  }

  .l-fade-enter-active, .l-fade-leave-active {
    transition: opacity .3s, transform .3s;
    transform: translateX(0);
  }

  .l-fade-enter, .l-fade-leave-to {
    opacity: 0;
    transform: translateX(-2em);
  }

</style>
