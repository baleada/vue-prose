import * as components from './components'

export default function install (Vue) {
  Object.keys(components)
    .map(component => components[component])
    .forEach(component => Vue.component(component.name, component))
}
