import { configureable } from '@baleada/prepare'
import toPropsInterfaces from './source-transforms/toPropsInterfaces.js'

export default {
  ...configureable('vite')
    .alias({
      '/@src/': `/src`,
    })
    .koa(configureable => 
      configureable
        .virtualIndex('src/index.js', { test: ({ id }) => /src\/(?:composition\/(?:useContextCreator|useContext).js|components\/[^\/]+.vue)$/.test(id) })
        .virtualIndex('src/components')
        .virtualIndex('src/composition')
        .virtualIndex('src/state')
        .virtualIndex('src/stubs')
        .virtualIndex('src/util')
        .virtual({
          test: ({ id }) => id.endsWith('src/state/propsInterfaces.js'),
          transform: toPropsInterfaces,
        })
        .virtualRoutes(
          { path: 'pages/routes.js', router: 'vue' },
          {
            test: ({ id }) => id.endsWith('vue'),
            transformPath: path => path.replace(/\/index$/, '')
          }
        )
        .configure()
    )
    .configure(),
  optimizeDeps: {
    include: ['@baleada/vue-features/affordances'],
  }
}
