<template>
  <section class="prose-table prose-table-striped w-full sm:w-auto sm:min-w-2 swiper-no-swiping transition">
    <div v-if="canFilterByQuery">
      <input
        class="filter-query-input inp w-full"
        placeholder="Type to filter..."
        name="Type to filter"
        type="text"
        :value="filterQuery"
        @input="handleFilterQuery"
      />
      <div class="mt-2 flex items-center">
        <input
          class="filter-query-is-case-sensitive-checkbox"
          type="checkbox"
          :checked="filterQueryIsCaseSensitiveRef"
          @change="handleCaseSensitiveChange"
        />
        <label class="filter-query-is-case-sensitive-label flex-1 ml-2">Filter is case sensitive</label>
      </div>
    </div>
    <div
      ref="prose"
      class="contents scrollable p-2px"
      :class="[
        hasMaxHeight ? 'with-max-h' : '',
        canFilterByQuery ? 'mt-4' : '',
      ]"
      tabindex="0"
      :aria-label="ariaLabel"
      @keydown="handleKeydown"
    >
      <div role="grid">
        <slot />
      </div>
    </div>
  </section>
</template>

<script>
import { reactive, ref, computed, onMounted, provide } from '@vue/composition-api'
import { useGrid } from '../utilkeyboardAccessibility'

import { useSymbol } from '../composition'

export default {
  name: 'ProseTable',
  props: {
    hasMaxHeight: {
      type: Boolean,
      default: false,
    },
    canFilterByQuery: {
      type: Boolean,
      default: false,
    },
    filterQueryIsCaseSensitive: {
      type: Boolean,
      default: false,
    },
    ariaLabel: {
      type: String,
      required: true,
    }
  },
  setup(props) {
    const prose = ref(null),
          filterQueryIsCaseSensitiveRef = ref(props.filterQueryIsCaseSensitive),
          filterQuery = ref('')

    function handleCaseSensitiveChange () {
      filterQueryIsCaseSensitiveRef.value = !filterQueryIsCaseSensitiveRef.value
    }

    function handleFilterQuery (evt) {
      filterQuery.value = evt.target.value
    }



    provide(useSymbol('grid', 'filterQuery'), filterQuery)
    provide(useSymbol('grid', 'filterQueryIsCaseSensitive'), filterQueryIsCaseSensitiveRef)

    // TODO: Create dedicated components for each row and cell, and use provide/inject to filter, with enter/leave transitions included

    const handleKeydown = useProseGrid(() => prose.value)

    const focusedCell = reactive({
      row: 0,
      column: 0,
    })

    return {
      prose,
      filterQuery,
      handleFilterQuery,
      filterQueryIsCaseSensitiveRef,
      handleCaseSensitiveChange,
      handleKeydown,
    }
  },
}
</script>
