<template>
    <li class="tree-node" :class="{'tree--has-child': hasChildren(), 'tree--opened': hasChildren() && state.opened, 'tree--selected': state.selected}">
        <i class="tree-arrow" @click="toggleState"></i>
        <i class="tree-checkbox" v-if="options.checkbox" @click="onClick"></i>
        <a
            href="javascript:void(0)"
            class="tree-anchor"
            @click="onClick"
            @mouseenter="onMouseEnter"
            @mouseleave="onMouseLeave">
                {{ data.text }}
        </a>

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
                >
                </node>
        </ul>

    </li>
</template>

<script>
    import TreeNode from './TreeNode.vue';

    export default {
        name: 'Node',

        props: ['data', 'root', 'options'],

        data() {
            return {
                state: this.data.state
            }
        },

        methods: {
            onToggle(data) {
                this.$emit('toggle', data);
            },

            onSelected(data) {
                this.$emit('selected', data);
            },

            toggleState() {
                if (this.hasChildren()) {
                    this.data.state.opened = !this.data.state.opened;
                    this.$emit('toggle', this.data);
                }
            },


            onClick() {
                this.data.state.selected = !this.data.state.selected;
                this.$emit('selected', this.data);
            },

            onMouseLeave() {

            },

            onMouseEnter() {

            },

            getEventData() {
                return this.data;
            },

            hasChildren() {
                return this.data.children && this.data.children.length > 0;
            }
        }
    }
</script>

<style>
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
        background-color: #eee;
    }

    .tree--selected > .tree-anchor {
        background: #dadada;
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

    .tree--selected > .tree-checkbox {
        background-position-y: 0;
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
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAA8CAQAAADbXcIUAAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfhDAsIEgqVD8DyAAAAqElEQVRIx+2WvQqDMBRGj53FZk0F8wQiurn4/m8SyJQ1xKFLh1KUxhs69Z41fOTnhnsuKP9My0MeHsl08vhEwtJI4ysBJ999I2Lk8YW9Jj7j6Y+Xbr+sd8WxKx6solQVn6Tqe94ZtDsoiqJc6pvjSTNuv4cHMtOBAnLZlNKRWD/Ek8oVYAlsb7oL2PJ7Nzgiy0uyEXfVWYadmVnqZ4PHyyeS/mwaUZRCnkuXHRqKzB2RAAAAAElFTkSuQmCC');
        background-repeat: no-repeat;
        background-position: 0 0;
    }

    .tree--opened > .tree-arrow {
        background-position: 0 -31px;
    }

</style>
