<template>
  <div
    ref="baleada"
    class="baleada-prose-columnheader"
    role="columnheader"
    tabindex="-1"
    @click="handleClick"
  >
    <slot />
  </div>
</template>

<script>
import { ref, computed, watch, inject } from '@vue/composition-api'

import useSymbol from './useSymbol'

export default {
  name: 'ProseColumnheader',
  props: {
    rowgroup: {
      type: Number,
      required: true,
    },
    row: {
      type: Number,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const baleada = ref(null),
          focused = inject(useSymbol('grid', 'focused')),
          isFocused = computed(() => {
            const { rowgroup, row, gridcell } = focused.value
            return rowgroup === props.rowgroup && row === props.row && gridcell === props.index
          })

    watch(() => {
      if (isFocused.value) {
        baleada.value.focus()
      }
    })

    const setFocused = inject(useSymbol('grid', 'setFocused'))
    function handleClick () {
      setFocused({ rowgroup: props.rowgroup, row: props.row, gridcell: props.index })
    }

    return {
      baleada,
      handleClick,
    }
  },
}
</script>
