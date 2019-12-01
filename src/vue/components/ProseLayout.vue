<template>
  <main ref="prose" class="baleada-prose-layout">
    <slot />
  </main>
</template>

<script>
import { ref, computed, provide, inject } from '@vue/composition-api'

import { useSymbol } from '../composition'

export default {
  name: 'ProseLayout',
  props: {
    fullPathInjectKey: {
      type: [Symbol, String],
      required: true,
    },
    messagesInjectKey: {
      type: [Symbol, String],
    }
  },
  setup(props) {
    const fullPath = inject(props.fullPathInjectKey),
          defaultMessages = {
            grid: {
              changeFilterCaseSensitivityLabel: 'Filter is case sensitive',
            },
            list: {
              changeFilterCaseSensitivityLabel: 'Filter is case sensitive',
            },
          },
          injectedMessages = props.messagesInjectKey
            ? inject(props.messagesInjectKey)
            : { value: {} },
          messages = computed(() => ({
            ...defaultMessages,
            ...injectedMessages.value,
          }))


    /* Provide reactive messages for i18n */
    provide(useSymbol('layout', 'messages'), messages)

    /* Provide stuff for ProseArticle */
    provide(useSymbol('layout', 'fullPath'), fullPath)

    /* Provide stuff for ProseHeading */
    const headings = ref([]),
          addHeading = heading => headings.value.push(heading)
    provide(useSymbol('layout', 'addHeading'), addHeading)
    provide(useSymbol('layout', 'headings'), headings)

    return {
      headings,
      addHeading,
    }
  },
}
</script>
