<template>
  <article
    ref="prose"
    class="prose-article"
  >
    <slot />
  </article>
</template>

<script>
import { ref, computed, watch, onMounted, inject } from '@vue/composition-api'

import { useSymbol } from '../composition'

import scrollToHeading from '../util/scrollToHeading'

export default {
  name: 'ProseArticle',
  setup() {
    /* Track route */
    const fullPath = inject(useSymbol('layout', 'fullPath'))

    /* Scroll to heading */
    const prose = ref(null)
    onMounted(() => {
      scrollToHeading(fullPath.value, { container: prose.value })
    })
    watch(fullPath, () => {
      scrollToHeading(fullPath.value, { container: prose.value })
    }, { lazy: true })

    return {
      prose,
    }
  },
}
</script>
