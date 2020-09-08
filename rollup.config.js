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
    { file: `${output.dir}/index.js`, format: 'cjs', exports: output.exports },
    { file: `${output.dir}/index.esm.js`, format: 'esm', exports: output.exports }
  ],
})
export default [
  withSharedConfig({
    input: 'src/index.js',
    output: { dir: 'lib' },
  }),

  // These next two are exported primarily for use in Markdown renderer plugins
  withSharedConfig({
    input: 'src/state/propsInterfaces.js',
    output: { dir: 'propsInterfaces', exports: 'default' },
  }),
  withSharedConfig({
    input: 'src/state/loopedIdPrefix.js',
    output: { dir: 'loopedIdPrefix', exports: 'default' },
  }),  
]
