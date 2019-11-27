<template>
  <component
    ref="prose"
    :is="isOrdered ? 'ol' : 'ul'"
    class="baleada-prose-list-contents"
  >
    <slot />
  </component>
</template>

<script>
import { ref } from '@vue/composition-api'

export default {
  name: 'ProseListContents',
  props: {
    isOrdered: {
      type: Boolean,
      required: true,
    }
  },
  setup() {
    const prose = ref(null)

    return {
      prose,
    }
  },
}
</script>
