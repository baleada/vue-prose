import type { Plugin } from 'vue'
import { createPinia } from 'pinia'
import { config } from './state'
import type { Config } from './state'
import {
  defaultComponentNames,
  defaultMessages,
  defaultPropDefaults
} from './stubs'
import type { CreateAside } from './components/createAside'
import type { CreateBlockquote } from './components/createBlockquote'
import type { CreateCodeblock } from './components/createCodeblock'
import type { CreateDetails } from './components/createDetails'
import type { CreateHeading } from './components/createHeading'
// import type { CreateList } from './components/createList'
import type { CreateMedia } from './components/createMedia'
import type { CreateSection } from './components/createSection'
// import type { CreateTable } from './components/createTable'

export type CreateComponent = 
  CreateAside
  | CreateBlockquote
  | CreateCodeblock
  | CreateDetails
  | CreateHeading
  // | CreateList
  | CreateMedia
  | CreateSection
  // | CreateTable

export type PluginOptions = {
  createsPinia?: boolean,
  components?: CreateComponent[],
} & Config

const defaultOptions: PluginOptions = {
  componentNames: defaultComponentNames,
  components: [],
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
          ...(options?.[property]?.[component] || {})
        }
      }

      config[property] = merged

      continue
    }

    if (property === 'componentNames') {
      config[property] = {
        ...defaultOptions[property],
        ...(options?.[property] || {})
      }

      continue
    }

    config[property] = options?.[property] || defaultOptions[property]
  }

  const components = options.components || defaultOptions.components

  for (const createComponent of components) {
    const component = createComponent(config)
    app.component(component.name, component)
  }
}
