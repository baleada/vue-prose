import { ref, isRef, computed } from 'vue'
import useContext from './useContext'
import { context } from '../state'
import {
  defaultMessages as defaultMessagesStub,
  defaultProps as defaultPropsStub,
  defaultInterfaceProps as defaultInterfacePropsStub
} from '../stubs'

export default function useContextCreator ({ fullPath }, options = {}) {
  if (context.status === 'created') {
    return useContext()
  }

  const {
    messages: rawMessages,
    defaultProps: rawDefaultProps,
    interfaceProps: rawInterfaceProps,
  } = options

  // Merge messages
  const messages = ensureRef(rawMessages),
        mergedMessages = computed(() => ({
          ...defaultMessagesStub,
          ...messages.value,
        }))

  // Merge default props
  const defaultProps = ensureRef(rawDefaultProps),
        mergedDefaultProps = computed(() => toMergedDefaultProps(defaultProps))

  // Merge Baleada Interface props
  const interfaceProps = ensureRef(rawInterfaceProps),
        mergedInterfaceProps = computed(() => ({
          ...defaultInterfacePropsStub,
          ...interfaceProps.value,
        }))

  // Initialize reactive reference to article-specific data
  const article = ref({})

  context.data = {
    messagesByComponent: mergedMessages,
    defaultPropsByComponent: mergedDefaultProps,
    interfacePropsByComponent: mergedInterfaceProps,
    fullPath,
    article,
  }

  context.status = 'created'

  return useContext()
}

const emptyRefStub = { value: {} }
function ensureRef (object) {
  if (!object) {
    return emptyRefStub
  }

  return isRef(object)
    ? object
    : ref(object)
}

function toMergedDefaultProps (defaultProps) {
  return Object.keys(defaultPropsStub).reduce(
    (mergedDefaultProps, component) => ({
      ...mergedDefaultProps,
      [component]: {
        ...defaultPropsStub[component],
        ...defaultProps.value[component],
      }
    }),
    {}
  )
}
