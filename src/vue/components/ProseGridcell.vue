<template lang="html">
  <div ref="prose" role="gridcell">
    <slot />
  </div>
</template>

<script>
import { ref, computed, watch, onMounted, inject } from '@vue/composition-api'

import useSymbol from '~/assets/js/useSymbol'

export default {
  setup() {
    const prose = ref(null),
          row = ref(null),
          column = ref(null),
          focused = inject(useSymbol('proseGrid', 'focused')),
          isFocused = computed(() => row === focused.row && column === focused.column)

    watch(isFocused, () => {
      if (isFocused.value) {
        prose.value.focus()
      }
    })

    function setRow() {
      row.value = rows.findIndex(row => parent.isSameNode(row))
    }

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
