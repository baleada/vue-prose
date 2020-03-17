<template>
  <section
    ref="baleada"
    class="baleada-prose-list"
    :class="[mergedProps.classes]"
  >
    <div v-if="mergedProps.canFilterByQuery">
      <input
        :placeholder="messages.list.filterByQueryPlaceholder"
        name="Filter by query"
        type="text"
        :value="filterQuery"
        @input="handleFilterQueryInput"
      />
    </div>
    <div v-if="mergedProps.canFilterByQuery && mergedProps.canChangeFilterCaseSensitivity">
      <input
        name="Change filter case sensitivity"
        type="checkbox"
        :checked="computedFilterIsCaseSensitive"
        @change="handleCaseSensitivityChange"
      />
      <label>
        {{ messages.list.changeFilterCaseSensitivityLabel }}
      </label>
    </div>
    <section class="contents">
      <slot />
    </section>
  </section>
</template>

<script>
import { ref, watch, computed, provide, inject } from '@vue/composition-api'

import { useSymbol } from '../composition'

import { mergeProps } from '../util'

export default {
  name: 'ProseList',
  props: {
    canFilterByQuery: {
      // type: Boolean,
      // default: false,
    },
    filterIsCaseSensitive: {
      // type: Boolean,
      // default: false,
    },
    canChangeFilterCaseSensitivity: {
      // type: Boolean,
      // default: false,
    },
    classes: {
      type: String,
      // default: '',
    },
    listItems: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const baleada = ref(null),
          mergedProps = mergeProps({ props, component: 'list' })

    /* Get messages */
    const messages = inject(useSymbol('layout', 'messages'))

    /* Filtering */
    provide(useSymbol('list', 'canFilterByQuery'), mergedProps.canFilterByQuery)

    const filterQuery = mergedProps.canFilterByQuery ? ref('') : {},
          computedFilterIsCaseSensitive = mergedProps.canFilterByQuery ? ref(mergedProps.filterIsCaseSensitive) : {},
          handleCaseSensitivityChange = () => (computedFilterIsCaseSensitive.value = !computedFilterIsCaseSensitive.value),
          handleFilterQueryInput = evt => (filterQuery.value = evt.target.value)
    let filterableListItems, setListItemIsFiltered
    if (mergedProps.canFilterByQuery) {
      filterableListItems = ref(
        props.listItems.map(({ listItem }) => ({ listItem, isFiltered: false }))
      ),
      setListItemIsFiltered = ({ listItem, isFiltered }) => (filterableListItems.value[listItem].isFiltered = isFiltered)

      provide(useSymbol('list', 'filterQuery'), filterQuery)
      provide(useSymbol('list', 'filterIsCaseSensitive'), computedFilterIsCaseSensitive)
      provide(useSymbol('list', 'setListItemIsFiltered'), setListItemIsFiltered)
    }

    // TODO: pagination feature

    return {
      baleada,
      messages,
      filterQuery,
      handleFilterQueryInput,
      computedFilterIsCaseSensitive,
      handleCaseSensitivityChange,
      mergedProps,
    }
  },
}
</script>
