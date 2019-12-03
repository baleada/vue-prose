<template>
  <section
    ref="prose"
    class="baleada-prose-grid"
    :class="[classes]"
  >
    <input
      v-if="canFilterByQuery"
      placeholder="Type to filter..."
      name="Type to filter"
      type="text"
      :value="filterQuery"
      @input="handleFilterQueryInput"
    />
    <input
      v-if="canFilterByQuery && canChangeFilterCaseSensitivity"
      name="Change filter case sensitivity"
      type="checkbox"
      :checked="computedFilterIsCaseSensitive"
      @change="handleCaseSensitivityChange"
    />
    <label v-if="canFilterByQuery && canChangeFilterCaseSensitivity">
      {{ messages.grid.changeFilterCaseSensitivityLabel }}
    </label>
    <section
      class="contents"
      tabindex="0"
      :aria-label="ariaLabel"
      @keydown="handleKeydown"
      @focus="handleFocus"
      ref="contents"
    >
      <slot />
    </section>
  </section>
</template>

<script>
import { ref, watch, computed, provide, inject } from '@vue/composition-api'
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
    canChangeFilterCaseSensitivity: {
      type: Boolean,
      default: false,
    },
    classes: {
      type: String,
      default: '',
    },
    ariaLabel: {
      type: String,
      required: true,
    },
    rows: {
      type: Array,
      required: true,
    },
    gridcells: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const prose = ref(null),
          contents = ref(null)

    /* Get messages */
    const messages = inject(useSymbol('layout', 'messages'))

    /* Filtering */
    provide(useSymbol('grid', 'canFilterByQuery'), props.canFilterByQuery)

    const filterQuery = props.canFilterByQuery ? ref('') : {},
          computedFilterIsCaseSensitive = props.canFilterByQuery ? ref(props.filterIsCaseSensitive) : {},
          handleCaseSensitivityChange = () => (computedFilterIsCaseSensitive.value = !computedFilterIsCaseSensitive.value),
          handleFilterQueryInput = evt => (filterQuery.value = evt.target.value)
    let filterableRows, setRowIsFiltered
    if (props.canFilterByQuery) {
      filterableRows = ref(
        props.rows
          .slice(1) // header row never gets filtered
          .map(({ row }) => ({ row, isFiltered: false }))
      ),
      setRowIsFiltered = ({ row, isFiltered }) => (filterableRows.value[row].isFiltered = isFiltered)

      provide(useSymbol('grid', 'filterQuery'), filterQuery)
      provide(useSymbol('grid', 'filterIsCaseSensitive'), computedFilterIsCaseSensitive)
      provide(useSymbol('grid', 'setRowIsFiltered'), setRowIsFiltered)
    }


    /* Focusing */
    const focusableRows = computed(() => filterableRows.value.filter(({ isFiltered }) => !isFiltered)),
          focusableGridcells = computed(() => {
            return props.gridcells
              .filter(({ rowgroup, row }) => {
                return rowgroup === 0 || focusableRows.value.some(({ row: focusableRow }) => row === focusableRow)
              })
          }),
          focusableRowIndices = computed(() => {
            const indices = new Set(focusableGridcells.value.map(({ rowgroup, row }) => rowgroup + row))
            return Array.from(indices)
          }),
          currentRowIndex = computed(() => focusableRowIndices.value.findIndex(row => row === focused.value.row + focused.value.rowgroup)),
          focusableColumnIndices = computed(() => {
            const indices = new Set(focusableGridcells.value.map(({ gridcell }) => gridcell))
            return Array.from(indices)
          }),
          currentColumnIndex = computed(() => focusableColumnIndices.value.findIndex(column => column === focused.value.gridcell)),
          focused = ref({ rowgroup: undefined, row: undefined, gridcell: undefined }),
          setFocused = ({ rowgroup, row, gridcell }) => {
            if (focused.value.rowgroup !== rowgroup || focused.value.row !== row || focused.value.gridcell !== gridcell) {
              const numWasPassed = [rowgroup, row, gridcell].some(arg => typeof arg === 'number'),
                    newFocused = numWasPassed
                      ? {
                        rowgroup: typeof rowgroup === 'number' ? rowgroup : focused.value.rowgroup,
                        row: typeof row === 'number' ? row : focused.value.row,
                        gridcell: typeof gridcell === 'number' ? gridcell : focused.value.gridcell,
                      }
                      : { rowgroup, row, gridcell }

              focused.value = newFocused
            }
          }

    provide(useSymbol('grid', 'focused'), focused)
    provide(useSymbol('grid', 'setFocused'), setFocused)

    const getters = {
            focused: () => focused.value,
            rows: () => focusableRowIndices.value,
            columns: () => focusableColumnIndices.value,
            grid: () => contents.value,
            currentRow: () => currentRowIndex.value,
            currentColumn: () => currentColumnIndex.value,
          },
          setters = { setFocused },
          handleKeydown = useGridKeyboardAccesibility(getters, setters)

    const handleFocus = () => {
      focused.value.rowgroup = undefined
      focused.value.row = undefined
      focused.value.gridcell = undefined
    }

    return {
      prose,
      contents,
      messages,
      filterQuery,
      handleFilterQueryInput,
      computedFilterIsCaseSensitive,
      handleCaseSensitivityChange,
      handleKeydown,
      handleFocus,
    }
  },
}
</script>
