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
    import TreeNode from './TreeNode.vue';
    import Hierarchy from './Hierarchy.js';

    export default {
        name: 'Tree',

        components: {
            'node': TreeNode
        },

        props: {
            data: {
                type: Array,
                default: function() {return []}
            },

            options: {
                type: Object,
                default: function() {return {}}
            }
        },

        data() {
            let computedData = Hierarchy(this.data);

            return {
                selectedNodes: [],
                computedData
            }
        },

        methods: {
            onToggle(data) {
                this.$emit('toggle', data);
            },

            onChecked(data) {
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

            onSelected(data) {
                console.log('selected');
                let selected = this.selectedNodes[0];

                if (selected) {
                    selected.state.selected = false;
                }

                this.selectedNodes.splice(0, 1, data);
                this.$emit('selected', this.selectedNodes[0]);
            },

            deepSelect(data) {
                data.children.forEach(child => {
                    child.state.checked = data.state.checked;

                    if (child.children) {
                        this.deepSelect(child);
                    }
                });
            }
        }
    }
</script>

<style>
    .tree-root,
    .tree-children {
        list-style: none;
    }
</style>
