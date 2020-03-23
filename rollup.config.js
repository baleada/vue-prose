import vue from 'rollup-plugin-vue'
import babel from 'rollup-plugin-babel'
import resolve from '@rollup/plugin-node-resolve'

export default {
  external: [
    '@vue/composition-api',
    '@baleada/icons-vue',
    '@baleada/interface-vue',
    '@baleada/composition-vue',
    'vue',
  ],
  input: [
    'src/index.js',
    'src/plugin.js',
    'src/propsInterfaces.js',
  ],
  output: {
    dir: 'lib',
    format: 'esm',
  },
  plugins: [
    vue(),
    babel({
      exclude: 'node_modules/**'
    }),
    resolve(),
  ]
}
