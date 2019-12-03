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
import { ref, computed, watch, inject } from '@vue/composition-api'

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
          canFilterByQuery = inject(useSymbol('list', 'canFilterByQuery')),
          isFiltered = ref(false),
          text = computed(() => prose.value ? prose.value.textContent : '')

    let filterQuery, filterIsCaseSensitive, setListItemIsFiltered
    if (canFilterByQuery) {
      filterQuery = inject(useSymbol('list', 'filterQuery'))
      filterIsCaseSensitive = inject(useSymbol('list', 'filterIsCaseSensitive'))
      setListItemIsFiltered = inject(useSymbol('list', 'setListItemIsFiltered'))

      watch([filterQuery, filterIsCaseSensitive], () => {
        const matchesFilterQuery = filterIsCaseSensitive.value
                ? text.value.includes(filterQuery.value)
                : text.value.toLowerCase().includes(filterQuery.value.toLowerCase())

        isFiltered.value = !matchesFilterQuery
        setListItemIsFiltered({ listItem: props.index, isFiltered: !matchesFilterQuery })
      })
    }

    return {
      prose,
      isFiltered,
    }
  }
}
</script>
