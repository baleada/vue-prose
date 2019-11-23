<template>
  <section class="prose-table prose-table-striped w-full sm:w-auto sm:min-w-2 swiper-no-swiping transition">
    <div v-if="canFilterByQuery">
      <input
        class="filter-query-input inp w-full"
        placeholder="Type to filter..."
        name="Type to filter"
        type="text"
        :value="filterQuery"
        @input="handleFilterQuery"
      />
      <div class="mt-2 flex items-center" v-if="canChangeFilterQueryIsCaseSensitive">
        <input
          class="filter-query-is-case-sensitive-checkbox"
          type="checkbox"
          :checked="filterQueryIsCaseSensitiveRef"
          @change="handleCaseSensitiveChange"
        />
        <label class="filter-query-is-case-sensitive-label flex-1 ml-2">Filter is case sensitive</label>
      </div>
    </div>
    <div
      ref="prose"
      class="contents scrollable p-2px"
      :class="[
        hasMaxHeight ? 'with-max-h' : '',
        canFilterByQuery ? 'mt-4' : '',
      ]"
      tabindex="0"
      :aria-label="ariaLabel"
      @keydown="handleKeydown"
    >
      <slot />
    </div>
  </section>
</template>

<script>
import { reactive, ref, computed, onMounted, provide } from '@vue/composition-api'
import { useGridKeyboardAccesibility } from '../composition'

import { useSymbol } from '../composition'

export default {
  name: 'ProseTable',
  props: {
    hasMaxHeight: {
      type: Boolean,
      default: false,
    },
    canFilterByQuery: {
      type: Boolean,
      default: false,
    },
    filterQueryIsCaseSensitive: {
      type: Boolean,
      default: false,
    },
    canChangeFilterQueryIsCaseSensitive: {
      type: Boolean,
      default: false,
    },
    ariaLabel: {
      type: String,
      required: true,
    }
  },
  setup(props) {
    const prose = ref(null)

    /* JSONify grid */
    const grid = reactive({ rowgroups: [] }),
          addRowgroup = (index, ref) => {
            grid
              .rowgroups
              .push({
                ref,
                coordinates: { rowgroup: index }
                rows: []
              })
          },
          addRow = (rowgroupIndex, index, ref, setIsFiltered) => {
            grid
              .rowgroups[rowgroupIndex]
              .rows
              .push({
                ref,
                isFiltered: false,
                setIsFiltered,
                coordinates: { rowgroup: rowgroupIndex, row: index }
                text: ref.value.textContent,
                gridcells: []
              })
          },
          addGridcell = (rowgroupIndex, rowIndex, ref) => {
            grid
              .rowgroups[rowgroupIndex]
              .rows[rowIndex]
              .gridcells
              .push({
                ref,
                coordinates: { rowgroup: rowgroupIndex, row: rowIndex, gridcell: index }
              })
          }

    provide(useSymbol('grid', 'grid'), grid)
    provide(useSymbol('grid', 'addRowgroup'), addRowgroup)
    provide(useSymbol('grid', 'addRow'), addRow)
    provide(useSymbol('grid', 'addGridcell'), addGridcell)

    /* Filtering */
    const filterQueryIsCaseSensitiveRef = ref(props.filterQueryIsCaseSensitive),
          filterQuery = ref(''),
          handleCaseSensitiveChange = () => (filterQueryIsCaseSensitiveRef.value = !filterQueryIsCaseSensitiveRef.value),
          handleFilterQuery = (evt) => (filterQuery.value = evt.target.value),
          filteredRows = computed(() => ([
            grid.rowgroups[0].rows[0], // Header is never filtered out
            ...grid.rowgroups[1].rows.filter(({ isFiltered }) => !isFiltered)
          ]))

    if (props.canFilterByQuery) {
      watch(filterQuery, () => {
        grid.rowgroups[1].rows.forEach(({ text, setIsFiltered }, index) => {
          const matchesFilterQuery = filterQueryIsCaseSensitive.value
            ? text.includes(filterQuery.value),
            : text.toLowerCase().includes(filterQuery.value.toLowerCase())

          grid.rowgroups[1].rows[index].isFiltered = setIsFiltered(!matchesFilterQuery)
        }))
      })
    }

    provide(useSymbol('grid', 'filterQuery'), filterQuery)
    provide(useSymbol('grid', 'filterQueryIsCaseSensitive'), filterQueryIsCaseSensitiveRef)


    /* Focusing */
    const focusableGridcells = computed(() => filteredRows.reduce((focusableGridcells, { gridcells }) => [ ...filteredGrid, ...gridcells ], [])),
          focused = reactive({ rowgroup: 0, row: 0, gridcell: 0 }),
          rows = computed(() => {
            const indices = new Set(focusableGridcells.map(({ coordinates: { rowgroup, row } }) => rowgroup + row))
            return Array.from(indices)
          }),
          currentRowIndex = computed(() => rows.value.findIndex(row => row === focused.row)),
          columns = computed(() => {
            const indices = new Set(focusableGridcells.map(({ coordinates: { gridcell } }) => gridcell))
            return Array.from(indices)
          }),
          currentColumnIndex = computed(() => columns.value.findIndex(column => column === focused.gridcell))

    const handleKeydown = useGridKeyboardAccesibility({
      focused: () => focused,
      rows: () => rows.value,
      columns: () => columns.value,
      grid: () => prose.value,
    })

    watch(focused, () => grid.rowgroups[focus.rowgroup].rows[focused.row].gridcells[focused.gridcell].ref.value.focus())

    return {
      prose,
      filterQuery,
      handleFilterQuery,
      filterQueryIsCaseSensitiveRef,
      handleCaseSensitiveChange,
      handleKeydown,
    }
  },
}
</script>
