<template>
  <details
    ref="prose"
    class="baleada-prose-details"
    :class="[classes]"
    :open="isOpen"
    @click="handleClick"
  >
    <EvaChevronRight />
    <summary v-if="summary">{{ summary }}</summary>
    <section class="contents">
      <slot />
    </section>
  </details>
</template>

<script>
import { ref } from '@vue/composition-api'

import { EvaChevronRight } from '@baleada/icons/vue'

export default {
  name: 'ProseDetails',
  components: {
    EvaChevronRight,
  },
  props: {
    summary: {
      type: String,
      default: ''
    },
    classes: {
      type: String,
      default: '',
    },
  },
  setup() {
    const prose = ref(null)

    /* Manage open state */
    const isOpen = ref(false),
          toggleOpen = () => isOpen.value = !isOpen.value,
          open = () => isOpen.value = true,
          close = () => isOpen.value = false,
          handleClick = toggleOpen

    return {
      prose,
      isOpen,
      handleClick,
    }
  },
}
</script>
