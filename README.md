A Vue tree component that allows you to present hierarchically organized data in a nice and logical manner.

[documentation](https://amsik.github.io/liquor-tree/) | [demos](https://amsik.github.io/liquor-tree/)

## Features
* events for every action
* flexible configuration
* any number of instances per page
* multi selection (use Ctrl + Click or API) | optional
* ready for touch devices

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
