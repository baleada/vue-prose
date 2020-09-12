<template>
  <section
    ref="baleada"
    class="baleada-prose-table"
    :class="[mergedProps.classes]"
  >
    <div v-if="mergedProps.readerCanSearch">
      <input
        :ref="table.queryInput.ref"
        :placeholder="messages.searchByQueryPlaceholder"
        name="Search by query"
        type="text"
      />
    </div>
    <div v-if="mergedProps.readerCanSearch && mergedProps.readerCanChangeSearchCaseSensitivity">
      <input
        :ref="table.searchIgnoresQueryCaseCheckbox.ref"
        name="Change search case sensitivity"
        type="checkbox"
      />
      <label>
        {{ messages.changeSearchCaseSensitivityLabel }}
      </label>
    </div>
    <section>
      <div
        :ref="table.root.ref"
      >
        <div
          :ref="table.header.rowGroup.ref"
        >
          <div
            :ref="table.header.row.ref"
          >
            <slot
              v-for="{ id, ref } in table.header.cells"
              :ref="ref"
              :key="id"
              :name="`${table.header.rowGroup.id}-${table.header.row.id}-${id}`"
            />
          </div>
        </div>
        <div
          :ref="table.body.rowGroup.ref"
        >
          <div
            v-for="({ id: rowId, ref: rowRef }, rowIndex) in table.body.rows"
            :ref="rowRef"
            :key="rowId"
          >
            <slot
              v-for="{ id: cellId, ref: cellRef } in table.body.cellsByRow[rowIndex]"
              :ref="cellRef"
              :key="cellId"
              :name="`${table.body.rowGroup.id}-${rowId}-${cellId}`"
            />
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import { ref } from 'vue'
import { useTable } from '../composition'
import { useContext } from '../api'
import { getMergedProps } from '../util'

export default {
  name: 'ProseTable',
  props: {
    totalBodyRows: {
      type: Number,
      required: true,
    },
    totalColumns: {
      type: Number,
      required: true,
    },
    readerCanSearchByQuery: {
      // type: Boolean,
      // default: false,
    },
    searchIgnoresQueryCase: {
      // type: Boolean,
      // default: false,
    },
    minimumSearchScore: {
      type: Number,
      // default: 1,
    },
    readerCanChangeSearchCaseSensitivity: {
      // type: Boolean,
      // default: false,
    },
    classes: {
      type: String,
      // default: '',
    },
    ariaLabel: {
      type: String,
      required: true, // TODO: provide warning/error tooling for markdown-only users
    },
  },
  setup(props) {
    const baleada = ref(null),
          mergedProps = getMergedProps({ props, component: 'table' })

    // Access messages
    const messages = useContext().messagesByComponent.table

    // Connect UI logic
    const table = useTable(
      {
        totalBodyRows: props.totalBodyRows,
        totalColumns: props.totalColumns,
        ariaLabel: props.ariaLabel,
        searchIgnoresQueryCase: mergedProps.searchIgnoresQueryCase,
        minimumSearchScore: mergedProps.minimumSearchScore,
        readerCanSearch: mergedProps.readerCanSearch,
        readerCanChangeSearchCaseSensitivity: mergedProps.readerCanChangeSearchCaseSensitivity,
      },
      {}
    )

    return {
      baleada,
      messages,
      table,
      mergedProps,
    }
  },
}
</script>
