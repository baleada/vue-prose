import { useContext } from '../api'

export default function toMergedProps ({ props, component }) {
  const { defaultPropsByComponent } = useContext(),
        mergedProps = {}

  // This for...in loop allows mergedProps to retain prop reactivity
  for (let prop in defaultPropsByComponent[component]) {
    mergedProps[prop] = props[prop] === undefined ? defaultPropsByComponent[component][prop] : props[prop]
  }

  return mergedProps
}
