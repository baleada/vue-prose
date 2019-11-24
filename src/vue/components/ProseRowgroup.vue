<template>
  <div ref="prose" role="rowgroup">
    <slot />
  </div>
</template>

<script>
import { ref, onMounted, provide, inject } from '@vue/composition-api'

import { useSymbol } from '../composition'

export default {
  name: 'ProseRowgroup',
  props: {
    index: {
      type: Number,
      required: true,
    }
  },
  setup(props) {
    provide(useSymbol('rowgroup', 'index'), props.index)

    const prose = ref(null),
          addRowgroup = inject(useSymbol('grid', 'addRowgroup'))

    onMounted(() => addRowgroup(props.index, prose))

    return {
      prose
    }
  },
}
</script>
