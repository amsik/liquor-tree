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
        // 'parentSelect' behaviour.
        // For nodes which has a children list we have to expand/collapse
        if (!this.options.parentSelect && this.hasChildren()) {
          return this.toggleExpand()
        }

        let tree = this.tree
        let node = this.node

        if (this.options.multiple) {
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
    height: 30px;
    width: 30px;
    cursor: pointer;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAABaCAYAAACv+ebYAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAejAAAHowEwL7LFAAAAB3RJTUUH4gIDCy4HZhufyQAAAZVJREFUaN7t2U8og3EYB/DvO3pdRKR2UIiViNzsyE4yHCQiSSIHkQOSFuZPSqklDliSkhknBw4UhYPiJgebNaQtorc5rHfz6nVz0cqYdzt8n+PvOXz69TxPPfUI/pdXFXEIHeIUhAkTTmzY73/G9bVbW1iSApiZXYL3/lE7OBiUMTtnR2lJIWrNJm1gRfmAbX4NmRnp6Oxo1KbGqqpi2e6ALIfQ39eOpCSdNvCWcw8ezwOGBrqQkiLGpqvtq9t4V5SI+YPDM5ycXmB4qBtpaamxGyef7wmT04uQpMC33MXlFZw7+xgc6IRenxXbObaM9CAvNxuWMRtuXN6vd5fbi6UVB3p72lCQnxN1eYSfbiBHx+fY2NxFa0sdiosMsE4tormpBqZK46/6Qohm9XG57zC/sA5ZDsFcXYGG+qpfN6QQ7c4lSW9wub0wlpf9aRIELnuECRMmTJgwYcKECRMmTJgwYcKECRMmTJgwYcL/EMmRElMTVnhubyGKIhDtnUYAwuEwCgwGjI5bE+vHvDsRJkyYMOGI8Ql68IQ9vE0/3AAAAABJRU5ErkJggg==');
    background-repeat: no-repeat;
    background-position-x: center;
    background-position-y: -30px;
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

  .tree--checked > .tree-checkbox {
    background-position-y: 0;
  }

  .tree--indeterminate > .tree-checkbox {
    background-position-y: -60px;
  }

  .tree--checked > .tree-anchor {
    background: #dadada;
  }

  .tree--has-child > .tree-arrow {
    margin-left: 0;
    width: 30px;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAQAAACROWYpAAAACXBIWXMAAA3XAAAN1wFCKJt4AAADGGlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjaY2BgnuDo4uTKJMDAUFBUUuQe5BgZERmlwH6egY2BmYGBgYGBITG5uMAxIMCHgYGBIS8/L5UBFTAyMHy7xsDIwMDAcFnX0cXJlYE0wJpcUFTCwMBwgIGBwSgltTiZgYHhCwMDQ3p5SUEJAwNjDAMDg0hSdkEJAwNjAQMDg0h2SJAzAwNjCwMDE09JakUJAwMDg3N+QWVRZnpGiYKhpaWlgmNKflKqQnBlcUlqbrGCZ15yflFBflFiSWoKAwMD1A4GBgYGXpf8EgX3xMw8BSMDVQYqg4jIKAUICxE+CDEESC4tKoMHJQODAIMCgwGDA0MAQyJDPcMChqMMbxjFGV0YSxlXMN5jEmMKYprAdIFZmDmSeSHzGxZLlg6WW6x6rK2s99gs2aaxfWMPZ9/NocTRxfGFM5HzApcj1xZuTe4FPFI8U3mFeCfxCfNN45fhXyygI7BD0FXwilCq0A/hXhEVkb2i4aJfxCaJG4lfkaiQlJM8JpUvLS19QqZMVl32llyfvIv8H4WtioVKekpvldeqFKiaqP5UO6jepRGqqaT5QeuA9iSdVF0rPUG9V/pHDBYY1hrFGNuayJsym740u2C+02KJ5QSrOutcmzjbQDtXe2sHY0cdJzVnJRcFV3k3BXdlD3VPXS8Tbxsfd99gvwT//ID6wIlBS4N3hVwMfRnOFCEXaRUVEV0RMzN2T9yDBLZE3aSw5IaUNak30zkyLDIzs+ZmX8xlz7PPryjYVPiuWLskq3RV2ZsK/cqSql01jLVedVPrHzbqNdU0n22VaytsP9op3VXUfbpXta+x/+5Em0mzJ/+dGj/t8AyNmf2zvs9JmHt6vvmCpYtEFrcu+bYsc/m9lSGrTq9xWbtvveWGbZtMNm/ZarJt+w6rnft3u+45uy9s/4ODOYd+Hmk/Jn58xUnrU+fOJJ/9dX7SRe1LR68kXv13fc5Nm1t379TfU75/4mHeY7En+59lvhB5efB1/lv5dxc+NH0y/fzq64Lv4T8Ffp360/rP8f9/AA0ADzT6lvFdAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAACCSURBVHja7JSxDkBQDEVPzYIVg/gAETaL//8NFonJKiRMwlAR78UgtOs9uU1vU1kwL4cffjcsrkTC3vecUxq8S+tFbSBnJNxMT1SnMFT0JKYw1AwEpjCUzASmMBR0xLrKKucHx7ZYmEVUFkeSMR3PU1eJ/gDFx6c9wqrq/56fgNcBAInl7e4ANk/XAAAAAElFTkSuQmCC');
    background-repeat: no-repeat;
    transition: transform .3s;
  }

  .tree--expanded > .tree-arrow {
    transform: rotate(90deg);
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
    outline: none
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
