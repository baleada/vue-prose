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
import { reactive, ref, watch, computed, onMounted, provide } from '@vue/composition-api'
import { useGridKeyboardAccesibility } from '../composition'

import { useSymbol } from '../composition'

export default {
  name: 'ProseGrid',
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

    /* Model grid */
    const rowgroups = ref([]),
          addRowgroup = (index, ref) => {
            console.log('addRowgroup')
            console.log({ index, ref })
            rowgroups.value.push({
              ref,
              coordinates: { rowgroup: index },
            })
          },
          rows = ref([]),
          addRow = (rowgroupIndex, index, ref, setIsFiltered) => {
            console.log('addRow')
            console.log({ rowgroupIndex, index, ref, setIsFiltered })
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
            console.log('addGridcell')
            console.log({ rowgroupIndex, rowIndex, ref })
            gridcells.value.push({
              ref,
              coordinates: { rowgroup: rowgroupIndex, row: rowIndex, gridcell: index },
            })
          }

    provide(useSymbol('grid', 'addRowgroup'), addRowgroup)
    provide(useSymbol('grid', 'addRow'), addRow)
    provide(useSymbol('grid', 'addGridcell'), addGridcell)

    /* Filtering */
    const filterQueryIsCaseSensitiveRef = ref(props.filterQueryIsCaseSensitive),
          filterQuery = ref(''),
          handleCaseSensitiveChange = () => (filterQueryIsCaseSensitiveRef.value = !filterQueryIsCaseSensitiveRef.value),
          handleFilterQuery = (evt) => (filterQuery.value = evt.target.value),
          filteredRows = computed(() => rows.value.filter(({ isFiltered }) => !isFiltered))

    if (props.canFilterByQuery) {
      watch(filterQuery, () => {
        // Header is never filtered out
        rows.value
          .filter(({ coordinates: { rowgroup } }) => rowgroup === 1)
          .forEach(row => {
            const { text, setIsFiltered } = row,
                  matchesFilterQuery = filterQueryIsCaseSensitive.value
                    ? text.includes(filterQuery.value)
                    : text.toLowerCase().includes(filterQuery.value.toLowerCase())

            row.isFiltered = setIsFiltered(!matchesFilterQuery)
          })
      }, { lazy: true })
    }


    /* Focusing */
    const focusableGridcells = computed(() => {
            const filteredRowIndices = filteredRows.value.map(({ coordinates: { row } }) => row)
            return gridcells.value.filter(({ coordinates: { row } }) => filteredRowIndices.includes(row))
          }),
          focused = reactive({ rowgroup: 0, row: 0, gridcell: 0 }),
          focusableRows = computed(() => {
            const indices = new Set(focusableGridcells.map(({ coordinates: { rowgroup, row } }) => rowgroup + row))
            return Array.from(indices).sort()
          }),
          currentRowIndex = computed(() => focusableRows.value.findIndex(row => row === focused.row)),
          focusableColumns = computed(() => {
            const indices = new Set(focusableGridcells.map(({ coordinates: { gridcell } }) => gridcell))
            return Array.from(indices).sort()
          }),
          currentColumnIndex = computed(() => focusableColumns.value.findIndex(column => column === focused.gridcell))

    const handleKeydown = useGridKeyboardAccesibility({
      focused: () => focused,
      rows: () => focusableRows.value,
      columns: () => focusableColumns.value,
      grid: () => prose.value,
    })

    watch(
      [() => focused.rowgroup, () => focused.row, () => focused.gridcell],
      () => {
        gridcells.value
          .find(({ coordinates: { rowgroup, row, gridcell } }) => {
            return rowgroup === focused.rowgroup && row === focused.row && gridcell === focused.gridcell
          })
          .ref.value.focus()
      },
      { lazy: true }
    )

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
