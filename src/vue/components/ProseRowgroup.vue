<template>
  <div
    ref="baleada"
    class="baleada-prose-rowgroup"
    role="rowgroup"
  >
    <slot />
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'

export default {
  name: 'ProseRowgroup',
  props: {
    index: {
      type: Number,
      required: true,
    }
  },
  setup(props) {
    const baleada = ref(null)

    return {
      baleada,
    }
  },
}
</script>
