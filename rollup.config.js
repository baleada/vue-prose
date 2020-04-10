import vue from 'rollup-plugin-vue'
import babel from 'rollup-plugin-babel'
import resolve from '@rollup/plugin-node-resolve'

export default {
  external: [
    '@vue/composition-api',
    '@baleada/vue-icons',
    '@baleada/vue-icons/heroicons',
    '@baleada/vue-icons/simple-icons',
    '@baleada/vue-interface',
    '@baleada/vue-composition',
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
