import pkg from './package.json'
import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'
import uglify from 'rollup-plugin-uglify'
import alias from 'rollup-plugin-alias'
import serve from 'rollup-plugin-serve'

const path = require('path')

const config = {
  input: 'src/main.js',
  sourcemap: true,
  output: [
    {
      file: pkg.module,
      format: 'es'
    }, {
      file: pkg.main,
      format: 'umd',
      name: 'LiquorTree'
    }
  ],
  plugins: [
    alias({ resolve: ['.js', '.vue'], '@': path.resolve(__dirname, './src') }),
    vue({ css: true }),
    buble({ objectAssign: 'Object.assign' })
  ]
}

if ('production' == process.env.NODE_ENV) {
  config.sourcemap = false
  config.plugins.push(uglify())
}

if ('development' == process.env.NODE_ENV) {
  config.plugins.push(serve({
    contentBase: ['demo', 'dist'],
    port: 8081,
    open: true
  }))
}

export default config
