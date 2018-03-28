import { configure } from '@storybook/vue';
import Vue from 'vue';

function loadStories() {
  require('./stories');
}

configure(loadStories, module);