import { ref, computed, onMounted, watch } from 'vue'
import { bind, naiveOn as on, show } from '@baleada/vue-features'
import { useSearchable } from '@baleada/vue-composition'
import { loopedIdPrefix } from '../state'

export default function useList (
  {
    totalItems,
    searchIsCaseSensitive: rawSearchIsCaseSensitive,
    minimumSearchScore,
    readerCanSearch,
    readerCanChangeSearchCaseSensitivity,
  },
) {
  // Set up DOM refs, including static attribute binding
  const rootEl = ref(null),
        queryInputEl = ref(null),
        searchIsCaseSensitiveCheckboxEl = ref(null)
  bind({ target: rootEl, keys: { role: 'list' }})

  // Set up list item metadata
  const items = Array(totalItems)
    .fill()
    .map((_, index) => {
      const id = `${loopedIdPrefix}-${index}`,
      el = ref(null),
      setEl = newEl => (el.value = newEl),
      textContent = computed(() => el.value?.textContent || ''),
      searchResult = computed(() => searchable.value.results.find(({ item }) => item === textContent.value)),
      item = { id, ref: setEl, textContent, searchResult }

      bind({
        target: el,
        keys: { role: 'listitem' }
      })

      show({
        target: el,
        condition: computed(() => query.value === '' || searchResult.value?.score >= minimumSearchScore)
      })

      return item
    })
  

  // Initialize searchable
  const searchablesByIsCaseSensitive = new Map([
          [false, useSearchable([], { ignoreCase: true, returnMatchData: true })],
          [true, useSearchable([], { ignoreCase: false, returnMatchData: true })],
        ]),
        searchable = computed(() => searchablesByIsCaseSensitive.get(searchIsCaseSensitive.value).value),
        searchEffect = () => searchable.value.search(query.value)

  onMounted(() => {
    const candidates = items.map(({ textContent }) => textContent.value)
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
    searchEffect,
  )

  // TODO: pagination feature

  return {
    root: {
      ref: el => (rootEl.value = el),
    },
    items,
    queryInput: {
      ref: el => (queryInputEl.value = el),
    },
    searchIsCaseSensitiveCheckbox: {
      ref: el => (searchIsCaseSensitiveCheckboxEl.value = el),
    },
    query,
    searchIsCaseSensitive,
  }
}
