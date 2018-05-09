import pkg from './package.json'
import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'
import uglify from 'rollup-plugin-uglify'
import alias from 'rollup-plugin-alias'
import serve from 'rollup-plugin-serve'

const path = require('path')

const version = pkg.version
const banner = `
/*!
 * LiquorTree v${version}
 * (c) ${new Date().getFullYear()} amsik
 * Released under the MIT License.
 */
`

const config = {
  input: 'src/main.js',
  output: [
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
      banner
    }, {
      file: pkg.main,
      format: 'umd',
      name: 'LiquorTree',
      sourcemap: true,
      banner
    }
  ],
  cache: false,
  plugins: [
    alias({
      resolve: ['.vue', '.js'],
      '@': path.resolve(__dirname, './src')
    }),
    vue({ css: true }),
    buble({ objectAssign: 'Object.assign' })
  ]
}

if ('production' == process.env.NODE_ENV) {
  config.output.forEach(c => (c.sourcemap = false))
  config.plugins.push(uglify({
    output: {
      comments: function(node, comment) {
          var text = comment.value;
          var type = comment.type;
          if (type == "comment2") {
              return /license/i.test(text);
          }
      }
    }
  }))
}

if ('development' == process.env.NODE_ENV) {
  config.plugins.push(serve({
    contentBase: ['dist', 'demo'],
    port: 8081,
    open: true
  }))
}

export default config
