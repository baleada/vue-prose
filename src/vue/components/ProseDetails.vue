<template>
  <details>
    <summary>{{ summary }}</summary>
    <slot />
  </details>
</template>

<script>
import { ref } from '@vue/composition-api'

export default {
  name: 'ProseDetails',
  props: {
    summary: {
      type: String,
    }
  },
  setup() {
    const isOpen = ref(false)

    return {
      isOpen
    }
  },
}
</script>
