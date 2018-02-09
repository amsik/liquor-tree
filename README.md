# vue-tree

A Vue.js tree component.


## Features
* simple and convenient API
* very fast with large data
* keyboard support
* easily configurable

## Installation
**Install liquor-tree using npm:**

```shell
$ npm install --save liquor-tree
```

## Usage

**YouComponent.vue**

```html
    <tree
        :data="items"
        :options="options"
        @node:selected="onSelected"
        @node:checked="onChecked"
        ref="tree"
    />
```
```javascript
  import Vue from 'Vue'
  import VueTree from 'vue-tree'

  Vue.use(VueTree)

  export default {
    ...
    data() {
      return {
        items: [
          {text: 'Item 1'},
          {text: 'Item 2'},
          {text: 'Item 3', children: [
            {text: Item 3.1},
            {text: Item 3.2}
          ]}
        ]
      }
    },
    
    methods: {
      onSelected(node) {
      },
      
      onChecked(node) {
      }
    }
    ...
  }
```
