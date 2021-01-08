import { ref, computed, onMounted } from 'vue'
import { useBindings, useListeners, useConditionalDisplay } from '@baleada/vue-features/affordances'
import { useSearchable } from '@baleada/vue-composition'
import { loopedIdPrefix } from '../state'

export default function useList (
  {
    totalItems,
    searchIgnoresCase: rawSearchIgnoresCase,
    minimumSearchScore,
    readerCanSearch,
    readerCanChangeSearchCaseSensitivity,
  },
  { searchable: searchableOptions }
) {
  // Set up DOM refs, including static attribute binding
  const rootEl = ref(null),
        queryInputEl = ref(null),
        searchIgnoresCaseCheckboxEl = ref(null)
  useBindings({ target: rootEl, bindings: { role: 'list' }})

  // Set up list item metadata
  const items = Array(totalItems)
    .fill()
    .map((_, index) => {
      const id = `${loopedIdPrefix}-${index}`,
      el = ref(null),
      setEl = newEl => (el.value = newEl),
      textContent = computed(() => el.value.textContent),
      searchResult = computed(() => searchable.value.results.find(({ item }) => item === textContent.value) || null),
      item = { id, ref: setEl, textContent, searchResult }

      useBindings({
        target: el,
        bindings: { role: 'listitem' }
      })

      useConditionalDisplay({
        target: el,
        condition: computed(() => query.value === '' || searchResult.value?.score >= minimumSearchScore)
      })

      return item
    })
  

  // Initialize searchable
  const searchable = useSearchable([], searchableOptions)
  onMounted(() => {
    const candidates = items.map(({ textContent }) => textContent.value)
    searchable.value.setCandidates(candidates)
  })

  // Manage query case sensitivity
  const searchIgnoresCase = ref(rawSearchIgnoresCase)
  if (readerCanChangeSearchCaseSensitivity) {
    useBindings({
      target: searchIgnoresCaseCheckboxEl,
      bindings: { checked: computed(() => searchIgnoresCase.value ? 'true' : '') }
    })
    useListeners({
      target: searchIgnoresCaseCheckboxEl,
      listeners: {
        change ({ target: { checked } }) {
          searchIgnoresCase.value = checked
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
          searchable.value.search(query.value, { ignoreCase: searchIgnoresCase.value, returnMatchData: true })
        }
      }
    })
  }

  // TODO: pagination feature

  return {
    root: {
      ref: el => (rootEl.value = el),
    },
    items,
    queryInput: {
      ref: el => (queryInputEl.value = el),
    },
    searchIgnoresCaseCheckbox: {
      ref: el => (searchIgnoresCaseCheckboxEl.value = el),
    },
    query,
    searchIgnoresCase,
    searchable,
  }
}
