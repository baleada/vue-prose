import { inject } from '@vue/composition-api'
import { useSymbol } from '../symbols'

export default function mergeProps({ props, component }) {
  const defaultProps = inject(useSymbol('layout', 'defaultProps')).value[component],
        mergedProps = {}

  // This for...in loop allows mergedProps to directly reference the original props object, retaining prop reactivity
  for (let prop in defaultProps) {
    console.log({
      prop,
      props: props[prop],
      default: defaultProps[prop],
      usingDefault: props[prop] === undefined,
    })
    mergedProps[prop] = props[prop] === undefined ? defaultProps[prop] : props[prop]
  }

  return mergedProps
}