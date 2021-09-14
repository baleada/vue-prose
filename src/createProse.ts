import type { Plugin } from 'vue'
import { createPinia } from 'pinia'
import { config } from './config'
import type { Config } from './config'
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
import type { CreateList } from './components/createList'
import type { CreateMedia } from './components/createMedia'
import type { CreateSection } from './components/createSection'
import type { CreateTable } from './components/createTable'

export type CreateComponent = 
  CreateAside
  | CreateBlockquote
  | CreateCodeblock
  | CreateDetails
  | CreateHeading
  | CreateList
  | CreateMedia
  | CreateSection
  | CreateTable

export type CreateProseOptions = {
  createsPinia?: boolean,
  components?: CreateComponent[],
} & Omit<Config, 'componentNames'>

const defaultOptions: CreateProseOptions = {
  // componentNames: defaultComponentNames,
  components: [],
  getFullPath: () => window.location.pathname,
  propDefaults: defaultPropDefaults,
  messages: defaultMessages,
}

export const createProse: (options?: CreateProseOptions) => Plugin = (options = {}) => app => {
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

    // It's possible to allow component name customization here,
    // but it introduces unnecessary footguns for Markdown-it Prose Container,
    // which would have to be separately configured with the same set
    // of component names.
    //
    // if (property === 'componentNames') {
    //   config[property] = {
    //     ...defaultOptions[property],
    //     ...(options?.[property] || {})
    //   }

    //   continue
    // }

    config.componentNames = defaultComponentNames

    config[property] = options?.[property] || defaultOptions[property]
  }

  const components = options.components || defaultOptions.components

  for (const createComponent of components) {
    const component = createComponent(config)
    app.component(component.name, component)
  }
}
