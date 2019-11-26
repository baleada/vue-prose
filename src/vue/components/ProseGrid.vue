<template>
  <section ref="prose" class="prose-grid prose-grid-striped w-full sm:w-auto sm:min-w-2 swiper-no-swiping transition">
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
          class="filter-is-case-sensitive-checkbox"
          type="checkbox"
          :checked="filterIsCaseSensitiveRef"
          @change="handleCaseSensitiveChange"
        />
        <label class="filter-is-case-sensitive-label flex-1 ml-2">Filter is case sensitive</label>
      </div>
    </div>
    <div
      class="contents scrollable p-2px"
      :class="[
        canFilterByQuery ? 'mt-4' : '',
      ]"
      tabindex="0"
      :aria-label="ariaLabel"
      @keydown="handleKeydown"
      @focus="handleFocus"
    >
      <slot />
    </div>
  </section>
</template>

<script>
import { reactive, ref, watch, computed, provide } from '@vue/composition-api'
import { useGridKeyboardAccesibility } from '../composition'

import { useSymbol } from '../composition'

export default {
  name: 'ProseGrid',
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
    ariaLabel: {
      type: String,
      required: true,
    }
  },
  setup(props) {
    const prose = ref(null)

    /* Model grid */
    const rowgroups = ref([]),
          addRowgroup = (index, ref) => {
            rowgroups.value.push({
              ref,
              coordinates: { rowgroup: index },
            })
          },
          rows = ref([]),
          addRow = (rowgroupIndex, index, ref, setIsFiltered) => {
            rows.value.push({
              ref,
              isFiltered: false,
              setIsFiltered,
              coordinates: { rowgroup: rowgroupIndex, row: index },
              text: ref.value.textContent,
            })
          },
          gridcells = ref([]),
          addGridcell = (rowgroupIndex, rowIndex, index, ref) => {
            gridcells.value.push({
              ref,
              coordinates: { rowgroup: rowgroupIndex, row: rowIndex, gridcell: index },
            })
          }

    provide(useSymbol('grid', 'addRowgroup'), addRowgroup)
    provide(useSymbol('grid', 'addRow'), addRow)
    provide(useSymbol('grid', 'addGridcell'), addGridcell)

    /* Filtering */
    const filterIsCaseSensitiveRef = ref(props.filterIsCaseSensitive),
          filterQuery = ref(''),
          handleCaseSensitiveChange = () => (filterIsCaseSensitiveRef.value = !filterIsCaseSensitiveRef.value),
          handleFilterQuery = (evt) => (filterQuery.value = evt.target.value),
          filteredRows = computed(() => rows.value.filter(({ isFiltered }) => !isFiltered)),
          setFilteredState = (query, isCaseSensitive) => {
            rows.value
              .filter(({ coordinates: { rowgroup } }) => rowgroup === 1)
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


    /* Focusing */
    const filteredRowCoordinates = computed(() => filteredRows.value.map(({ coordinates }) => coordinates)),
          focusableGridcells = computed(() => {
            return gridcells.value
              .filter(({ coordinates: { row, rowgroup } }) => {
                return filteredRowCoordinates.value.some(({ row: filteredRow, rowgroup: filteredRowgroup }) => {
                  return row === filteredRow && rowgroup === filteredRowgroup
                })
              })
          }),
          focused = reactive({ rowgroup: undefined, row: undefined, gridcell: undefined }),
          focusableRows = computed(() => {
            const indices = new Set(focusableGridcells.value.map(({ coordinates: { rowgroup, row } }) => rowgroup + row))
            return Array.from(indices).sort()
          }),
          currentRowIndex = computed(() => focusableRows.value.findIndex(row => row === focused.row + focused.rowgroup)),
          focusableColumns = computed(() => {
            const indices = new Set(focusableGridcells.value.map(({ coordinates: { gridcell } }) => gridcell))
            return Array.from(indices).sort()
          }),
          currentColumnIndex = computed(() => focusableColumns.value.findIndex(column => column === focused.gridcell))

    function setFocused (rowgroup, row, gridcell) {
      focused.rowgroup = rowgroup
      focused.row = row
      focused.gridcell = gridcell
    }

    provide(useSymbol('grid', 'setFocused'), setFocused)

    const handleKeydown = useGridKeyboardAccesibility({
      focused: () => focused,
      rows: () => focusableRows.value,
      columns: () => focusableColumns.value,
      grid: () => prose.value,
      currentRowIndex: () => currentRowIndex.value,
      currentColumnIndex: () => currentColumnIndex.value,
    })

    const handleFocus = () => {
      focused.rowgroup = undefined
      focused.row = undefined
      focused.gridcell = undefined
    }

    watch(
      [() => focused.rowgroup, () => focused.row, () => focused.gridcell],
      () => {
        const focusedGridcell = gridcells.value
          .find(({ coordinates: { rowgroup, row, gridcell } }) => {
            return rowgroup === focused.rowgroup && row === focused.row && gridcell === focused.gridcell
          })

        if (focusedGridcell) {
          focusedGridcell.ref.value.focus()
        }
      },
      { lazy: true }
    )

    return {
      prose,
      filterQuery,
      handleFilterQuery,
      filterIsCaseSensitiveRef,
      handleCaseSensitiveChange,
      handleKeydown,
      handleFocus,
    }
  },
}
</script>
