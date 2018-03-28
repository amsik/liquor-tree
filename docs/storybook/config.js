import { configure } from '@storybook/vue';

import Vue from 'vue';
import Tree from '../../dist/liquor-tree.esm'

Vue.component('tree', Tree)

function loadStories() {
  require('./stories');
}

configure(loadStories, module);