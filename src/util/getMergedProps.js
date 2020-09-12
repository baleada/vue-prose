import { computed } from 'vue'
import { useContext } from '../api'

export default function getMergedProps ({ props, component }) {
  const { defaultPropsByComponent } = useContext(),
        mergedProps = computed(() => ({
          ...defaultPropsByComponent[component],
          ...toWithoutExplicitUndefined(props),
        }))

  return mergedProps
}

// Vue explicitly assigns `undefined` values for props that were not defined.
//
// Spreading in the props object would override Prose's default values with an `undefined`
// value and cause problems elsewhere.
// 
// This function filters out undefined values.
function toWithoutExplicitUndefined (object) {
  return Object.keys(object)
    .filter(key => object[key] !== undefined)
    .reduce((withoutExplicitUndefined, key) => ({ ...withoutExplicitUndefined, [key]: object[key] }), {})
}
