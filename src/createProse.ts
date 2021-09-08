import type { Plugin } from 'vue'
import { createPinia } from 'pinia'
import { config } from './state'
import type { Config } from './state'
import { defaultMessages, defaultPropDefaults } from './stubs'
// import Aside from './components/BaleadaProseAside.vue'
import { createAside } from './components/createAside'
// import Blockquote from './components/BaleadaProseBlockquote.vue'
import { createBlockquote } from './components/createBlockquote'
// import Codeblock from './components/BaleadaProseCodeblock.vue'
import { createCodeblock } from './components/createCodeblock'
// import Details from './components/BaleadaProseDetails.vue'
// import Heading from './components/BaleadaProseHeading.vue'
// import List from './components/BaleadaProseList.vue'
// import Media from './components/BaleadaProseMedia.vue'
// import Section from './components/BaleadaProseSection.vue'
import { createSection } from './components/createSection'
// import Table from './components/BaleadaProseTable.vue'

export type PluginOptions = { createsPinia?: boolean, componentPrefix?: string } & Config

const defaultOptions: PluginOptions = {
  getFullPath: () => window.location.pathname,
  propDefaults: defaultPropDefaults,
  messages: defaultMessages,
  getScrollableContainer: () => document.body,
}

export const createProse: (options?: PluginOptions) => Plugin = (options = {}) => app => {
  if (options.createsPinia) {
    app.use(createPinia())
  }

  for (const property in defaultOptions) {
    if (property === 'propDefaults' || property === 'messages') {
      const merged = {}

      for (const component in defaultOptions[property]) {
        merged[component] = {
          ...defaultOptions[property][component],
          ...options?.[property]?.[component]
        }
      }

      config[property] = merged

      continue
    }

    config[property] = options?.[property] || defaultOptions[property]
  }

  // app.component('BaleadaProseAside', Aside)
  app.component('BaleadaProseAside', createAside(config))
  // app.component('BaleadaProseBlockquote', Blockquote)
  app.component('BaleadaProseBlockquote', createBlockquote(config))
  // app.component('BaleadaProseCodeblock', Codeblock)
  app.component('BaleadaProseCodeblock', createCodeblock(config))
  // app.component('BaleadaProseDetails', Details)
  // app.component('BaleadaProseHeading', Heading)
  // app.component('BaleadaProseList', List)
  // app.component('BaleadaProseMedia', Media)
  // app.component('BaleadaProseSection', Section)
  app.component('BaleadaProseSection', createSection(config))
  // app.component('BaleadaProseTable', Table)
}
