import { ref, computed, onMounted, watch } from 'vue'
import { bind, naiveOn as on, show } from '@baleada/vue-features'
import { useSearchable } from '@baleada/vue-composition'
import { loopedIdPrefix } from '../state'

export default function useList (
  {
    totalBodyRows,
    totalColumns,
    ariaLabel,
    searchIsCaseSensitive: rawSearchIsCaseSensitive,
    minimumSearchScore,
    readerCanSearch,
    readerCanChangeSearchCaseSensitivity,
  },
) {
  /* Set up DOM refs, including static attribute binding */
  const rootEl = ref(null),
        queryInputEl = ref(null),
        searchIsCaseSensitiveCheckboxEl = ref(null)
  bind({ target: rootEl, keys: { role: 'table', ariaLabel, }})


  // Set up table header
  const   { 0: headerRowGroup } = toMetadata({
          length: 1,
          fromIndexToMetadatum: index => {
            const id = `${loopedIdPrefix}-${index}`,
                  el = ref(null),
                  setEl = newEl => (el.value = newEl),
                  headerRowGroup = { id, el, ref: setEl }

            bind({
              target: el,
              keys: { role: 'rowgroup' }
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

            bind({
              target: el,
              keys: { role: 'row', ariaRowindex: 1 }
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

            bind({
              target: el,
              keys: { role: 'columnheader' }
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

            bind({
              target: el,
              keys: { role: 'rowgroup' }
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

            bind({
              target: el,
              keys: { role: 'row', ariaRowindex: index + 2 } // row indices start at 1, and the first row is the header row. Therefore, +2.
            })

            show({
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

            bind({
              target: el,
              keys: { role: 'cell' }
            })

            return bodyCell
          }
        }),
        bodyCellsByRow = bodyRows.reduce((bodyCellsByRow, _, index) => ({
          ...bodyCellsByRow,
          [index]: bodyCells.slice(index * totalColumns, (index + 1) * totalColumns)
        }), {})

  // Initialize searchable
  const searchablesByIsCaseSensitive = new Map([
          [false, useSearchable([], { ignoreCase: true, returnMatchData: true })],
          [true, useSearchable([], { ignoreCase: false, returnMatchData: true })],
        ]),
        searchable = computed(() => searchablesByIsCaseSensitive.get(searchIsCaseSensitive.value).value),
        searchEffect = () => searchable.value.search(query.value)

  onMounted(() => {
    const candidates = bodyRows.map(({ textContent }) => textContent.value)
    searchablesByIsCaseSensitive.forEach(searchable => searchable.value.setCandidates(candidates))
  })

  // Manage query case sensitivity
  const searchIsCaseSensitive = ref(rawSearchIsCaseSensitive)
  if (readerCanChangeSearchCaseSensitivity) {
    bind({
      target: searchIsCaseSensitiveCheckboxEl,
      keys: { checked: computed(() => searchIsCaseSensitive.value ? 'true' : '') }
    })
    on({
      target: searchIsCaseSensitiveCheckboxEl,
      events: {
        change ({ target: { checked } }) {
          searchIsCaseSensitive.value = checked
        }
      }
    })
  }
  
  // Manage query
  const query = ref('')
  if (readerCanSearch) {
    bind({
      target: queryInputEl,
      keys: { value: query }
    })
    on({
      target: queryInputEl,
      events: {
        input ({ target: { value } }) {
          query.value = value
        }
      }
    })
  }

  watch(
    [searchIsCaseSensitive, query],
    searchEffect
  )

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
    searchIsCaseSensitiveCheckbox: {
      ref: el => (searchIsCaseSensitiveCheckboxEl.value = el),
    },
    query,
    searchIsCaseSensitive,
    searchable,
  }
}

function toMetadata ({ length, fromIndexToMetadatum }) {
  return Array(length).fill().map((_, index) => fromIndexToMetadatum(index))
}
