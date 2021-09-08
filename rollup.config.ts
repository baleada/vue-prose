import { configureable } from '@baleada/prepare'

const external = [
        'vue',
        'pinia',
        '@baleada/logic',
        '@baleada/vue-composition',
        '@baleada/vue-features',
        '@baleada/vue-heroicons',
        /@baleada\/vue-simple-icons/,
      ],
      shared = new configureable.Rollup()
        .external(external)
        .input('src/index.ts')
        .resolve()
        .vue()
        .esbuild(),
      esm = shared
        .delete({ targets: 'lib/*', verbose: true })
        .esm({ file: 'lib/index.js', target: 'browser' })
        .analyzer()
        .configure(),
      dts = new configureable.Rollup()
        .input('src/index.ts')
        .external(external)
        .output({ file: 'lib/index.d.ts', format: 'esm' })
        .dts()
        .configure()

export default [
  esm,
  dts,
]
