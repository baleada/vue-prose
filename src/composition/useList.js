import { ref, computed, onMounted } from 'vue'
import { useBindings, useListeners, useConditionalDisplay } from '@baleada/vue-features/util'
import { useSearchable } from '@baleada/vue-composition'
import { loopedIdPrefix } from '../state'

export default function useList ({ totalItems, searchIgnoresQueryCase: rawSearchIgnoresQueryCase, minimumSearchScore }, { searchable: searchableOptions }) {
  /* Set up DOM refs, including static attribute binding */
  const rootEl = ref(null),
        queryInputEl = ref(null),
        searchIgnoresQueryCaseCheckboxEl = ref(null)
  useBindings({ target: rootEl, bindings: { role: 'list' }})

  // Set up list item metadata
  const itemEls = ref([]), // When attached to the element with v-for, this will become an array of DOM elements
        items = Array(totalItems)
          .fill()
          .map((_, index) => {
            const id = `${loopedIdPrefix}-${index}`,
            el = computed(() => itemEls.value[index]),
            textContent = computed(() => el.value.textContent),
            searchResult = computed(() => searchable.value.results.find(({ item }) => item === textContent.value) || null),
            item = { id, el, searchResult }

            useBindings({
              target: el,
              bindings: { role: 'listitem' }
            })

            useConditionalDisplay({
              target: el,
              condition: computed(() => query.value === '' || searchResult.value?.score > minimumSearchScore)
            })

            return item
          })

  /* Initialize searchable */
  let searchable
  onMounted(() => {
    const candidates = items.map(({ textContent }) => textContent.value)
    searchable = useSearchable(candidates, searchableOptions)
  })

  /* Manage query case sensitivity */
  const searchIgnoresQueryCase = ref(rawSearchIgnoresQueryCase)
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
    items: {
      metadata: items,
      ref: el => (itemEls.value = [...itemEls.value, el]),
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
