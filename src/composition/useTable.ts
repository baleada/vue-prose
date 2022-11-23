import { ref, computed, onMounted, watch } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import { bind, on, model, show } from '@baleada/vue-features'
import { useSearchable } from '@baleada/vue-composition'
import { MatchData } from 'fast-fuzzy'

export type Table = {
  root: {
    ref: (el: HTMLElement) => void
  },
  header: {
    rowGroup: {
      id: string,
      el: Ref<HTMLElement>,
      ref: (el: HTMLElement) => void,
    },
    row: {
      id: string,
      el: Ref<HTMLElement>,
      ref: (el: HTMLElement) => void,
    },
    cells: {
      id: string,
      el: Ref<HTMLElement>,
      ref: (el: HTMLElement) => void,
    }[],
  },
  body: {
    rowGroup: {
      id: string,
      el: Ref<HTMLElement>,
      ref: (el: HTMLElement) => void,
    },
    rows: {
      id: string,
      el: Ref<HTMLElement>,
      ref: (el: HTMLElement) => void,
      textContent: ComputedRef<string>,
      searchResult: ComputedRef<MatchData<string>>,
    }[],
    cellsByRow: {
      [row: number]: {
        id: string,
        el: Ref<HTMLElement>,
        ref: (el: HTMLElement) => void,
      }[]
    },
  },
  queryInput: {
    ref: (el: HTMLInputElement) => void
  },
  searchIsCaseSensitiveCheckbox: {
    ref: (el: HTMLInputElement) => void
  },
  query: Ref<string>,
  searchIsCaseSensitive: Ref<boolean>,
}

export function useTable (
  {
    totalBodyRows,
    totalColumns,
    ariaLabel,
    searchIsCaseSensitive,
    minimumSearchScore,
    readerCanSearch,
    readerCanChangeSearchCaseSensitivity,
  }: {
    totalBodyRows: number,
    totalColumns: number,
    ariaLabel: string,
    searchIsCaseSensitive: boolean,
    minimumSearchScore: number,
    readerCanSearch: boolean,
    readerCanChangeSearchCaseSensitivity: boolean,
  }
): Table {
  // Set up DOM refs, including static attribute binding
  const rootEl = ref<HTMLElement>(null),
        queryInputEl = ref<HTMLInputElement>(null),
        searchIsCaseSensitiveCheckboxEl = ref<HTMLInputElement>(null)
  bind(rootEl, { role: 'table', ariaLabel, })


  // Set up table header
  const   { 0: headerRowGroup } = toMetadata<'header', 'rowGroup'>({
          length: 1,
          fromIndexToMetadatum: index => {
            const id = `looped-${index}`,
                  el = ref<HTMLElement>(null),
                  setEl: Table['header']['rowGroup']['ref'] = newEl => (el.value = newEl),
                  headerRowGroup: Table['header']['rowGroup'] = { id, el, ref: setEl }

            bind(el, { role: 'rowgroup' })

            return headerRowGroup
          }
        }),        
        { 0: headerRow } = toMetadata<'header', 'row'>({
          length: 1,
          fromIndexToMetadatum: index => {
            const id = `looped-${index}`,
                  el = ref<HTMLElement>(null),
                  setEl: Table['header']['row']['ref'] = newEl => (el.value = newEl),
                  headerRow: Table['header']['row'] = { id, el, ref: setEl }

            bind(el, { role: 'row', ariaRowindex: 1 })

            return headerRow
          }
        }),
        headerCells = toMetadata<'header', 'cells'>({
          length: totalColumns,
          fromIndexToMetadatum: index => {
            const id = `looped-${index}`,
                  el = ref<HTMLElement>(null),
                  setEl: Table['header']['cells'][0]['ref'] = newEl => (el.value = newEl),
                  headerCell: Table['header']['cells'][0] = { id, el, ref: setEl }

            bind(el, { role: 'columnheader' })

            return headerCell
          }
        })

        
  // Set up table body
  const { 0: bodyRowGroup } = toMetadata<'body', 'rowGroup'>({
          length: 1,
          fromIndexToMetadatum: index => {
            const id = `looped-1`,
                  el = ref<HTMLElement>(null),
                  setEl: Table['body']['rowGroup']['ref'] = newEl => (el.value = newEl),
                  bodyRowGroup: Table['body']['rowGroup'] = { id, el, ref: setEl }

            bind(el, { role: 'rowgroup' })

            return bodyRowGroup
          }
        }),
        bodyRows = toMetadata<'body', 'rows'>({
          length: totalBodyRows,
          fromIndexToMetadatum: index => {
            const id = `looped-${index}`,
                  el = ref<HTMLElement>(null),
                  setEl: Table['body']['rows'][0]['ref'] = newEl => (el.value = newEl),
                  textContent = computed(() => el.value.textContent),
                  searchResult = computed(() => (searchable.value.results as MatchData<string>[]).find(({ item }) => item === textContent.value) || null),
                  bodyRow: Table['body']['rows'][0] = { id, el, textContent, searchResult, ref: setEl }

            bind(
              el,
              { role: 'row', ariaRowindex: index + 2 } // row indices start at 1, and the first row is the header row. Therefore, +2.
            )

            show(
              el,
              computed(() => query.value === '' || searchResult.value?.score >= minimumSearchScore)
            )

            return bodyRow
          }
        }),
        bodyCells = toMetadata<'body', 'cellsByRow'>({
          length: totalBodyRows * totalColumns,
          fromIndexToMetadatum: index => {
            const indexInRow = index % totalColumns,
                  id = `looped-${indexInRow}`,
                  el = ref<HTMLElement>(null),
                  setEl: Table['body']['cellsByRow'][0][0]['ref'] = newEl => (el.value = newEl),
                  bodyCell: Table['body']['cellsByRow'][0][0] = { id, el, ref: setEl }

            bind(
              el,
              { role: 'cell' }
            )

            return bodyCell
          }
        }),
        bodyCellsByRow: Table['body']['cellsByRow'] = bodyRows.reduce((bodyCellsByRow, _, index) => {
          bodyCellsByRow[index] = bodyCells.slice(index * totalColumns, (index + 1) * totalColumns)
          return bodyCellsByRow
        }, {})


  // Initialize searchable
  const searchablesByIsCaseSensitive = new Map([
          [false, useSearchable<string>([], { ignoreCase: true, returnMatchData: true })],
          [true, useSearchable<string>([], { ignoreCase: false, returnMatchData: true })],
        ]),
        searchable = computed(() => searchablesByIsCaseSensitive.get(ensuredSearchIsCaseSensitive.value).value),
        searchEffect = () => searchable.value.search(query.value)

  onMounted(() => {
    const candidates = bodyRows.map(({ textContent }) => textContent.value)
    searchablesByIsCaseSensitive.forEach(searchable => searchable.value.setCandidates(candidates))
  })


  // Manage query case sensitivity
  const ensuredSearchIsCaseSensitive = ref(searchIsCaseSensitive)
  if (readerCanChangeSearchCaseSensitivity) {
    model(
      searchIsCaseSensitiveCheckboxEl,
      ensuredSearchIsCaseSensitive,
      {
        key: 'checked',
        event: 'change',
        toValue: event => (event.target as HTMLInputElement).checked,
      }
    )
  }
  
  
  // Manage query
  const query = ref('')
  if (readerCanSearch) {
    bind(
      queryInputEl,
      { value: query }
    )
    on(
      queryInputEl,
      {
        input (event) {
          query.value = (event.target as HTMLInputElement).value
        }
      }
    )
  }

  watch(
    [ensuredSearchIsCaseSensitive, query],
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
    searchIsCaseSensitive: ensuredSearchIsCaseSensitive,
  }
}

type Metadatum<Section extends 'header' | 'body', Type extends keyof Table[Section]> = 
  Section extends 'header'
    ? Type extends 'rowGroup' 
      ? Table['header']['rowGroup'] 
      : Type extends 'row' 
        ? Table['header']['row'] 
        : Type extends 'cells' 
          ? Table['header']['cells'][0] 
          : never
    : Type extends 'rowGroup'
      ? Table['body']['rowGroup']
      : Type extends 'rows'
        ? Table['body']['rows'][0]
        : Type extends 'cellsByRow'
          ? Table['body']['cellsByRow'][0][0]
          : never


function toMetadata<Section extends 'header' | 'body', Type extends keyof Table[Section]> ({ length, fromIndexToMetadatum }: { length: number, fromIndexToMetadatum: (index: number) => Metadatum<Section, Type> }) {
  return Array(length).fill(undefined).map((_, index) => fromIndexToMetadatum(index))
}
