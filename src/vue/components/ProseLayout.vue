<template>
  <main
    class="relative z-10 lg:flex transition"
    :class="[
      isDarkTheme ? 'dark bg-gray-900' : 'bg-gray-200',
    ]"
  >
    <slot />
  </main>
</template>

<script>
import { provide } from '@vue/composition-api'

import { useSymbol } from '../composition'

export default {
  name: 'ProseLayout',
  props: {
    fullPath: {
      // type: Ref,
      required: true,
    },
    messages: {
      type: Object,
      default: () => ({
        grid: {
          changeFilterCaseSensitivityLabel: 'Filter is case sensitive',
        },
        list: {
          changeFilterCaseSensitivityLabel: 'Filter is case sensitive',
        },
      })
    }
  },
  setup(props) {
    /* Provide reactive messages for i18n */
    provide(useSymbol('layout', 'messages'), props.messages)

    /* Provide stuff for ProseArticle */
    provide(useSymbol('layout', 'fullPath'), props.fullPath)

    /* Provide stuff for ProseHeading */
    const headings = ref([]),
          addHeading = heading => headings.value.push(heading)
    provide(useSymbol('layout', 'addHeading'), addHeading)

    return {
      headings,
      addHeading,
    }
  },
}
</script>
