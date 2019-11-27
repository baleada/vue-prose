<template>
  <section
    ref="prose"
    class="baleada-prose-list"
    :class="[
      hasMaxHeight ? 'baleada-prose-grid-max-height' : '',
      canFilterByQuery ? 'baleada-prose-grid-filter-by-query' : '',
    ]"
  >
    <input
      v-if="canFilterByQuery"
      placeholder="Type to filter..."
      name="Type to filter"
      type="text"
      :value="filterQuery"
      @input="handleFilterQuery"
    />
    <input
      v-if="canFilterByQuery && canChangeFilterIsCaseSensitive"
      type="checkbox"
      :checked="filterIsCaseSensitiveRef"
      @change="handleCaseSensitiveChange"
    />
    <label v-if="canFilterByQuery && canChangeFilterIsCaseSensitive">
      Filter is case sensitive
    </label>
    <section class="contents">
      <slot />
    </section>
  </section>
</template>

<script>
import { ref, watch, computed, provide } from '@vue/composition-api'

import { useSymbol } from '../composition'

export default {
  name: 'ProseList',
  props: {
    canFilterByQuery: {
      type: Boolean,
      default: false,
    },
    filterIsCaseSensitive: {
      type: Boolean,
      default: false,
    },
    canChangeFilterIsCaseSensitive: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const prose = ref(null)

    /* Model list */
    const rows = ref([]),
          addRow = (index, ref, setIsFiltered) => {
            rows.value.push({
              ref,
              isFiltered: false,
              setIsFiltered,
              coordinates: { row: index },
              text: ref.value.textContent,
            })
          }

    provide(useSymbol('list', 'addRow'), addRow)

    /* Filtering */
    const filterIsCaseSensitiveRef = ref(props.filterIsCaseSensitive),
          filterQuery = ref(''),
          handleCaseSensitiveChange = () => (filterIsCaseSensitiveRef.value = !filterIsCaseSensitiveRef.value),
          handleFilterQuery = (evt) => (filterQuery.value = evt.target.value),
          filteredRows = computed(() => rows.value.filter(({ isFiltered }) => !isFiltered)),
          setFilteredState = (query, isCaseSensitive) => {
            rows.value
              .forEach(row => {
                const { text, setIsFiltered } = row,
                      matchesFilterQuery = isCaseSensitive
                        ? text.includes(query)
                        : text.toLowerCase().includes(query.toLowerCase())

                row.isFiltered = setIsFiltered(!matchesFilterQuery)
              })
          }

    if (props.canFilterByQuery) {
      watch(
        [filterQuery, filterIsCaseSensitiveRef],
        () => setFilteredState(filterQuery.value, filterIsCaseSensitiveRef.value),
        { lazy: true }
      )
    }

    return {
      prose,
      filterQuery,
      handleFilterQuery,
      filterIsCaseSensitiveRef,
      handleCaseSensitiveChange,
    }
  },
}
</script>
