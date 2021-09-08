import { createApp, nextTick } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory, useRoute } from 'vue-router'
import { createProse } from '../../../../src/createProse'
import routes from 'virtual:generated-pages'

const app = createApp(App),
      history = createWebHistory(),
      router = createRouter({
        history,
        strict: true,
        routes,
      }),
      prose = createProse({
        createsPinia: true,
        getFullPath: 'vue-router',
        propDefaults: {
          section: {
            classes: 'hello'
          },
          aside: {
            type: 'success',
          }
        },
        messages: {

        }
      })

app
  .use(router)
  .use(prose)
  .mount('#app')

type WithGlobals = Window & {
  nextTick: () => Promise<any>,
  testState: any
}

(window as unknown as WithGlobals).nextTick = nextTick
