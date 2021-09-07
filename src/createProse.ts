import type { Plugin } from 'vue'
import { createPinia } from 'pinia'
import { storeConfig } from './state'
import type { StoreConfig } from './state'
import { defaultMessages, defaultPropDefaults } from './stubs'
import ProseAside from './components/ProseAside.vue'
import ProseBlockquote from './components/ProseBlockquote.vue'
import ProseCodeblock from './components/ProseCodeblock.vue'
import ProseDetails from './components/ProseDetails.vue'
import ProseHeading from './components/ProseHeading.vue'
import ProseList from './components/ProseList.vue'
import ProseMedia from './components/ProseMedia.vue'
import ProseSection from './components/ProseSection.vue'
import ProseTable from './components/ProseTable.vue'

export type PluginOptions = { createsPinia?: boolean, store?: StoreConfig }

const defaultOptions: PluginOptions = {
  createsPinia: false,
  store: {
    name: 'Prose',
    getFullPath: () => window.location.pathname,
    propDefaults: defaultPropDefaults,
    messages: defaultMessages,
    getScrollableContainer: () => document.body,
  }
}

export const createProse: (options?: PluginOptions) => Plugin = (options = {}) => app => {
  if (options.createsPinia) {
    app.use(createPinia())
  }
   
  for (const property in defaultOptions.store) {
    if (property === 'propDefaults' || property === 'messages') {
      const merged = {}

      for (const component in defaultOptions.store[property]) {
        merged[component] = {
          ...defaultOptions.store[property][component],
          ...options.store?.[property]?.[component]
        }
      }

      storeConfig[property] = merged

      continue
    }

    storeConfig[property] = options.store?.[property] || defaultOptions.store[property]
  }

  const components = [
    ProseAside,
    ProseBlockquote,
    ProseCodeblock,
    ProseDetails,
    ProseHeading,
    ProseList,
    ProseMedia,
    ProseSection,
    ProseTable,
  ]
  
  for (const component of components) {
    app.component(component.name, component)
  }  
}

