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
import { ref, computed, watch, inject } from '@vue/composition-api'

import { useSymbol } from '../composition'

export default {
  name: 'ProseRow',
  props: {
    rowgroup: {
      type: Number,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  setup (props) {
    const prose = ref(null),
          canFilterByQuery = inject(useSymbol('grid', 'canFilterByQuery')),
          isFiltered = ref(false),
          text = computed(() => prose.value ? prose.value.textContent : '')

    let filterQuery, filterIsCaseSensitive, setRowIsFiltered
    if (canFilterByQuery && props.rowgroup !== 0) {
      filterQuery = inject(useSymbol('grid', 'filterQuery'))
      filterIsCaseSensitive = inject(useSymbol('grid', 'filterIsCaseSensitive'))
      setRowIsFiltered = inject(useSymbol('grid', 'setRowIsFiltered'))

      watch([filterQuery, filterIsCaseSensitive], () => {
        const matchesFilterQuery = filterIsCaseSensitive.value
                ? text.value.includes(filterQuery.value)
                : text.value.toLowerCase().includes(filterQuery.value.toLowerCase())

        isFiltered.value = !matchesFilterQuery
        setRowIsFiltered({ row: props.index, isFiltered: !matchesFilterQuery })
      })
    }

    return {
      prose,
      isFiltered
    }
  }
}
</script>
