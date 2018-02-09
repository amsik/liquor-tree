---
layout: default
id: index
---

## Introduction

This library allows you to present hierarchically organized data in a nice and logical manner based on [VueJS](http://vuejs.org) framework.
There are lots of libraries but always something was missing (in my humble opinion). This library includes all styles (although very little) and it appends `style` tag with styles to the document.

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

**It's time to start using the library**

It has to be installed to VueJS instance. You no need to care about styles, they automatically connect to the document.
Please take a look at the [official documentation](https://vuejs.org/v2/guide/components.html) to understand how to use VueJS components (if it needs of course).

- **When used with a module system there are 3 ways to registrate the component (maybe more... I don't know).
Okay. It's our ways:**

``` javascript
import Vue from 'Vue'
import LiquorTree from 'liquor-tree'

Vue.use(LiquorTree)
```

``` javascript
import Vue from 'Vue'
import LiquorTree from 'liquor-tree'

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

- **Here is another way in install `LiquorTree`. Using CDN**

``` html
<script src="https://cdn.jsdelivr.net/npm/liquor-tree/dist/vue-tree.esm.js"></script>
```

To registrate the library you can choose between 3 ways I mentioned before.
Okey, `LiquorTree` is installed. Let's go use it
