<template>
  <div ref="prose" role="gridcell">
    <slot />
  </div>
</template>

<script>
import { ref, onMounted, inject } from '@vue/composition-api'

import { useSymbol } from '../composition'

export default {
  name: 'ProseGridcell',
  props: {
    index: {
      type: Number,
      required: true,
    }
  },
  setup(props) {
    const prose = ref(null),
          rowgroupIndex = inject(useSymbol('rowgroup', 'index')),
          rowIndex = inject(useSymbol('row', 'index')),
          addGridcell = inject(useSymbol('grid', 'addGridcell'))

    onMounted(() => {
      addGridcell(rowgroupIndex, rowIndex, props.index, prose)
    })

    return {
      prose
    }
  },
}
</script>
