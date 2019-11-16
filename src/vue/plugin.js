import * as components from './components'
import { setRuntimeVM } from './util/runtime'

const defaultOptions = {
  only: Object.keys(components),
  except: [],
}

export default function install (Vue, options = {}) {
  options = {
    ...defaultOptions,
    ...options
  }

  installComponents(Vue, options)
  installRuntime(Vue)
}

function installComponents (Vue, options) {
  const { except, only } = { options },
        lowercaseExcept = except.map(name => name.toLowerCase()),
        lowercaseOnly = only.map(name => name.toLowerCase()),
        componentNames = Object.keys(components),
        toUserFriendly = name => name.replace(/^Prose/, '').toLowerCase(),
        shouldInstallNames = componentNames.filter(name => {
          const userFriendlyName = toUserFriendly(name)
          return lowerCaseOnly.includes(userFriendlyName) && !lowerCaseExcept.includes(userFriendlyName)
        }),
        shouldInstall = shouldInstallNames.map(name => ({ name, component: components[name] }))

  shouldInstall.forEach(({ name, component }) => {
    Vue.component(name, (resolve, reject) => resolve(component))
  })
}

function installRuntime (Vue) {
  Vue.mixin({ beforeCreate: setRuntimeVM })
}
