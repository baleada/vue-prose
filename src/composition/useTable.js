import { ref, computed, onMounted } from 'vue'
import { useBindings, useListeners, useConditionalDisplay } from '@baleada/vue-features/affordances'
import { useSearchable } from '@baleada/vue-composition'
import { loopedIdPrefix } from '../state'

export default function useList (
  {
    totalBodyRows,
    totalColumns,
    ariaLabel,
    searchIgnoresQueryCase: rawSearchIgnoresQueryCase,
    minimumSearchScore,
    readerCanSearch,
    readerCanChangeSearchCaseSensitivity,
  },
  { searchable: searchableOptions }
) {
  /* Set up DOM refs, including static attribute binding */
  const rootEl = ref(null),
        queryInputEl = ref(null),
        searchIgnoresQueryCaseCheckboxEl = ref(null)
  useBindings({ target: rootEl, bindings: { role: 'table', ariaLabel, }})


  // Set up table header
  const   { 0: headerRowGroup } = toMetadata({
          length: 1,
          fromIndexToMetadatum: index => {
            const id = `${loopedIdPrefix}-${index}`,
                  el = ref(null),
                  setEl = newEl => (el.value = newEl),
                  headerRowGroup = { id, el, ref: setEl }

            useBindings({
              target: el,
              bindings: { role: 'rowgroup' }
            })

            return headerRowGroup
          }
        }),        
        { 0: headerRow } = toMetadata({
          length: 1,
          fromIndexToMetadatum: index => {
            const id = `${loopedIdPrefix}-${index}`,
                  el = ref(null),
                  setEl = newEl => (el.value = newEl),
                  headerRow = { id, el, ref: setEl }

            useBindings({
              target: el,
              bindings: { role: 'row', ariaRowindex: 1 }
            })

            return headerRow
          }
        }),
        headerCells = toMetadata({
          length: totalColumns,
          fromIndexToMetadatum: index => {
            const id = `${loopedIdPrefix}-${index}`,
                  el = ref(null),
                  setEl = newEl => (el.value = newEl),
                  headerCell = { id, el, ref: setEl }

            useBindings({
              target: el,
              bindings: { role: 'columnheader' }
            })

            return headerCell
          }
        })
        
  // Set up table body
  const { 0: bodyRowGroup } = toMetadata({
          length: 1,
          fromIndexToMetadatum: index => {
            const id = `${loopedIdPrefix}-1`,
                  el = ref(null),
                  setEl = newEl => (el.value = newEl),
                  bodyRowGroup = { id, el, ref: setEl }

            useBindings({
              target: el,
              bindings: { role: 'rowgroup' }
            })

            return bodyRowGroup
          }
        }),
        bodyRows = toMetadata({
          length: totalBodyRows,
          fromIndexToMetadatum: index => {
            const id = `${loopedIdPrefix}-${index}`,
                  el = ref(null),
                  setEl = newEl => (el.value = newEl),
                  textContent = computed(() => el.value.textContent),
                  searchResult = computed(() => searchable.value.results.find(({ item }) => item === textContent.value) || null),
                  bodyRow = { id, el, textContent, searchResult, ref: setEl }

            useBindings({
              target: el,
              bindings: { role: 'row', ariaRowindex: index + 2 } // row indices start at 1, and the first row is the header row. Therefore, +2.
            })

            useConditionalDisplay({
              target: el,
              condition: computed(() => query.value === '' || searchResult.value?.score >= minimumSearchScore)
            })

            return bodyRow
          }
        }),
        bodyCells = toMetadata({
          length: totalBodyRows * totalColumns,
          fromIndexToMetadatum: index => {
            const indexInRow = index % totalColumns,
                  id = `${loopedIdPrefix}-${indexInRow}`,
                  el = ref(null),
                  setEl = newEl => (el.value = newEl),
                  bodyCell = { id, el, ref: setEl }

            useBindings({
              target: el,
              bindings: { role: 'cell' }
            })

            return bodyCell
          }
        }),
        bodyCellsByRow = bodyRows.reduce((bodyCellsByRow, _, index) => ({
          ...bodyCellsByRow,
          [index]: bodyCells.slice(index * totalColumns, (index + 1) * totalColumns)
        }), {})

  // Initialize searchable
  const searchable = useSearchable([], searchableOptions)
  onMounted(() => {
    const candidates = bodyRows.map(({ textContent }) => textContent.value)
    searchable.value.setCandidates(candidates)
  })

  // Manage query case sensitivity
  const searchIgnoresQueryCase = ref(rawSearchIgnoresQueryCase)
  if (readerCanChangeSearchCaseSensitivity) {
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
  }
  
  // Manage query
  const query = ref('')
  if (readerCanSearch) {
    useBindings({
      target: queryInputEl,
      bindings: { value: query }
    })
    useListeners({
      target: queryInputEl,
      listeners: {
        input ({ target: { value } }) {
          query.value = value
  
          // EFFECT: Search for matches
          searchable.value.search(query.value, { ignoreCase: searchIgnoresQueryCase.value, returnMatchData: true })
        }
      }
    })
  }

  // TODO: pagination feature

  return {
    root: {
      ref: el => (rootEl.value = el),
    },
    header: {
      rowGroup: headerRowGroup,
      row: headerRow,
      cells: headerCells,
    },
    body: {
      rowGroup: bodyRowGroup,
      rows: bodyRows,
      cellsByRow: bodyCellsByRow,
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

function toMetadata ({ length, fromIndexToMetadatum }) {
  return Array(length).fill().map((_, index) => fromIndexToMetadatum(index))
}
