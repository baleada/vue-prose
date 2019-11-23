<template>
  <div ref="prose" role="gridcell">
    <slot />
  </div>
</template>

<script>
import { ref, computed, watch, onMounted, inject } from '@vue/composition-api'

import { useSymbol } from '../composition'

export default {
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
          column = props.index,
          focused = inject(useSymbol('grid', 'focused')),
          isFocused = computed(() => row === focused.row && column === focused.column)

    watch(isFocused, () => {
      if (isFocused.value) {
        prose.value.focus()
      }
    })

    onMounted(() => {
      const cells = Array.from(prose.value.parent.children)
      column.value = cells.findIndex(cell => prose.value.isSameNode(cell))
    })

    return {
      prose
    }
  },
}
</script>
