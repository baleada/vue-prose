import { configureable, Testable } from '@baleada/prepare'
import { toIconRenderFunction } from './source-transforms/toIconRenderFunction'

const external = [
        'vue',
        'vue-router',
        'pinia',
        '@baleada/logic',
        '@baleada/vue-composition',
        '@baleada/vue-features',
      ],
      shared = new configureable.Rollup()
        .external(external)
        .input('src/index.ts')
        .resolve()
        .sourceTransform({
          test: param => new Testable().include(/(@primer\/octicons|simple-icons|src\/icons)/).test(param),
          transform: toIconRenderFunction,
        })
        .vue()
        .esbuild(),
      esm = shared
        .delete({ targets: 'lib/*', verbose: true })
        .esm({ file: 'lib/index.js', target: 'browser' })
        .analyzer()
        .configure(),
      dts = new configureable.Rollup()
        .input('types/index.d.ts')
        .external(external)
        .output({ file: 'lib/index.d.ts', format: 'esm' })
        .dts()
        .configure()

export default [
  esm,
  dts,
]
