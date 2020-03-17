<template>
  <main ref="baleada" class="baleada-prose-layout">
    <slot />
  </main>
</template>

<script>
import { ref, isRef, computed, provide, inject } from '@vue/composition-api'

import { useSymbol } from '../composition'

import { mergeProps } from '../util'

import { defaultMessages as defaultMessagesStub, defaultProps as defaultPropsStub } from '../stubs'

function formatAsRef (object) {
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
  name: 'ProseLayout',
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
  },
  setup (props) {
    const fullPath = inject(props.fullPathInjectKey),
          emptyRefStub = { value: {} },
          injectedMessages = props.messagesInjectKey
            ? formatAsRef(inject(props.messagesInjectKey))
            : emptyRefStub,
          messages = computed(() => ({
            ...defaultMessagesStub,
            ...injectedMessages.value,
          })),
          injectedDefaultProps = props.defaultPropsInjectKey
            ? formatAsRef(inject(props.defaultPropsInjectKey))
            : emptyRefStub,
          defaultProps = computed(() => mergeWithDefaultProps(injectedDefaultProps))

    /* Provide reactive messages for i18n */
    provide(useSymbol('layout', 'messages'), messages)

    /* Provide reactive default prop values for all components */
    provide(useSymbol('layout', 'defaultProps'), defaultProps)

    /* Provide reactive full path for ProseArticle */
    provide(useSymbol('layout', 'fullPath'), fullPath)

    /* Track article headings */
    const headings = ref([]),
          setHeadings = newHeadings => headings.value = newHeadings
    provide(useSymbol('layout', 'setHeadings'), setHeadings)
    provide(useSymbol('layout', 'headings'), headings)

    return {}
  },
}
</script>
