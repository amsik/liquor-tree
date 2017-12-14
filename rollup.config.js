import pkg from './package.json'
import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'

const plugins = [
    vue({ css: true }),
    buble()
];

export default {
    input: 'src/main.js',
    output: [
        {
            file: pkg.module,
            format: 'es'
        },
        {
            file: 'dist/vue-tree.js',
            format: 'umd',
            name: 'VueTree'
        }
    ],
    plugins
}
