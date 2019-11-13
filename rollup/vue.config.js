import vue from 'rollup-plugin-vue'
import babel from 'rollup-plugin-babel'

export default {
  external: [
    '@vue/composition-api',
    'vue',
    'fs',
  ],
  input: [
    'src/vue/index.js',
    'src/vue/plugin.js'
  ],
  output: {
    dir: 'vue',
    format: 'esm',
  },
  plugins: [
    vue(),
    babel({
      exclude: 'node_modules/**'
    })
  ]
}
