import vue from 'rollup-plugin-vue'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve';

export default {
  external: [
    '@vue/composition-api',
    '@baleada/icons/vue',
    '@baleada/composition/vue',
    'vue',
  ],
  input: [
    'src/vue/index.js',
    'src/vue/plugin.js',
    'src/vue/propsInterfaces.js',
  ],
  output: {
    dir: 'vue',
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
