<template>
  <li class="tree-node" :class="nodeClass">
    <i class="tree-arrow" @click="toggle"></i>
    <i class="tree-checkbox" v-if="options.multiple" @click="check"></i>
    <a
      href="javascript:void(0)"
      class="tree-anchor"
      v-html="data.text"
      @click="select">
      </a>

    <transition name="l-fade">
      <ul
        v-if="hasChildren() && state.opened"
        class="tree-children">
          <node
            v-for="(child, i) in data.children"
            :key="i"
            :data="child"
            :root="data"
            :options="options"
            @toggle="onToggle"
            @selected="onSelected"
            @checked="onChecked"
            >
          </node>
      </ul>
    </transition>
  </li>
</template>

<script>
  const TreeNode = {
    name: 'Node',

    props: ['data', 'root', 'options'],

    data() {
      return {
        state: this.data.state
      }
    },

    computed: {
      nodeClass() {
        let state = this.data.state;
        let hasChildren = this.hasChildren();

        return {
          'tree--has-child': hasChildren,
          'tree--opened': hasChildren && state.opened,
          'tree--selected': state.selected,
          'tree--checked': state.checked && this.options.multiple
        }
      }
    },

    methods: {
      onToggle(data) {
        this.$emit('toggle', data);
      },

      onChecked(data) {
        this.$emit('checked', data);
      },

      onSelected(data, ctrlKey) {
        this.$emit('selected', data, ctrlKey);
      },

      check() {
        this.data.state.checked = !this.data.state.checked;
        this.data.state.selected = this.data.state.checked;

        this.$emit('checked', this.data);
      },

      select(evnt) {
        if (!this.options.parentSelect && this.hasChildren()) {
          return this.toggle();
        }

        this.data.state.selected = !this.data.state.selected;
        this.$emit('selected', this.data, evnt.ctrlKey);
      },

      toggle() {
        if (this.hasChildren()) {
          this.data.state.opened = !this.data.state.opened;
          this.$emit('toggle', this.data);
        }
      },

      hasChildren() {
        return this.data.children && this.data.children.length > 0;
      }
    }
  }

  export default TreeNode;
</script>

<style>
  .tree-node {
    white-space: nowrap;
  }

  .tree-anchor {
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

  .tree-checkbox {
    display: inline-block;
    height: 30px;
    width: 30px;
    cursor: pointer;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAA8CAYAAABxVAqfAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAejAAAHowEwL7LFAAAAB3RJTUUH4QwLCxc1XFin0wAAAWNJREFUWMNjfP7m7X+GAQBMDAMERi0etXjU4sFt8fPnrxiuXr1NX4vfv//I0NY5g+H+wyf0s/jbtx8MnT2zGXR11Bl8vBzpY/GfP38Z+ifOZxAS5GdITgylTxz///+fYebs5Qw/fvxkyM+NZ2BmZqKPxStWbmW4e/cRQ2lxCgM7Oxt1UvXsuasYfv/5g1N+1+4jDIcOn2YoL01j4OPjoV52evbsJUNTyxSG9+8/YsidPnOZYeXqbQwlxckM4uIi1M3H1ZVZDAry0gzVdf0MN2/dh4vfun2fYcas5Qw5WbEMykpyJEcPI7EtkH37TzAsWbaRITrSl0FLU4WhoXkKQ0SYN4OjgzlZ6YKRlKbPrdsPGCZOXsjw48dPBi9Pe4bgQHeyEyQjqW2u9+8/Mdy6fZ/B3EyfopzAONrYG7V41OJRi0ctHrV41OJRi0ctHrV41OJRi0ctHrV41OJRi0ctHrWYegAAArh2QRte6KIAAAAASUVORK5CYII=');
    background-repeat: no-repeat;
    background-position-x: center;
    background-position-y: -30px;
  }

  .tree--checked > .tree-checkbox {
    background-position-y: 0;
  }

  .tree--checked > .tree-anchor {
    background: #dadada;
  }

  .tree-arrow {
    display: inline-block;
    height: 30px;
    cursor: pointer;
    margin-left: 30px;
    width: 0;
  }

  .tree--has-child > .tree-arrow {
    margin-left: 0;
    width: 30px;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAQAAACROWYpAAAACXBIWXMAAA3XAAAN1wFCKJt4AAADGGlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjaY2BgnuDo4uTKJMDAUFBUUuQe5BgZERmlwH6egY2BmYGBgYGBITG5uMAxIMCHgYGBIS8/L5UBFTAyMHy7xsDIwMDAcFnX0cXJlYE0wJpcUFTCwMBwgIGBwSgltTiZgYHhCwMDQ3p5SUEJAwNjDAMDg0hSdkEJAwNjAQMDg0h2SJAzAwNjCwMDE09JakUJAwMDg3N+QWVRZnpGiYKhpaWlgmNKflKqQnBlcUlqbrGCZ15yflFBflFiSWoKAwMD1A4GBgYGXpf8EgX3xMw8BSMDVQYqg4jIKAUICxE+CDEESC4tKoMHJQODAIMCgwGDA0MAQyJDPcMChqMMbxjFGV0YSxlXMN5jEmMKYprAdIFZmDmSeSHzGxZLlg6WW6x6rK2s99gs2aaxfWMPZ9/NocTRxfGFM5HzApcj1xZuTe4FPFI8U3mFeCfxCfNN45fhXyygI7BD0FXwilCq0A/hXhEVkb2i4aJfxCaJG4lfkaiQlJM8JpUvLS19QqZMVl32llyfvIv8H4WtioVKekpvldeqFKiaqP5UO6jepRGqqaT5QeuA9iSdVF0rPUG9V/pHDBYY1hrFGNuayJsym740u2C+02KJ5QSrOutcmzjbQDtXe2sHY0cdJzVnJRcFV3k3BXdlD3VPXS8Tbxsfd99gvwT//ID6wIlBS4N3hVwMfRnOFCEXaRUVEV0RMzN2T9yDBLZE3aSw5IaUNak30zkyLDIzs+ZmX8xlz7PPryjYVPiuWLskq3RV2ZsK/cqSql01jLVedVPrHzbqNdU0n22VaytsP9op3VXUfbpXta+x/+5Em0mzJ/+dGj/t8AyNmf2zvs9JmHt6vvmCpYtEFrcu+bYsc/m9lSGrTq9xWbtvveWGbZtMNm/ZarJt+w6rnft3u+45uy9s/4ODOYd+Hmk/Jn58xUnrU+fOJJ/9dX7SRe1LR68kXv13fc5Nm1t379TfU75/4mHeY7En+59lvhB5efB1/lv5dxc+NH0y/fzq64Lv4T8Ffp360/rP8f9/AA0ADzT6lvFdAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAACCSURBVHja7JSxDkBQDEVPzYIVg/gAETaL//8NFonJKiRMwlAR78UgtOs9uU1vU1kwL4cffjcsrkTC3vecUxq8S+tFbSBnJNxMT1SnMFT0JKYw1AwEpjCUzASmMBR0xLrKKucHx7ZYmEVUFkeSMR3PU1eJ/gDFx6c9wqrq/56fgNcBAInl7e4ANk/XAAAAAElFTkSuQmCC');
    background-repeat: no-repeat;
    transition: transform .3s;
  }

  .tree--opened > .tree-arrow {
    transform: rotate(90deg);
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
