import { inject } from '@vue/composition-api'
import useSymbol from './useSymbol'

export default function mergeProps({ props, component }) {
  const defaultProps = inject(useSymbol('layout', 'defaultProps')).value[component],
        mergedProps = {}

  // This for...in loop allows mergedProps to directly reference the original props object, retaining prop reactivity
  for (let prop in defaultProps) {
    mergedProps[prop] = props[prop] === undefined ? defaultProps[prop] : props[prop]
  }

  return mergedProps
}