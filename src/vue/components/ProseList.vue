<template>
  <section
    ref="prose"
    class="baleada-prose-list"
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
      {{ messages.list.changeFilterCaseSensitivityLabel }}
    </label>
    <section class="contents">
      <slot />
    </section>
  </section>
</template>

<script>
import { ref, watch, computed, provide, inject } from '@vue/composition-api'

import { useSymbol } from '../composition'

export default {
  name: 'ProseList',
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
    listItems: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const prose = ref(null)

    /* Get messages */
    const messages = inject(useSymbol('layout', 'messages'))

    /* Filtering */
    provide(useSymbol('list', 'canFilterByQuery'), props.canFilterByQuery)

    const filterQuery = props.canFilterByQuery ? ref('') : {},
          computedFilterIsCaseSensitive = props.canFilterByQuery ? ref(props.filterIsCaseSensitive) : {},
          handleCaseSensitivityChange = () => (computedFilterIsCaseSensitive.value = !computedFilterIsCaseSensitive.value),
          handleFilterQueryInput = evt => (filterQuery.value = evt.target.value)
    let handleCaseSensitivityChange, handleFilterQueryInput, filterableListItems, setListItemIsFiltered
    if (props.canFilterByQuery) {
      filterableListItems = ref(
        props.listItems.map(({ listItem }) => ({ listItem, isFiltered: false }))
      ),
      setListItemIsFiltered = ({ listItem, isFiltered }) => (filterableListItems.value[listItem].isFiltered = isFiltered)

      provide(useSymbol('list', 'filterQuery'), filterQuery)
      provide(useSymbol('list', 'filterIsCaseSensitive'), computedFilterIsCaseSensitive)
      provide(useSymbol('list', 'setListItemIsFiltered'), setListItemIsFiltered)
    }

    return {
      prose,
      messages,
      filterQuery,
      handleFilterQueryInput,
      computedFilterIsCaseSensitive,
      handleCaseSensitivityChange,
    }
  },
}
</script>
