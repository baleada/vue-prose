import * as components from './components'
import { setRuntimeVM } from './util/runtime'

const defaultOptions = {
  components,
  dynamic: true,
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
  const { components, dynamic } = { options }

  components.forEach(component => {
    const callback = dynamic
      ? component
      : (resolve, reject) => resolve(component)

    Vue.component(name, callback)
  })
}

function installRuntime (Vue) {
  Vue.mixin({ beforeCreate: setRuntimeVM })
}
