import { ref, computed, onMounted } from 'vue'
import { useBindings, useListeners, useConditionalDisplay } from '@baleada/vue-features/util'
import { useSearchable } from '@baleada/vue-composition'
import { loopedIdPrefix } from '../state'


// TODO: aria-rowindex

export default function useList ({
    totalBodyRows,
    totalColumns,
    searchIgnoresQueryCase: rawIgnoresQueryCase,
    ariaLabel,
    minimumSearchScore,
  },
  { searchable: searchableOptions}
) {
  /* Set up DOM refs, including static attribute binding */
  const rootEl = ref(null),
        queryInputEl = ref(null),
        searchIgnoresQueryCaseCheckboxEl = ref(null)
  useBindings({ target: rootEl, bindings: { role: 'table', 'aria-label': ariaLabel }})


  // Set up table header
  const headerRowGroupEl = ref(null),
        { 0: headerRowGroup } = toMetadata({
          length: 1,
          fromIndex: index => {
            const id = `${loopedIdPrefix}-${index}`,
                  el = ref(null),
                  metadatum = { id, el }

            useBindings({
              target: el,
              bindings: { role: 'rowgroup' }
            })

            return metadatum
          }
        }),
        headerRowEl = ref(null),
        { 0: headerRow } = toMetadata({
          length: 1,
          fromIndex: index => {
            const id = `${loopedIdPrefix}-${index}`,
                  el = ref(null),
                  metadatum = { id, el }

            useBindings({
              target: el,
              bindings: { role: 'row', 'aria-rowindex': 1 }
            })

            return metadatum
          }
        }),
        headerCellEls = ref([]), // When attached to the element with v-for, this will become an array of DOM elements 
        headerCells = toMetadata({
          length: totalColumns,
          fromIndex: index => {
            const id = `${loopedIdPrefix}-${index}`,
                  el = computed(() => headerCellEls.value[index]),
                  metadatum = { id, el }

            useBindings({
              target: el,
              bindings: { role: 'columnheader' }
            })

            return metadatum
          }
        })
        


  // Set up table body
  const bodyRowGroupEl = ref(null),
        { 0: bodyRowGroup } = toMetadata({
          length: 1,
          fromIndex: index => {
            const id = `${loopedIdPrefix}-${index}`,
                  el = ref(null),
                  metadatum = { id, el }

            useBindings({
              target: el,
              bindings: { role: 'rowgroup' }
            })

            return metadatum
          }
        }),
        bodyRowEls = ref([]), // When attached to the element with v-for, this will become an array of DOM elements
        bodyRows = toMetadata({
          length: totalBodyRows,
          fromIndex: index => {
            const id = `${loopedIdPrefix}-${index}`,
                  el = ref(null),
                  textContent = computed(() => el.value.textContent),
                  searchResult = computed(() => searchable.value.results.find(({ item }) => item === textContent.value) || null),
                  metadatum = { id, el, searchResult }

            useBindings({
              target: el,
              bindings: { role: 'row', 'aria-rowindex': index + 2 } // row indices start at 1, and the first row is the header row. Therefore, +2.
            })
            useConditionalDisplay({
              target: el,
              condition: computed(() => query.value === '' || searchResult.value?.score > minimumSearchScore)
            })

            return metadatum
          }
        }),
        bodyCellElsByRow = bodyRows.reduce((bodyCellElsByRow, bodyRow, index) => ({
          ...bodyCellElsByRow,
          [index]: ref([]), // When attached to the slot with v-for, this will become an array of DOM elements
        }), {}),
        bodyCells = toMetadata({
          length: totalBodyRows * totalColumns,
          fromIndex: index => {
            const id = `${loopedIdPrefix}-${index}`,
                  rowIndex = Math.floor(index / totalColumns),
                  indexInRow = index % totalColumns,
                  el = computed(() => bodyCellElsByRow[rowIndex].value[indexInRow]),
                  metadatum = { id, el }

            useBindings({
              target: el,
              bindings: { role: 'cell' }
            })

            return metadatum
          }
        }),
        bodyCellsByRow = bodyRows.reduce((bodyCellsByRow, bodyRow, index) => ({
          ...bodyCellsByRow,
          [index]: bodyCells.slice(index * totalBodyRows, (index + 1) * totalBodyRows)
        }), {})

  /* Initialize searchable */
  let searchable
  onMounted(() => {
    const candidates = bodyRows.map(({ textContent }) => textContent.value)
    searchable = useSearchable(candidates, searchableOptions)
  })

  /* Manage query case sensitivity */
  const searchIgnoresQueryCase = ref(rawIgnoresQueryCase)
  useBindings({
    target: searchIgnoresQueryCaseCheckboxEl,
    bindings: { checked: computed(() => searchIgnoresQueryCase.value ? 'true' : '') }
  })
  useListeners({
    target: searchIgnoresQueryCaseCheckboxEl,
    listeners: {
      change ({ target: { checked } }) {
        searchIgnoresQueryCase.value = checked
      }
    }
  })

  /* Manage query */
  const query = ref('')
  useBindings({
    target: queryInputEl,
    bindings: { value: query }
  })
  useListeners({
    target: queryInputEl,
    listeners: {
      input ({ target: { value } }) {
        query.value = value

        /* EFFECT: Search for matches */
        searchable.value.search(query.value, { ignoreCase: searchIgnoresQueryCase.value })
      }
    }
  })

  // TODO: pagination feature

  return {
    root: {
      ref: el => (rootEl.value = el),
    },
    header: {
      rowGroup: {
        ref: headerRowGroupEl,
        metadata: headerRowGroup,
      },
      row: {
        ref: headerRowEl,
        metadata: {
          ...headerRow,
          cells: {
            ref: el => (headerCellEls.value = [...headerCellEls.value, el]),
            metadata: headerCells
          },
        }
      }
    },
    body: {
      rowGroup: {
        ref: bodyRowGroupEl,
        metadata: bodyRowGroup,
      },
      rows: {
        ref: bodyRowEls,
        metadata: bodyRows.map((row, index) => ({
          ...row,
          cells: {
            ref: el => (bodyCellElsByRow[index].value = [...bodyCellElsByRow[index].value, el]),
            metadata: bodyCellsByRow[index],
          }
        }))
      }
    },
    queryInput: {
      ref: el => (queryInputEl.value = el),
    },
    searchIgnoresQueryCaseCheckbox: {
      ref: el => (searchIgnoresQueryCaseCheckboxEl.value = el),
    },
    query,
    searchIgnoresQueryCase,
    searchable,
  }
}
