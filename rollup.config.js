import { configureable } from '@baleada/prepare'
import toPropsInterfaces from './source-transforms/toPropsInterfaces.js'

const shared = configureable('rollup')
        .external([
          'vue',
          '@baleada/vue-composition',
          '@baleada/vue-interface',
          '@baleada/vue-heroicons',
          '@baleada/vue-simple-icons',
          /@baleada\/vue-features/,
        ])
        .resolve()
        .vue()
        .virtualIndex('src/index.js', { test: ({ id }) => /src\/(?:composition\/(?:useContextCreator|useContext).js|components\/[^\/]+.vue)$/.test(id) })
        .virtualIndex('src/components')
        .virtualIndex('src/composition')
        .virtualIndex('src/state')
        .virtualIndex('src/stubs')
        .virtualIndex('src/util')
        .virtual({
          test: ({ id }) => id.endsWith('src/state/propsInterfaces.js'),
          transform: toPropsInterfaces,
        }),
      esm = shared
        .delete({ targets: 'lib/*', verbose: true })
        .input('src/index.js')
        .esm({ file: 'lib/index.js', target: 'browser' })
        .configure(),
      pluginEsm = shared
        .delete({ targets: 'plugin/*', verbose: true })
        .input('src/plugin.js')
        .esm({ file: 'plugin/index.js', target: 'browser' })
        .configure(),
      propsInterfacesShared = configureable('rollup')
        .input('src/state/propsInterfaces.js')
        .virtual({
          test: ({ id }) => id.endsWith('src/state/propsInterfaces.js'),
          transform: toPropsInterfaces,
        }),
      propsInterfacesEsm = propsInterfacesShared
        .delete({ targets: 'propsInterfaces/*', verbose: true })
        .esm({ file: 'propsInterfaces/index.js', target: 'node' })
        .configure(),
      propsInterfacesCjs = propsInterfacesShared
        .cjs({ file: 'propsInterfaces/index.cjs' })
        .configure(),
      loopedIdPrefixShared = configureable('rollup')
        .input('src/state/loopedIdPrefix.js'),
      loopedIdPrefixEsm = loopedIdPrefixShared
        .delete({ targets: 'loopedIdPrefix/*', verbose: true })
        .esm({ file: 'loopedIdPrefix/index.js', target: 'node' })
        .configure(),
      loopedIdPrefixCjs = loopedIdPrefixShared
        .cjs({ file: 'loopedIdPrefix/index.cjs' })
        .configure()

export default [
  esm,
  pluginEsm,
  
  // These next two are exported primarily for use in Markdown renderer plugins
  propsInterfacesEsm,
  propsInterfacesCjs,
  loopedIdPrefixEsm,
  loopedIdPrefixCjs,
]
