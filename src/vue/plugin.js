import * as components from './components'

const defaultOptions = {
  components: Object.keys(components).map(component => components[component]),
  dynamic: true,
}

export default function install (Vue, options = {}) {
  options = {
    ...defaultOptions,
    ...options
  }

  installComponents(Vue, options)
}

function installComponents (Vue, options) {
  const { components, dynamic } = options

  components.forEach(component => {
    const name = component.name,
          callback = dynamic
            ? (resolve, reject) => resolve(component)
            : component

    Vue.component(name, callback)
  })
}
