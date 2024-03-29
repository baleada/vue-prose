import { ref, computed, onMounted, watch } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import { bind, on, model, show } from '@baleada/vue-features'
import { useSearchable } from '@baleada/vue-composition'
import { MatchData } from 'fast-fuzzy'

export type List = {
  root: {
    ref: (el: HTMLElement) => void
  },
  items: {
    id: string,
    ref: (el: HTMLElement) => void,
    textContent: ComputedRef<string>,
    searchResult: ComputedRef<MatchData<string>>
  }[],
  queryInput: {
    ref: (el: HTMLInputElement) => void
  },
  searchIsCaseSensitiveCheckbox: {
    ref: (el: HTMLInputElement) => void
  },
  query: Ref<string>,
  searchIsCaseSensitive: Ref<boolean>,
}

export function useList (
  {
    totalItems,
    searchIsCaseSensitive,
    minimumSearchScore,
    readerCanSearch,
    readerCanChangeSearchCaseSensitivity,
  }: {
    totalItems: number,
    searchIsCaseSensitive: boolean,
    minimumSearchScore: number,
    readerCanSearch: boolean,
    readerCanChangeSearchCaseSensitivity: boolean,
  }
): List {
  // Set up DOM refs, including static attribute binding
  const rootEl = ref<HTMLElement>(null),
        queryInputEl = ref<HTMLInputElement>(null),
        searchIsCaseSensitiveCheckboxEl = ref<HTMLInputElement>(null)
  bind(rootEl, { role: 'list' })

  // Set up list item metadata
  const items = Array(totalItems)
    .fill(undefined)
    .map((_, index) => {
      const id = `looped-${index}`,
            el = ref<HTMLElement>(null),
            setEl: List['items'][0]['ref'] = newEl => (el.value = newEl),
            textContent = computed(() => el.value?.textContent || ''),
            searchResult = computed(() => (searchable.value.results as MatchData<string>[]).find(({ item }) => item === textContent.value)),
            item: List['items'][0] = { id, ref: setEl, textContent, searchResult }

      bind(el, { role: 'listitem' })

      show(
        el,
        computed(() => query.value === '' || searchResult.value?.score >= minimumSearchScore)
      )

      return item
    })
  

  // Initialize searchable
  const searchablesByIsCaseSensitive = new Map([
          [false, useSearchable<string>([], { ignoreCase: true, returnMatchData: true })],
          [true, useSearchable<string>([], { ignoreCase: false, returnMatchData: true })],
        ]),
        searchable = computed(() => searchablesByIsCaseSensitive.get(ensuredSearchIsCaseSensitive.value).value),
        searchEffect = () => searchable.value.search(query.value)

  onMounted(() => {
    const candidates = items.map(({ textContent }) => textContent.value)
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
    searchEffect,
  )

  // TODO: pagination feature

  return {
    root: {
      ref: el => rootEl.value = el,
    },
    items,
    queryInput: {
      ref: el => queryInputEl.value = el,
    },
    searchIsCaseSensitiveCheckbox: {
      ref: el => searchIsCaseSensitiveCheckboxEl.value = el,
    },
    query,
    searchIsCaseSensitive: ensuredSearchIsCaseSensitive,
  }
}
