<template>
  <component ref="prose" :is="isOrdered ? 'ol' : 'ul'">
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
