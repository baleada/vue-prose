<template>
  <div ref="prose" role="gridcell" tabindex="-1" @click="handleClick">
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

    const setFocused = inject(useSymbol('grid', 'setFocused'))
    function handleClick () {
      setFocused(rowgroupIndex, rowIndex, props.index)
    }

    return {
      prose,
      handleClick,
    }
  },
}
</script>
