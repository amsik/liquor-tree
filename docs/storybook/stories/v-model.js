import { storiesOf } from '@storybook/vue'
import { withNotes } from '@storybook/addon-notes'

storiesOf('Using v-model', module)
  .add('selected node (multiple)', withNotes('Note that in multiple mode <b>selectedNodes</b> will be an array')(() => (storyComponents[0])))
  .add('selected node (single)', withNotes('')(() => (storyComponents[1])))
  .add('checked node', withNotes(`
    - <b>checked</b> key is always an array
    - <b>selected</b> key is depends on the 'multiple' option
  `)(() => (storyComponents[2])))

const storyComponents = [
    /* selected node (multiple) */
    {
      data: () => ({
        treeData: getData(),
        selectedNodes: []
      }),
      template: `
        <div>
          <p>Selected nodes: <b>{{ selectedNodes.map(s => s.text) }}</b></p>
          <tree 
            :data="treeData"
            v-model="selectedNodes"
          />
        </div>
      `
    },

    /* selected node (single) */
    {
      data: () => ({
        treeData: getData(),
        treeOptions: {
          multiple: false
        },
        selectedNode: null
      }),
      template: `
        <div>
          <p>Selected nodes: <b>{{ selectedNode && selectedNode.text }}</b></p>
          <tree 
            :data="treeData"
            :options="treeOptions"
            v-model="selectedNode"
          />
        </div>
      `
    },

    /* checked node */
    {
      data: () => ({
        treeData: getData(),
        treeOptions: {
          checkbox: true
        },
        treeModel: null
      }),
      template: `
        <div>
          <div v-if="treeModel">
            <p>Checked nodes: <b>{{ treeModel.checked.map(c => c.text) }}</b></p>
            <p>Selected nodes: <b>{{ treeModel.selected.map(s => s.text) }}</b></p>
          </div>
          
          <tree 
            :data="treeData"
            :options="treeOptions"
            v-model="treeModel"
          />
        </div>
      `
    },

]


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
