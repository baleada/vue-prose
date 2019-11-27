<template>
  <transition name="baleada-prose-row">
    <div
      ref="prose"
      v-show="!isFiltered"
      class="baleada-prose-row"
    >
      <slot />
    </div>
  </transition>
</template>

<script>
import { ref, onMounted, provide, inject } from '@vue/composition-api'

import { useSymbol } from '../composition'

export default {
  name: 'ProseRow',
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
