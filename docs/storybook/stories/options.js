import { storiesOf } from '@storybook/vue'

storiesOf('Tree Options', module)
  .add('parentSelect', () => ({
    data: () => ({
      treeData: getData(),
      treeOptions: {
        parentSelect: true
      }
    }),
    template: `
      <div>
        <p>If node has children and <b>parentSelect</b> options is <b>true</b> it will select node, not expand/collapse. To expand/collapse click on the arrow.</p>
        <tree :data="treeData" :options="treeOptions" />
      </div>
    `
  }))
  .add('checkOnSelect', () => ({
    data: () => ({
      treeData: getData(),
      treeOptions: {
        checkOnSelect: true,
        checkbox: true
      }
    }),
    template: `
      <div>
        <p>Changing node state by clicking on node text (or checkbox icon). But still expanding/collapsing if node has children nodes.</p>
        <tree :data="treeData" :options="treeOptions" />
      </div>
    `
  }))
  .add('checkOnSelect && parentSelect', () => ({
    data: () => ({
      treeData: getData(),
      treeOptions: {
        parentSelect: true,
        checkOnSelect: true,
        checkbox: true
      }
    }),
    template: `
      <div>
        <p>It is working how expected ;)</p>
        <tree :data="treeData" :options="treeOptions" />
      </div>
    `
  }))
  .add('autoCheckChildren', () => ({
    data: () => ({
      treeData: getData(),
      treeOptions: {
        autoCheckChildren: false,
        checkbox: true
      }
    }),
    template: `
      <div>
        <p>By default current \`checked\` state is applying for each child node. Set \`autoCheckChildren = false\` to cancel this.</p>
        <tree :data="treeData" :options="treeOptions" />
      </div>
    `
  }))
  .add('keyboard navigation', () => ({
    data: () => ({
      treeData: getData(),
      treeOptions: {
        keyboardNavigation: true, // it is by default...
        checkbox: true
      }
    }),
    template: `
      <div>
        <p>Navigation is realized using <b>keydown</b> event. It will not work if user doesn't "Activate" tree (click somewhere inside the tree).</p> 
        <p>
          For tree navigation use Arrows on your keyboard:
          <ul>
            <li>↑, ↓ - selecting node down/up</li>
            <li>←, → - expanding/collapsing</li>
            <li>Space, Enter - checking/unchecking node (only in <b>checkbox</b> mode)</li>
          </ul>
        </p>
        <tree :data="treeData" :options="treeOptions" />
      </div>
    `
  }))


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
