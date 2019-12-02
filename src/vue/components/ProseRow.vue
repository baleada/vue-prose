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
    },
  },
  setup (props) {
    const prose = ref(null),
          canFilterByQuery = inject(useSymbol('grid', 'canFilterByQuery'))

    if (canFilterByQuery.value) {
      const filterQuery = inject(useSymbol('grid', 'filterQuery')),
            filterIsCaseSensitive = inject(useSymbol('grid', 'filterIsCaseSensitive')),
            setRowIsFiltered = inject(useSymbol('grid', 'setRowIsFiltered')),
            text = computed(() => prose.value ? prose.value.textContent : undefined),
            isFiltered = ref(false)

      watch([filterQuery, filterIsCaseSensitive], () => {
        const matchesFilterQuery = filterIsCaseSensitive.value
                ? text.value.includes(filterQuery.value)
                : text.value.toLowerCase().includes(filterQuery.value.toLowerCase())

        isFiltered.value = matchesFilterQuery
        setRowIsFiltered({ row: props.index, isFilterable: matchesFilterQuery })
      })
    }

    return {
      prose,
      isFiltered
    }
  }
}
</script>
