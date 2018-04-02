import '@storybook/addon-options/register'
import '@storybook/addon-notes/register'
import { configure } from '@storybook/vue'
import { setOptions } from '@storybook/addon-options'

setOptions({
  name: 'Liquor-Tree',
  url: 'https://amsik.github.io/liquor-tree/'
})

// configure(() => require('./stories'), module)