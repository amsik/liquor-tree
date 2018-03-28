import Vue from 'vue'
import { storiesOf } from '@storybook/vue'

storiesOf('First ', module)
  .add('story...', () => ({
    name: 'test',
    template: '<p>Hi there!</p>'
  }))