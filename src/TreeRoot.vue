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

        props: ['data', 'options'],

        data() {
            let computedData = Hierarchy(this.data);

            return {
                selectedNodes: [],
                computedData
            }
        },

        methods: {
            onToggle(data) {
                console.log(data);
            },

            onSelected(data) {
                if (this.options.checkbox) {
                    if (data.state.selected) {
                        this.selectedNodes.push(data);
                    } else {
                        this.selectedNodes.splice(this.selectedNodes.indexOf(data), 1);
                    }

                    if (data.children) {
                        this.deepSelect(data);
                    }

                    // data.state.selected = !data.state.selected;

                    // if (data.children) {
                    //     data.children.forEach(child => {
                    //         child.state.selected = data.state.selected;
                    //     });
                    // }

                } else {
                    let selected = this.selectedNodes[0];

                    if (selected) {
                        selected.state.selected = false;
                    }

                    this.selectedNodes.splice(0, 1, data);
                    this.$emit('selected', this.selectedNodes[0]);
                }
            },

            deepSelect(data) {
                data.children.forEach(child => {
                    child.state.selected = data.state.selected;

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
