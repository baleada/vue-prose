<template>
  <slot />
</template>

<script>
import { ref, isRef, computed, provide, inject } from 'vue'
import { useSymbol } from '../symbols'
import { mergeProps } from '../util'

import {
  defaultMessages as defaultMessagesStub,
  defaultProps as defaultPropsStub,
  defaultInterfaceProps as defaultInterfacePropsStub
} from '../stubs'

function ensureRef (object) {
  return isRef(object)
    ? object
    : ref(object)
}

function mergeWithDefaultProps (injectedDefaultProps) {
  return Object.keys(defaultPropsStub).reduce(
    (mergedDefaultProps, component) => ({
      ...mergedDefaultProps,
      [component]: {
        ...defaultPropsStub[component],
        ...injectedDefaultProps.value[component],
      }
    }),
    {}
  )
}

export default {
  name: 'ProseContext',
  props: {
    fullPathInjectKey: {
      type: [Symbol, String],
      required: true,
    },
    messagesInjectKey: {
      type: [Symbol, String],
    },
    defaultPropsInjectKey: {
      type: [Symbol, String],
    },
    interfacePropsInjectKey: {
      type: [Symbol, String],
    },
  },
  setup (props) {
    const fullPath = inject(props.fullPathInjectKey),
          emptyRefStub = { value: {} },
          injectedMessages = props.messagesInjectKey
            ? ensureRef(inject(props.messagesInjectKey))
            : emptyRefStub,
          messages = computed(() => ({
            ...defaultMessagesStub,
            ...injectedMessages.value,
          })),
          injectedDefaultProps = props.defaultPropsInjectKey
            ? ensureRef(inject(props.defaultPropsInjectKey))
            : emptyRefStub,
          defaultProps = computed(() => mergeWithDefaultProps(injectedDefaultProps)),
          injectedInterfaceProps = props.interfacePropsInjectKey
            ? ensureRef(inject(props.interfacePropsInjectKey))
            : emptyRefStub,
          interfaceProps = computed(() => ({
            ...defaultInterfacePropsStub,
            ...injectedInterfaceProps.value,
          }))

    /* Provide reactive messages for i18n */
    provide(useSymbol('context', 'messages'), messages)

    /* Provide reactive default prop values for all components */
    provide(useSymbol('context', 'defaultProps'), defaultProps)

    /* Provide reactive Baleada Interface prop values for all components */
    provide(useSymbol('context', 'interfaceProps'), interfaceProps)

    /* Provide reactive full path for ProseArticle */
    provide(useSymbol('context', 'fullPath'), fullPath)

    /* Track article headings */
    const headings = ref([])
    provide(useSymbol('context', 'headings'), headings)

    /* Track media */
    const media = ref([])
    provide(useSymbol('context', 'media'), media)

    return {}
  },
}
</script>
