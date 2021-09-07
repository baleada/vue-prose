import { createApp, nextTick } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createProse } from '../../../../src/createProse'
import routes from 'virtual:generated-pages'

const app = createApp(App),
      history = createWebHistory(),
      router = createRouter({
        history,
        strict: true,
        routes,
      })

app
  .use(router)
  .use(createProse({ createsPinia: true }))
  .mount('#app')

type WithGlobals = Window & {
  nextTick: () => Promise<any>,
  testState: any
}

(window as unknown as WithGlobals).nextTick = nextTick
