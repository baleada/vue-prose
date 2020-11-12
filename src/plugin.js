import * as components from './components'

export default function install (app) {
  Object.values(components).forEach(component => app.component(component.name, component))
}
