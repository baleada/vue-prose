<template>
  <transition>
    <div
      v-show="!isFiltered"
      ref="prose"
      role="row"
    >
      <slot />
    </div>
  </transition>
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
  setup (props) {
    provide(useSymbol('row', 'index'), props.index)

    const prose = ref(null),
          isFiltered = ref(false),
          setIsFiltered = newIsFiltered => {
            isFiltered.value = newIsFiltered
            return isFiltered.value
          }

    const addRow = inject(useSymbol('grid', 'addRow')),
          rowgroupIndex = inject(useSymbol('rowgroup', 'index'))

    onMounted(() => {
      addRow(rowgroupIndex, props.index, prose, setIsFiltered)
    })

    return {
      prose,
      isFiltered
    }
  }
}
</script>
