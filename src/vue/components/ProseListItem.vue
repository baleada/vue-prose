<template>
  <transition name="baleada-prose-list-item">
    <li
      ref="prose"
      v-show="!isFiltered"
      class="baleada-prose-list-item"
    >
      <slot />
    </li>
  </transition>
</template>

<script>
import { ref, onMounted, inject } from '@vue/composition-api'

import { useSymbol } from '../composition'

export default {
  name: 'ProseListItem',
  props: {
    index: {
      type: Number,
      required: true,
    }
  },
  setup (props) {
    const prose = ref(null),
          isFiltered = ref(false),
          setIsFiltered = newIsFiltered => {
            isFiltered.value = newIsFiltered
            return isFiltered.value
          }

    const addRow = inject(useSymbol('list', 'addRow'))

    onMounted(() => {
      addRow(props.index, prose, setIsFiltered)
    })

    return {
      prose,
      isFiltered,
    }
  }
}
</script>
