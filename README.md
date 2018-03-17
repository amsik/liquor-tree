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
          ],
          options: {
            checkbox: true
          }
        }
      }
      ...
    }
  </script>
```

## Development

Check out the `package.json`s script section. There are 2 scripts:

- `npm run dev` - it will open browser and you can *play* with code
- `npm run build` - it will craete a module file in `production` mode 


## License

[MIT](https://opensource.org/licenses/MIT)
