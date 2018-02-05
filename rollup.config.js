import pkg from './package.json'
import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'
import css from 'rollup-plugin-css-only';

export default [{
  input: 'src/main.js',
  output: {
    file: pkg.module,
    format: 'es'
  },
  plugins: [
    vue({ css: true }),
    buble({ objectAssign: 'Object.assign' })
  ]
}, {
  input: 'src/main.js',
  output: {
    file: pkg.main,
    format: 'umd',
    name: 'VueTree'
  },
  plugins: [
    vue({ css: true }),
    buble({ objectAssign: 'Object.assign' })
  ]
}];
