---
layout: default
id: index
---

## Introduction

This library allows you to present hierarchically organized data in a nice and logical manner based on [VueJS](http://vuejs.org) framework.
There are lots of libraries but always something was missing (in my humble opinion). It is an attempt to make a __perfect__ tree.

`Just try it. The tree you were waiting for!`


### Features
- events for every action
- flexible configuration
- any number of instances per page
- multi selection (use Ctrl + Click or API) | optional
- ready for touch devices

## Getting Started

### Installation

To install `liquor-tree` using npm:

``` bash
$ npm install --save liquor-tree
```

#### CDN:

``` html
<script src="https://cdn.jsdelivr.net/npm/liquor-tree/dist/vue-tree.esm.js"></script>
```


It has to be installed to VueJS instance. You no need to care about styles, they are automatically appended to the document.
Please take a look at the [official documentation](https://vuejs.org/v2/guide/components.html) to understand how to use VueJS components (if it needs of course).

**When used with a module system there are 3 ways to registrate the component (maybe more... I don't know).
Okay. It's our ways:**

``` javascript
import Vue from 'Vue'
import LiquorTree from 'liquor-tree'

// global registration
Vue.use(LiquorTree)
```

``` javascript
import Vue from 'Vue'
import LiquorTree from 'liquor-tree'

// global registration
Vue.component(LiquorTree.name, LiquorTree)
```

``` javascript
import LiquorTree from 'liquor-tree'

export default {
  name: 'your-awesome-component',
  components: {
    // you can name tree as you wish
    [LiquorTree.name]: LiquorTree
  },
  ...
}
```

To registrate the library you can choose between 3 ways I mentioned before.
Okey, `LiquorTree` is installed. Let's go use it

### Basic Usage

#### ES6 (using vue-loader)

``` javascript
<template>
  <div id="app">
    <tree
      :data="treeData"
    />
  </div>
</template>

<script>
  import Vue from 'Vue'
  import LiquorTree from 'liquor-tree'

  Vue.use(LiquorTree)

  export default {
    name: 'awesome-component',
    data: () => ({
      treeData: [
        { text: 'Item 1' },
        { text: 'Item 2' },
        { text: 'Item 3', state: { selected: true } },
        { text: 'Item 4' }
      ]
    })
  }

</script>
```

#### If you are using CDN that's all you need to build your first app (I mean app that using `VueTree` library)

``` html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
</head>
<body>
  <div id="app">
    <tree
      :data="treeData"
      :options="treeOptions"
      @node:selected="onNodeSelected"
    />
  </div>
</body>
  <!-- first import Vue -->
  <script src="https://unpkg.com/vue/dist/vue.js"></script>
  <!-- import JavaScript -->
  <script src="https://cdn.jsdelivr.net/npm/liquor-tree/dist/vue-tree.esm.js"></script>
  <script>
    new Vue({
      el: '#app',
      data: function() {
        return {
          treeData: [
            // see below the format of data
          ],
          treeOptions: {
            miltiple: false
          }
        }
      }
    })
  </script>
</html>
```
