import components from './components'

const defaultOptions = {
  only: Object.keys(components)
  except: [],
}

export default function install (Vue, options = {}) {
  const { except, only } = { ...defaultOptions, ...options },
        lowercaseExcept = except.map(name => name.toLowerCase()),
        lowercaseOnly = only.map(name => name.toLowerCase()),
        componentNames = Object.keys(components),
        shouldInstallNames = componentNames.filter(name => {
          const userFriendlyName = toUserFriendly(name)
          return lowerCaseOnly.includes(userFriendlyName) && !lowerCaseExcept.includes(userFriendlyName)
        }),
        shouldInstall = shouldInstallNames.map(name => ({ name, component: components[name] }))

  shouldInstall.forEach(({ name, component }) => {
    Vue.component(name, (resolve, reject) => resolve(component))
  })
}

function toUserFriendly (name) {
  return name.replace(/^Prose/, '').toLowerCase()
}
