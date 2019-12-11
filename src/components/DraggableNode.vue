<template>
  <div
    class="tree-dragnode"
    :style="style"
  >
    {{ target.node.text }}
  </div>
</template>

<script>
  export default {
    name: 'DragNode',
    props: ['target'],
    computed: {
      style() {
        if (undefined === this.target.top) {
          return 'display: none'
        }

        return `top: ${this.target.top}px; left: ${this.target.left}px`
      }
    }
  }
</script>

<style>
  .tree-dragnode {
    padding: 10px;
    border: 1px solid #e7eef7;
    position: fixed;
    border-radius: 8px;
    background: #fff;
    transform: translate(-50%, -110%);
    z-index: 10;
  }
</style>
