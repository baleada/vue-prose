<template>
  <section
    ref="baleada"
    class="baleada-prose-table"
    :class="[mergedProps.classes]"
  >
    <div v-if="mergedProps.readerCanSearch">
      <input
        :ref="table.queryInput.ref"
        :placeholder="messages.table.searchByQueryPlaceholder"
        name="Search by query"
        type="text"
      />
    </div>
    <div v-if="mergedProps.readerCanSearch && mergedProps.readerCanChangeSearchCaseSensitivity">
      <input
        :ref="table.ignoreQueryCaseCheckbox.ref"
        name="Change search case sensitivity"
        type="checkbox"
      />
      <label>
        {{ messages.table.changeSearchCaseSensitivityLabel }}
      </label>
    </div>
    <section
      class="contents"
      :aria-label="ariaLabel"
      @keydown="handleKeydown"
      @focus="handleFocus"
      ref="contents"
    >
      <div
        :ref="table.root.ref"
      >
        <!-- Table header -->
        <div
          :ref="table.header.rowGroup.ref"
        >
          <div
            :ref="table.header.row.ref"
          >
            <slot
              :ref="table.header.row.metadata.cells.ref"
              v-for="{ id: cellId } in table.header.row.metadata.cells.metadata"
              :key="cellId"
              :name="`${table.header.rowGroup.metadata.id}-${table.header.row.metadata.id}-${cellId}`"
            />
          </div>
        </div>
        <!-- Table body -->
        <div
          :ref="table.body.rowGroup.ref"
        >
          <!-- Rows -->
          <div
            :ref="table.body.rows.ref"
            v-for="{ id: rowId, cells, searchResult } in table.body.rows.metadata"
            :key="rowId"
            v-show="table.query === '' || searchResult.score > mergedProps.minimumSearchScore"
          >
            <!-- Cells -->
            <slot
              :ref="cells.ref"
              v-for="{ id: cellId } in cells.metadata"
              :key="cellId"
              :name="`${table.body.rowGroup.metadata.id}-${rowId}-${cellId}`"
              :query="table.query"
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
import { toMergedProps } from '../util'

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
          mergedProps = toMergedProps({ props, component: 'table' })

    // Access messages
    const { messagesByComponent } = useContext(),
          messages = messagesByComponent.table

    // Connect UI logic
    const table = useTable(
      {
        totalBodyRows: props.totalBodyRows,
        totalColumns: props.totalColumns,
        ariaLabel: props.ariaLabel,
        searchIgnoresQueryCase: props.searchIgnoresQueryCase,
        minimumSearchScore: props.minimumSearchScore,
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
