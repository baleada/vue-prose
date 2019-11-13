<template lang="html">
  <section class="prose-table prose-table-striped w-full sm:w-auto sm:min-w-2 swiper-no-swiping transition">
    <div v-if="isTypeToFilterable">
      <input
        class="filter-input inp w-full"
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
          :checked="reactiveFilterQueryIsCaseSensitive"
          @change="handleCaseSensitiveChange"
        />
        <label class="filter-query-is-case-sensitive-label flex-1 ml-2">Filter is case sensitive</label>
      </div>
    </div>
    <div
      ref="prose"
      class="contents scrollable p-2px"
      :class="[
        hasMaxH ? 'max-h-2/3-screen' : '',
        isTypeToFilterable ? 'mt-4' : '',
      ]"
      tabindex="0"
      :aria-label="ariaLabel"
      @keydown="handleKeydown"
    >
      <slot />
    </div>
  </section>
</template>

<script>
import { ref, computed } from '@vue/composition-api'
import { useGrid } from '~/assets/js/keyboardAccessibility'

export default {
  name: 'ProseTable',
  props: {
    hasMaxH: {
      type: Boolean,
      default: false,
    },
    isTypeToFilterable: {
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
          getRows = grid => {
            const body = grid.querySelector('[role="rowgroup"]:last-child'),
                  nodes = body.querySelectorAll('[role="row"]'),
                  rows = []
            nodes.forEach(node => rows.push({ node, text: getRowText(node) }))
            return rows
          },
          getRowText = node => {
            const cells = node.querySelectorAll('[role="gridcell"]')
            let text = ''
            cells.forEach(cell => text += cell.textContent)
            return text
          },
          rows = computed(() => {
            return prose.value
              ? getRows(prose.value.querySelector('[role="grid"]'))
              : []
          }),
          reactiveFilterQueryIsCaseSensitive = ref(props.filterQueryIsCaseSensitive),
          filterQuery = ref('')


    function handleCaseSensitiveChange () {
      reactiveFilterQueryIsCaseSensitive.value = !reactiveFilterQueryIsCaseSensitive.value
      handleFilterQuery()
    }

    // TODO: Create dedicated components for each row and cell, and use props to filter, with enter/leave transitions included
    function handleFilterQuery (evt) {
      if (evt) {
        filterQuery.value = evt.target.value
      }

      if (!filterQuery.value) {
        rows.value.forEach(({ node }) => node.style.display = 'table-row')
      } else {
        rows.value
          .filter(({ text }) => {
            return reactiveFilterQueryIsCaseSensitive.value
              ? !text.includes(filterQuery.value)
              : !text.toLowerCase().includes(filterQuery.value.toLowerCase())
          })
          .forEach(({ node }) => node.style.display = 'none')

        rows.value
          .filter(({ text }) => {
            return reactiveFilterQueryIsCaseSensitive.value
              ? text.includes(filterQuery.value)
              : text.toLowerCase().includes(filterQuery.value.toLowerCase())
          })
          .forEach(({ node }) => node.style.display = 'table-row')
      }
    }

    // TODO: use props/refs instead of DOM traversal to apply focus, so that filtered elements are not focusable
    const handleKeydown = useGrid(() => prose.value)

    return {
      prose,
      filterQuery,
      handleFilterQuery,
      reactiveFilterQueryIsCaseSensitive,
      handleCaseSensitiveChange,
      handleKeydown,
    }
  },
}
</script>
