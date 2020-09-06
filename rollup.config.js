import vue from 'rollup-plugin-vue'
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'

const withSharedConfig = ({ input, output }) => ({
  external: [
    '@baleada/vue-heroicons',
    '@baleada/vue-simple-icons',
    '@baleada/vue-interface',
    '@baleada/vue-composition',
    '@baleada/vue-features/util',
    'vue',
    /@babel\/runtime/,
  ],
  plugins: [
    vue(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'runtime',
    }),
    resolve(),
  ],
  input,
  output: [
    { file: `${output.dir}/index.js`, format: 'cjs' },
    { file: `${output.dir}/index.esm.js`, format: 'esm' }
  ],
})
export default [
  withSharedConfig({
    input: 'src/index.js',
    output: { dir: 'lib' },
  }),
  withSharedConfig({
    input: 'src/plugin.js',
    output: { dir: 'plugin' },
  }),
  withSharedConfig({
    input: 'src/symbols/propsInterfaces.js',
    output: { dir: 'propsInterfaces' },
  }),
  withSharedConfig({
    input: 'src/symbols/loopedIdPrefix.js',
    output: { dir: 'loopedIdPrefix' },
  }),  
]
