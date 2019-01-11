---
layout: default
id: index
---

## Introduction

This library allows you to present hierarchically organized data in a nice and logical manner based on the [VueJS](http://vuejs.org) framework.
There are lots of libraries but there was always something from each (in my humble opinion). It is an attempt to make a __perfect__ tree.

`Just try it. The tree you were waiting for!`


### Features
* drag&drop
* mobile friendly
* events for every action
* flexible configuration
* any number of instances per page
* multi selection
* keyboard navigation
* filtering
* sorting
* integration with Vuex



## Getting Started

### Installation

- npm: `$ npm install liquor-tree`
- Yarn: `$ yarn add liquor-tree`

It has to be installed to the VueJS instance. Please take a look at the [official documentation](https://vuejs.org/v2/guide/components.html) to understand how to use VueJS components (if needed, of course).

You don't need to care about styles, they are automatically appended to the document.

__When used with a module system there are 3 ways to register the component (maybe more... I don't know).
Okay. It's our ways:__

``` javascript
import Vue from 'Vue'
import LiquorTree from 'liquor-tree'

// global registration
Vue.use(LiquorTree)

// or
Vue.component(LiquorTree.name, LiquorTree)
```


``` javascript
import LiquorTree from 'liquor-tree'

// local registration
export default {
  name: 'your-awesome-component',
  components: {
    [LiquorTree.name]: LiquorTree
  },
  ...
}
```

To register the library you can choose between the 3 methods I mention above.

**When used directly in browser you can include `liquor-tree` via CND (it is a latest version of the library):**

```html
<script src="https://cdn.jsdelivr.net/npm/liquor-tree/dist/liquor-tree.umd.js"></script>
```

### Component Options

| Name                   | Type         |  Default  | Description |
|------------------------|:------------:|:---------:|-------------|
| **multiple**           | Boolean   | true    | Allows to select more than one node.  |
| **checkbox**           | Boolean   | false   | `checkbox` mode. It shows checkboxes for every node           |
| **checkOnSelect**      | Boolean   | false   | For `checkbox` mode only. Node will have `checked` state when user clicks either text or checkbox |
| **autoCheckChildren**  | Boolean   | true    | For `checkbox` mode only. Children will have the same `checked` state as their parent. |
| **autoDisableChildren**| Boolean   | true    | Toggles whether children will have the same `disabled` state as their parent. |
| **parentSelect**       | Boolean   | false   | By clicking node which has children it expands node. i.e we have two ways to expand/collapse node: by clicking on arrow and on text |
| **keyboardNavigation** | Boolean   | true    | Allows user to navigate tree using keyboard |
| **propertyNames**      | Object    | -       | This options allows the default tree's structure to be redefined. [See example](#Redefine-Structure) |
| **deletion**           | Boolean	&#124; Function | false | If **keyboardNavigation** is false this property is ignored. This property defines deletion behaviour. [See example](#Keyboard-Navigation) |
| **fetchData**         | Object | - | See [guide](#Async-Data) |
| **dnd**         | Object | - | See [guide](#Drag-amp-Drop) |
| **editing**         | Object | - | See [guide](#Inline-Editing) |




### Structure

The component has only two props: **data** and **options**. For more information about props read [VueJS documentation](https://vuejs.org/v2/guide/components.html#Passing-Data-with-Props).
Additionally, see [filtering](#Filtering).

- property **options** - This property defines tree behavior. See [Component Options](#Component-Options)
- property **data** - Array-like object that defines tree nodes

Property **data** has its own structure for every node:

``` javascript
{
  "id": Number,
  "text": String,
  "data": Object,
  "children": Array,
  "state": Object
}
```


* `id`: By default if node didn't have an `id` it will be generated randomly
* `text`: Label for Node
* `data`: Intermediate data for each node. It can be anything you want. This object is created for every node and VueJS makes this property reactive.
* `children`: List of child nodes.
* `state`: Allows user to set Node's state.

By default a Node has the following states: 
  ```javascript
  {
    "selected": false,
    "selectable": true,
    "checked": false,
    "expanded": false,
    "disabled": false,
    "visible": true,
    "indeterminate": false,
    "matched": false,
    "editable": true,
    "dragging": false,
    "draggable": true,
    "dropable": true
  }
  ```
It is not necessary to pass all the states for every Node. It will automatically merged with the default states object.

Initial **data** example:

``` javascript
  const treeData = [
    { text: 'Item 1', state: { visible: false } },
    { text: 'Item 2', data: { customProp: 'AAAAAAAAAAAAAAAAAAAA' } },
    { text: 'Item 3', state: { selected: true } },
    { text: 'Item 4' },
    { text: 'Item 5', children: [
      { text: 'Item 5.1', state: { disabled: true } },
      { text: 'Item 5.2', state: { selectable: false } }
    ]}
    // and so on ...
  ]
```



### Basic Usage

#### ES6 (using vue-loader)

```javascript
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

The following example illustrates linking to the `VueTree` library without having to register the library as a component:

```html
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
    />
  </div>
</body>
  <!-- first import Vue -->
  <script src="https://unpkg.com/vue/dist/vue.js"></script>
  <!-- import JavaScript -->
  <script src="https://cdn.jsdelivr.net/npm/liquor-tree/dist/liquor-tree.umd.js"></script>
  <script>
    new Vue({
      el: '#app',
      data: function() {
        return {
          treeData: [
            // see above the format of data
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

## Guides

### Basic Features

This example demonstrates default behaviour of tree without any configurations. Each node from received data has its **own states properties** ([view full list](#node-atata))

<iframe width="100%" height="500" src="//jsfiddle.net/amsik/25bv7nh0/embedded/html,result/dark/" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>

You able to select multiple nodes with `Ctrl` key. The same behavior as we are used to ;)

### Checkboxes

The example above is default mode. You can switch it to `checkbox` mode. To do it just add the tree's option `checkbox`:

``` html
    <tree
      :data="treeData"
      :options="{ checkbox: true }"
    />
```

<iframe width="100%" height="500" src="//jsfiddle.net/amsik/ewcy3jee/embedded/html,result/dark/" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>

> States of node like **checked** and **selected** are not interchangeable. They can be used together.


### Redefine Structure
  This component has `strict` structure. But! You can easily **redefine** this format. Yeah... Sometimes you don't want to change your server-side code and you have very different format for tree. To do this you just need to send the object:

For instance you have data:

``` javascript
[
 { 'SOME-AWESOME-PROPERTY-FOR-TEXT': 'Item 1' },
 { 'SOME-AWESOME-PROPERTY-FOR-TEXT': 'Item 2' },
 { 'SOME-AWESOME-PROPERTY-FOR-TEXT': 'Item 3', 'kids': [
  { 'SOME-AWESOME-PROPERTY-FOR-TEXT': 'Item 3.1' },
  { 'SOME-AWESOME-PROPERTY-FOR-TEXT': 'Item 3.2' }
 ]}
]

```

You just need to add `propertyNames` options to **Component Options**:


``` javascript
 {
  'text': 'SOME-AWESOME-PROPERTY-FOR-TEXT',
  'children': 'kids'
 }
```

Then your data will be transformed to a readable tree format. Awesome! See [example](#Redefine-Structure-Example) below.


### Keyboard Navigation

By default **keyboardNavigation** options is true. It allows user to navigate the tree using a keyboard. Navigation is implemented in the usual way (i.e Windows Navigation pane). Disabled Nodes are ignored.

You also have the abillity to define condition to remove Node. To do this, determine the **deletion** component option.
It receives Boolean object (default is false) or Function.

  - If this property received a `true` it will remove selected Node
  - If this property revieved a `function` it will remove Node **IF** the `function` return `true`

Ohh, too hard. See example:

- In this case Node will be removed

```javascript
    <tree
      :data="treeData"
      :options="{ deletion: true }"
    />
```

- In this case if Node doesn't have children it will be removed

```javascript
    <tree
      :data="treeData"
      :options="{ deletion: node => !node.hasChildren() }"
    />
```
The [example above](#Checkboxes) removes ONLY nodes that has `checked` state (use DEL code on your keyboard).

### Filtering

We do not know where to show the field for filtering, how to stylize it and so on... It depends on a situation.
So we decided to provide a powerfull API to handle it (the library don't know about other components on the page and this is not necessary). See examples to understand ;)

**Default props:**

```javascript
{
  emptyText: 'Nothing found!',
  matcher(query, node) {
    return new RegExp(query, 'i').test(node.text)
  },
  plainList: false,
  showChildren: true
}
```

- **emptyText** - shows when nothing is found
- **showChildren** - this property hides the children of the node if they are available
- **matcher** - this function determines whether the node is suitable for condition
- **plainList** - this property breaks the tree structure and shows a plain list of matched results (but it easy to fix the structure by clearing filter :-D)

<iframe width="100%" height="500" src="//jsfiddle.net/amsik/o7v4a2nL/embedded/js,html,css,result/dark/" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>


### Async Data

There are two ways to set an async data:
- **data** property as a Promise. You can pass it as an array (a lot of examples above) or as a Promise-like object (object that has the **then** method)
- **fetchData** options. This option is flexible. See examples below.

**minFetchDelay** option - this option provides a minimum delay before rendering the children list. For example request takes 15 ms and you will not see the loading indicator. To see the indicator you need to set this property to 1000 (for example).

**fetchData** options: 

- As a string. It is like a pattern. The construction in curly brackets is replaced with similar values in the node object
  
```javascript
  {
    treeOptions: {
      minFetchDelay: 1000,
      fetchData: `/assets/data/fetch0/data-{id}.json`,
      // fetchData: `/data?id={id}&text={text}`
    }
  }
```

- As a function that returns a string. The same as above. It is run for each request.

```javascript
  {
    treeOptions: {
      fetchData(node) {
        return `/assets/data/fetch0/data-${node.id}.json`
      }
    }
  }
```

- As a function that returns a promise-like object. You can do a request to server as you wish

```javascript
  {
    treeOptions: {
      fetchData(node) {
        return fetch(`/assets/data/fetch0/data-${node.id}.json`)
          .then(r => r.json())
          .catch(e => console.log(e))
      },

      // or
      fetchData(node) {
        return axios.get('/user', {
          params: {
            ID: node.id
          }
        })
      }
    }
  }
```


### Inline Editing

By default, when editing, a text box appears with the value of the node.
When you press Esc, the changes are canceled. When you press Enter or click on any area of the page, the changes are applied. 
Events: [check below](#Events)

#### Manual editing (calls node API)

<iframe width="100%" height="500" src="//jsfiddle.net/amsik/fLsw8vog/embedded/html,result/dark/" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>

#### Editing via options

Just add an option `editing` to the tree options.
You can add a state `editable` for node to prevent editing:

```javascript
  {
    "text": "Not editable node",
    "state": {
      "editable": false
    }
  }
```

<iframe width="100%" height="500" src="//jsfiddle.net/amsik/pn5x3tub/embedded/html,result/dark/" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>

### Integration with Vuex

The library is allow to pass `store` options. The tree is not update partially. It updates the whole tree items. 
You must implement `dispatcher` to update the tree.
Working with **modules** is identical. Vuex forbids to have more than 1 `getter` with same name.

Example:

```javascript
  const Store = new Vuex.Store({
    state: {
      treeStore: []
    },
    mutations: {
      updateTreeStore(state, newTree) {
        state.treeStore = newTree
      }
    },
    actions: {
      updateTree(context, tree) {
        context.commit('updateTreeStore', tree)
      }
    },
    getters: {
      tree(state) {
        return state.treeStore
      }
    }
  })

  // -------

  new Vue({
    el: '#app',
    store: Store,
    data: () => ({
      options: {
        store: {
          store: Store,
          getter: () => {
            return Store.getters.tree
          },
          dispatcher(tree) {
            Store.dispatch('updateTree', tree)
          }
        },
        checkbox: true
      }
    })
  })
```



### Drag & Drop

Now there is only basic functionality of DND includes events (`dragging:start`, `dragging:finish`). Just add `dnd` property to the tree options.
To more details see the [Issue](https://github.com/amsik/liquor-tree/issues/55) 

<iframe width="100%" height="500" src="//jsfiddle.net/amsik/h1z2n05k/embedded/html,result/dark/" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>


## Examples

### JSON Viewer

I did this in 40 min ... do not judge me strictly :)
In plans:
- online editor
- to reveal all the possibilities of slots
- process in real time

<iframe width="100%" height="500" src="//jsfiddle.net/amsik/mknwyqjc/embedded/result,html,css/dark/" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>

### Custom Node

This example shows how to replace default content. It allows you to control content in any way. It is possible thanks to VueJS scoped slots.

<iframe width="100%" height="500" src="//jsfiddle.net/amsik/6jm2b1dq/embedded/result,html/dark/" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>

### Redefine Structure Example

For instance: we had a super-tree-component with its own structure (never mind, just for test). And we have a lot of dependencies to that component. This example shows how to apply data from server without a headache.

In this example we have structure:
```javascript
[
  MY_TEXT: 'some text', KIDS: []
]
```

A library doesn't know this format. But we can add `propertyNames` options and redefine structure. See example


<iframe width="100%" height="500" src="//jsfiddle.net/amsik/y7190jkd/embedded/result,html/dark/" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>


### Custom Theme

This example shows how to use tree in real life

<iframe width="100%" height="500" src="//jsfiddle.net/amsik/qka5pxdm/embedded/result,js,html,css/dark/" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>

### Accordion

The library doesn't have a such property. It uses provided API.

<iframe width="100%" height="500" src="//jsfiddle.net/amsik/p8mqhng2/embedded/result,html/dark/" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>


## API



### Tree API

To have directly access to the Tree API you have to use `ref` property of component. See more [Child-Component-Refs](https://vuejs.org/v2/guide/components.html#Child-Component-Refs).

#### [Tree.find(criteria, [multiple = false])](#Tree-find-criteria-multiple-false)

- **Arguments:**
  - `{ Object | String } criteria`
  - `{ Boolean } multiple`

- **Returns:**
  - [Selection](#Selection-API)

- **Usage:**

  This method uses in every methods where you can find node by criteria. If `criteria` is passed as string it will be transformed like `{ text: criteria }`.
  Examples:
```javascript
  this.$refs.tree.find('Node Text') // It will find Node that has text 'Node Text'
  this.$refs.tree.find(/Node Text/) // Using RegExp. It will find: Node Text ATAT, ATATA Node Text and so on...
  this.$refs.tree.find({
    text: /^Item 2/,
    state: { checked: true, selected: true }
  })
```
By default this method finds the first found node. You can add the second parameter and this function will return all found nodes. 


#### [Tree.findAll(criteria)](#Tree-findAll-criteria)

- **Arguments:**
  - `{ Object | String } criteria`

- **Returns:**
  - [Selection](#Selection-API)

- **Usage:**

This method is "syntactic sugar" of `Tree.find(criteria, true)`



#### [Tree.selected()](#Tree-selected)

- **Returns:**
  - [Selection](#Selection-API)

- **Usage:**

  You can get access to `selected` nodes and do everything you want with NodeAPI


#### [Tree.checked()](#Tree-checked)

- **Returns:**
  - [Selection](#Selection-API)

- **Usage:**

  You can get access to `checked` nodes and do everything you want with NodeAPI


#### [Tree.append(criteria, node)](#Tree-append-criteria-node)

- **Arguments:**
  - `{ Object | Node } criteria`  (see [find method](#Tree-find-criteria-multiple-false))
  - `{ Object | String } node`

- **Returns:**
  - Appended Node
  - null

- **Usage:**

  This method allows you to append (add to the end of the list) new Node to the Tree.
  There are **2 types of insertion:**
    - Set criteria and new Node. It will try to find Node (using criteria) and append as children of this Node. Example:
```javascript
  this.$refs.tree.append(
    { text: 'My super Text' },              // search criteria
    'New CHILD Node for "My super Text"'    // this string will be converted to Node object with default state parameters
  )
```
    - Set only one argument (Node). In this way it will add new Node as `root` element. (Yeah, we are able to have more than one root element)
```javascript
  this.$refs.tree.append({
    text: 'My NEW Node',
    state: { selected: true }
  })
```

#### [Tree.prepend(criteria, node)](#Tree-prepend-criteria-node)

- **Usage:**

  This method has the same behaviour as `Tree.append`, but the point of insertion will be different (**in the start** of the list).


#### [Tree.before(criteria, node)](#Tree-before-criteria-node)

- **Usage:**

  This method has behaviour the same as `Tree.append`, but the point of insertion will be different (**before** found node or the start of the list (as root)).


#### [Tree.after(criteria, node)](#Tree-after-criteria-node)

- **Usage:**

  This method has behaviour the same as `Tree.append`, but the point of insertion will be different (**after** found node or the end of the list (as root)).


#### [Tree.remove(criteria, multiple = false)](#Tree-remove-criteria-multiple)

- **Arguments:**
  - `{ Object | String } criteria` (see [find method](#Tree-find-criteria-multiple-false))
  - `{ Boolean } multiple`

- **Returns:**
  - [Selection](#Selection-API)

- **Usage:**

  Remove Node by criteria.


### Selection API

This array-like object has all array methods (forEach, map and so on) because it inherits `Array` object. This collection has very similar behaviour with jQuery. __All actions apply to all items in the collection.__ I'm going to show one example in more details and other methods have similar logic.


#### [Selection.select(extendList)](#Selection-select-extendList)

- **Arguments:**
  - `{ Boolean } extendList` - in `multiple` mode it will add selected Node

- **Returns:**
  - [Selection](#Selection-API)

- **Usage:**

  It calls method `select` for `all Nodes` in the collection. For instance:

```javascript
  // Let's find Nodes which text starts with 'Java' and it's not disabled
  let selection = this.$refs.tree.findAll({ text: /^Java/, state: { disabled: false } })

  // or you can use (the second parametes is true):
  // let selection = this.$refs.tree.find({ text: /^Java/, state: { disabled: false } }, true)

  // Here we want to select all nodes in our collection.
  // For single mode (multiple: false) it will do for ALL nodes:
  //  - unselect node
  //  - select node
  // For multiple mode it will select ALL nodes in the collection
  selection.select(true)
```

I think I should not explain behaviour of all methods. I hope it clear how it works. 

Methods list:

- **Selection.select()** - select all nodes
- **Selection.unselect()** - unselect all nodes
- **Selection.check()** - check all nodes (if `checkbox` mode)
- **Selection.uncheck()** - uncheck all nodes (if `checkbox` mode) 
- **Selection.expand()** - expand nodes (if node has children)
- **Selection.collapse()** - collapse nodes (if node has children)
- **Selection.remove()** - remove nodes



### Node API

A Tree component consists of Nodes. Every Node is a VueJS component, which has a `node` property linked to the Node class.
It is desirable not to work with the VueJS Node component directly. You have an API that returns a Node (not VueJS compoenent).
**The tree mapping is based on the node states**. Here are list of default states:

```javascript
const nodeStates = {
  selected: false,
  selectable: true,
  checked: false,
  expanded: false,
  disabled: false,
  visible: true,
  indeterminate: false
}
```
I hope that every state speaks for itself.

To check state you can use:
  - `Node.selected()`
  - `Node.checked()`
  - `Node.hidden()`
  - `Node.visible()`
  - `Node.enabled()`
  - `Node.disabled()`
  - `Node.expanded()`
  - `Node.collapsed()`
  - `Node.indeterminate()`

**Node.indeterminate()** - If a Node has more than one checked Node it will return `true`. Otherwise it returns `false`


We have reverse state checks and **this is done purely for convenience**:
  - `Node.hidden()` and `Node.visible()`
  - `Node.enabled()` and `Node.disabled()`
  - `Node.collapsed()` and `Node.expanded()`



To change Node state:
  - `Node.select(extendList)`
  - `Node.unselect()`
  - `Node.check()`
  - `Node.uncheck()`
  - `Node.show()`
  - `Node.hide()`
  - `Node.expand()`
  - `Node.disable()`
  - `Node.collapse()`
  - `Node.enable()`
  - `Node.toggleCollapse()`
  - `Node.toggleExpand()`

For instance Node is checked. When you call `Node.check()` **it will not** check Node again and not call `node.checked` event. This condition applies to all of the above methods. You don't need to:


```javascript
  ...
  if (!node.checked()) {
    node.check()
  }
  ...
```

We have only 1 method which receives a single parameter. It is a `Node.select(extendList)`. It this case if tree option `multiple` is true it will be added to `selectionNodes` list and user will see more than one selected Nodes. Example:

```javascript
  // In our example we have one selected node. Using API we are able to find Node: 
  let someCoolNode = this.$refs.tree.find('Awesome NODE')

  // It will select found Node and we will have 2 selected Nodes
  someCoolNode.select(true)
```

#### Adding, removing, finding Nodes

You probably know jQuery and how it works with DOM objects. It is very similar.

  - `Node.append(node) `// `Node.addChild()` is an alias
  - `Node.prepend(node)`
  - `Node.after(node)`
  - `Node.before(node)`

These methods add children or insert nodes before/after. 

Argument `node` can be:
  - simple text - it will be Node name with default states
  - structured node object ( See [Node Structure](#Structure) )
  - Node object

Examples:

```javascript

  // In this example we DO NOT using Selection API...
  let myAwesomeNode = this.$refs.tree.find({state: { selected: true } })[0]

  if (myAwesomeNode) {
    myAwesomeNode.append('LAST Child of Awesome Node') // to the end of the list
    myAwesomeNode.prepend('FIRST Child of Awesome Node') // to the start of the list

    myAwesomeNode.before({
      text: 'Heey!!',
      state: {
        checked: true
      }
    })
  }

```


#### Node properties

| Name | Type | Description |
| --- | -- | ---- |
| **Node.parent** | { Object &#124; null } | Link to parent ** For root node it will be `null` |
| **Node.text** | String | Node text. It can be HTML |
| **Node.depth** | Int | Node depth. Depth for root nodes is 0 |
| **Node.tree** | Object | Link to a Tree instance (not Vue component) |
| **Node.vm** | Object | Link to a VueJS component |



### Events

This example shows every possible event for the tree.

<iframe width="100%" height="500" src="//jsfiddle.net/amsik/cuseo1j7/embedded/js,html,css,result/dark/" allowpaymentrequest allowfullscreen="allowfullscreen" frameborder="0"></iframe>