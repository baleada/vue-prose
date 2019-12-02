<template>
  <div
    ref="prose"
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
    const prose = ref(null)

    return {
      prose
    }
  },
}
</script>
