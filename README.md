# Liquor Tree

A Vue tree component that allows you to present hierarchically organized data in a nice and logical manner.

[documentation](https://amsik.github.io/liquor-tree/) | [demos](https://amsik.github.io/liquor-tree/#Examples)

## Features
* mobile friendly
* events for every action
* flexible configuration
* any number of instances per page
* multi selection
* keyboard navigation

## Installation
**Npm:**

```shell
$ npm install liquor-tree
```

**Yarn:**

``` shell
$ yarn add liquor-tree
```

## Usage

```html
  <!-- Vue Component -->
  <template>
    <tree
        :data="items"
        :options="options"
        @node:selected="onSelected"
        @node:checked="onChecked"
        ref="tree"
    />
  </template>

  <script>
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
  </script>
```

## License

[MIT](https://opensource.org/licenses/MIT)
