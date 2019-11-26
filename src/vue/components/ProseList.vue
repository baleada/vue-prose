<template>
  <section ref="prose" class="prose-list w-full sm:w-auto sm:min-w-2 transition">
    <div v-if="canFilterByQuery">
      <input
        class="filter-query-input inp w-full"
        placeholder="Type to filter..."
        name="Type to filter"
        type="text"
        :value="filterQuery"
        @input="handleFilterQuery"
      />
      <div class="mt-2 flex items-center" v-if="canChangeFilterIsCaseSensitive">
        <input
          class="filter-query-is-case-sensitive-checkbox"
          type="checkbox"
          :checked="filterIsCaseSensitiveRef"
          @change="handleCaseSensitiveChange"
        />
        <label class="filter-query-is-case-sensitive-label flex-1 ml-2">Filter is case sensitive</label>
      </div>
    </div>
    <div
      class="contents scrollable p-2px"
      :class="[
        canFilterByQuery ? 'mt-4' : '',
      ]"
    >
      <slot />
    </div>
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
