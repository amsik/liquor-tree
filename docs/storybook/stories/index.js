import { storiesOf } from '@storybook/vue'
import { withNotes } from '@storybook/addon-notes'



storiesOf('Basic Usage', module)
  .add('default state', withNotes('Tree behaviour with default <b>options</b>. It is able to select multiple nodes using Ctrl key')(() => (storyComponents[0])))
  .add('single mode', withNotes('It is possible to select only 1 node.')(() => (storyComponents[1])))
  .add('checkbox mode', withNotes('')(() => (storyComponents[2])))
  .add('default node states', withNotes('You can set any of states during the initialization. See <a href="https://amsik.github.io/liquor-tree/#Structure" target="_blank">here</a> to learn more.')(() => (storyComponents[3])))

  
const storyComponents = [
  /* default state */
  {
    data: () => ({
      treeData: getData()
    }),
    template: `<tree :data="treeData" />`
  },

  /* single mode */
  {
    data: () => ({
      treeData: getData(),
      treeOptions: {
        multiple: false
      }
    }),
    template: `<tree :data="treeData" :options="treeOptions" />`
  },

  /* checkbox mode */
  {
    data: () => ({
      treeData: getData(),
      treeOptions: {
        checkbox: true
      }
    }),
    template: '<tree :data="treeData" :options="treeOptions" />'
  },

  /* default node states */
  {
    data: () => ({
      treeData: getDataWithStates(),
      treeOptions: {
        checkbox: true
      }
    }),
    template: `<tree :data="treeData" :options="treeOptions" />`
  }
]


function getDataWithStates() {
  return [
    { "text": "<b>Item 1</b>", "state": { checked: true } },
    {
      "text": "Item 2",
      "state": { expanded: true },
      "children": [
        { "text": "Item 2.1" },
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
    { "text": "Item 3", state: { disabled: true } },
    { "text": "Item 4", state: { selected: true } },
    {
      "text": "Item 5",
      "state": { checked: true },
      "children": [
        { "text": "Item 5.1" },
        { "text": "<s>Item 5.2</s>" },
        { "text": "Item 5.3" }
      ]
    }
  ]
}

function getData() {
  return [
    { "text": "<b>Item 1</b>" },
    {
      "text": "Item 2",
      "children": [
        { "text": "Item 2.1" },
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
        { "text": "<s>Item 5.2</s>" },
        { "text": "Item 5.3" }
      ]
    }
  ]
}
