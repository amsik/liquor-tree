import { storiesOf } from '@storybook/vue'
import { withNotes } from '@storybook/addon-notes'



storiesOf('Tree Options', module)
  .add('parentSelect', withNotes('If node has children and <b>parentSelect</b> options is <b>true</b> it will select node, not expand/collapse. To expand/collapse click on the arrow.')(() => (storyComponents[0])))
  .add('checkOnSelect', withNotes('Changing node state by clicking on node text (or checkbox icon). But still expanding/collapsing if node has children nodes.')(() => (storyComponents[1])))
  .add('checkOnSelect && parentSelect', withNotes('It is working how expected ;)')(() => (storyComponents[2])))
  .add('autoCheckChildren', withNotes('By default current \`checked\` state is applying for each child node. Set \`autoCheckChildren = false\` to prevent this.')(() => (storyComponents[3])))
  .add('keyboard navigation', withNotes(`
    <p>Navigation is realized using <b>keydown</b> event. It will not work if user doesn't "Activate" tree (click somewhere inside the tree).</p> 
    <p>
      For tree navigation use Arrows on your keyboard:
      <ul>
        <li>↑, ↓ - selecting node down/up</li>
        <li>←, → - expanding/collapsing</li>
        <li>Space, Enter - checking/unchecking node (only in <b>checkbox</b> mode)</li>
      </ul>
    </p>  
  `)(() => (storyComponents[4])))


const storyComponents = [
  /* parentSelect */
  {
    data: () => ({
      treeData: getData(),
      treeOptions: {
        parentSelect: true
      }
    }),
    template: `<tree :data="treeData" :options="treeOptions" />`
  },

  /* checkOnSelect */
  {
    data: () => ({
      treeData: getData(),
      treeOptions: {
        checkOnSelect: true,
        checkbox: true
      }
    }),
    template: `<tree :data="treeData" :options="treeOptions" />`
  },

  /* checkOnSelect && parentSelect */
  {
    data: () => ({
      treeData: getData(),
      treeOptions: {
        parentSelect: true,
        checkOnSelect: true,
        checkbox: true
      }
    }),
    template: `<tree :data="treeData" :options="treeOptions" />`
  },

  /* autoCheckChildren */
  {
    data: () => ({
      treeData: getData(),
      treeOptions: {
        autoCheckChildren: false,
        checkbox: true
      }
    }),
    template: `<tree :data="treeData" :options="treeOptions" />`
  },

  /* keyboard navigation */
  {
    data: () => ({
      treeData: getData(),
      treeOptions: {
        keyboardNavigation: true, // it is by default...
        checkbox: true
      }
    }),
    template: `<tree :data="treeData" :options="treeOptions" />`
  }
]
  

function getData() {
  return [
    { "text": "Item 1", state: { selected: true } },
    {
      "text": "Item 2",
      "state": { expanded: true },
      "children": [
        { "text": "<b>Item 2.1</b>" },
        {  "text": "Item 2.2" },
        {
          "text": "Item 2.3",
          "children": [
            { "text": "Item 2.2.3.1" },
            { "text": "Item 2.2.3.2" },
            { "text": "Item 2.2.3.3" },
            {
              "text": "Item 2.2.3.4",
              "children": [
                { "text": "Item 2.2.3.4.1" },
                { "text": "Item 2.2.3.4.2" }
              ]
            }
          ]
        },
        { "text": "Item 2.4" }
      ]
    },
    { "text": "Item 3" },
    { "text": "Item 4" },
    {
      "text": "Item 5",
      "children": [
        { "text": "Item 5.1" },
        { "text": "Item 5.2" },
        { "text": "Item 5.3" }
      ]
    }
  ]
}
