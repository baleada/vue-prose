import { configureable, Testable } from '@baleada/prepare'
import { toIconRenderFunction } from './source-transforms/toIconRenderFunction'

export default new configureable.Vite()
  .alias({
    '@octicons': './node_modules/@primer/octicons/build/svg',
    '@simple-icons': './node_modules/simple-icons/icons',
  })
  .pages({
    pagesDir: 'tests/stubs/app/src/pages',
    extensions: ['vue'],
  })
  .sourceTransform({
    test: param => new Testable().include(/(@primer\/octicons|simple-icons|src\/icons)/).test(param),
    transform: toIconRenderFunction,
  })
  .vue()
  .configure()
