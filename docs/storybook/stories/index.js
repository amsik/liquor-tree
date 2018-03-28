import Vue from 'vue'
import { storiesOf } from '@storybook/vue'

storiesOf('First ', module)
  .add('story...', () => ({
    name: 'test',
    data: () => ({
      treeData: [
        { text: 'Item 1' },
        { text: 'Item 2', children: [
          { text: 'Item 2.1' },
          { text: 'Item 2.2' }
        ] },

        { text: 'Item 3' }
      ]
    }),
    template: '<tree :data="treeData" />'
  }))