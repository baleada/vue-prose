import { ref, isRef, computed, onMounted, watch, nextTick } from 'vue'
import { context } from '../state'
import { scrollToHeading } from '../util'
import {
  defaultMessages as defaultMessagesStub,
  defaultProps as defaultPropsStub,
  defaultInterfaceProps as defaultInterfacePropsStub
} from '../stubs'

export default function useContext (initOrWriteCallback) {
  if (context.status === 'created') {
    // When context is already created, initOrWriteCallback must be the write callback 
    const writeCallback = initOrWriteCallback

    if (!writeCallback) {
      return context.data
    }
    
    // Not sure why this nextTick is needed but it works.
    // Might be something to do with watch flushing.
    nextTick(() => writeCallback(context.data))
    return
  }

  // When context is not already created, initOrWriteCallback can be init, writeCallback, or undefined
  const {
    fullPath: rawFullPath = computed(() => window.location.pathname),
    messages: rawMessages = {},
    defaultProps: rawDefaultProps = {},
    interfaceProps: rawInterfaceProps = {},
    scrollableContainer = ref(document),
  } = typeof initOrWriteCallback === 'function'
    ? {}
    : (initOrWriteCallback || {})

  // Ensure fullPath
  const fullPath = computed(() => rawFullPath?.value ?? rawFullPath)

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

  // Handle scrolling
  const scrollEffect = () => nextTick(() => scrollToHeading({ fullPath, scrollableContainer }))
  onMounted(() => {
    scrollEffect()
    watch(fullPath, scrollEffect)
  })

  // Initialize reactive reference to article-specific data
  const article = ref({})

  context.data = {
    fullPath,
    messagesByComponent: mergedMessages,
    defaultPropsByComponent: mergedDefaultProps,
    interfacePropsByComponent: mergedInterfaceProps,
    article,
  }

  context.status = 'created'

  if (typeof initOrWriteCallback === 'function') {
    useContext(initOrWriteCallback)
    return
  }

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
