import pkg from './package.json'
import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'
import uglify from 'rollup-plugin-uglify'

const plugins = [
    vue({ css: true }),
    buble()
];

// if ('production' === process.env.BUILD) {
//     plugins.push(
//         uglify()
//     );
// }


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
