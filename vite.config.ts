import { configureable } from '@baleada/prepare'

export default new configureable.Vite()
  .includeDeps([
    '@baleada/vue-simple-icons/lite',
  ])
  .pages({
    pagesDir: 'tests/stubs/app/src/pages',
    extensions: ['vue'],
  })
  .vue()
  .configure()
