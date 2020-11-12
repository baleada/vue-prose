import vue from 'rollup-plugin-vue'
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import virtual from '@baleada/rollup-plugin-virtual'
import createFilesToIndex from '@baleada/source-transform-files-to-index'

const srcIndexTest = ({ id }) => /src\/(?:composition\/(?:useContextCreator|useContext).js|components\/[^\/]+.vue)$/.test(id),
      srcFilesToIndex = createFilesToIndex({ test: srcIndexTest }),
      componentsIndexTest = ({ id }) => /src\/components\/[^\/]+.vue$/.test(id),
      componentsFilesToIndex = createFilesToIndex({ test: componentsIndexTest }),
      compositionIndexTest = ({ id }) => /src\/composition\/[^\/]+.js$/.test(id),
      compositionFilesToIndex = createFilesToIndex({ test: compositionIndexTest }),
      stateIndexTest = ({ id }) => /src\/state\/[^\/]+.js$/.test(id),
      stateFilesToIndex = createFilesToIndex({ test: stateIndexTest }),
      stubsIndexTest = ({ id }) => /src\/stubs\/[^\/]+.js$/.test(id),
      stubsFilesToIndex = createFilesToIndex({ test: stubsIndexTest }),
      utilIndexTest = ({ id }) => /src\/util\/[^\/]+.js$/.test(id),
      utilFilesToIndex = createFilesToIndex({ test: utilIndexTest })

const external = [
        '@baleada/vue-heroicons',
        '@baleada/vue-simple-icons',
        '@baleada/vue-interface',
        '@baleada/vue-composition',
        '@baleada/vue-features/util',
        'vue',
        /@babel\/runtime/,
      ],
      plugins = [
        vue(),
        resolve(),
        virtual({
          test: ({ id }) => id.endsWith('src/index.js'),
          transform: srcFilesToIndex,
        }),
        virtual({
          test: ({ id }) => id.endsWith('src/components'),
          transform: componentsFilesToIndex,
        }),
        virtual({
          test: ({ id }) => id.endsWith('src/composition'),
          transform: compositionFilesToIndex,
        }),
        virtual({
          test: ({ id }) => id.endsWith('src/state'),
          transform: stateFilesToIndex,
        }),
        virtual({
          test: ({ id }) => id.endsWith('src/stubs'),
          transform: stubsFilesToIndex,
        }),
        virtual({
          test: ({ id }) => id.endsWith('src/util'),
          transform: utilFilesToIndex,
        }),
        babel({
          exclude: 'node_modules/**',
          babelHelpers: 'runtime',
        }),
      ]

export default [
  {
    external,
    input: 'src/index.js',
    output: { file: 'lib/index.js', format: 'esm' },
    plugins,
  },
  {
    external,
    input: 'src/plugin.js',
    output: { file: 'plugin/index.js', format: 'esm' },
    plugins,
  },
  // These next two are exported primarily for use in Markdown renderer plugins
  {
    input: 'src/state/propsInterfaces.js',
    output: [
      { file: 'propsInterfaces/index.esm.js', format: 'esm' },
      { file: 'propsInterfaces/index.js', format: 'cjs' },
    ],
  },
  {
    input: 'src/state/loopedIdPrefix.js',
    output: [
      { file: 'loopedIdPrefix/index.esm.js', format: 'esm' },
      { file: 'loopedIdPrefix/index.js', format: 'cjs' },
    ],
  },
]
