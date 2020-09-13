import * as components from './components'

export default function install (Vue) {
  Object.values(components).forEach(component => Vue.component(component.name, component))
}
