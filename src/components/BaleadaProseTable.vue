<template>
  <section
    ref="baleada"
    class="baleada-prose-table"
    :class="[withConfiguredDefaults.classes]"
  >
    <div v-if="withConfiguredDefaults.readerCanSearch">
      <input
        :ref="table.queryInput.ref"
        :placeholder="messages.searchPlaceholder"
        name="Search"
        type="text"
      />
    </div>
    <div v-if="withConfiguredDefaults.readerCanSearch && withConfiguredDefaults.readerCanChangeSearchCaseSensitivity">
      <input
        :ref="table.searchIsCaseSensitiveCheckbox.ref"
        name="Change search case sensitivity"
        type="checkbox"
      />
      <label>
        {{ messages.changeSearchCaseSensitivityLabel }}
      </label>
    </div>
    <section class="baleada-prose-contents">
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

<script setup lang="ts">
import { ref } from 'vue'
import { useTable } from '../composition'
import { createGetWithConfiguredDefaults } from '../extracted'
import { config } from '../state'

const props = defineProps<{
        readerCanSearch?: boolean,
        searchIsCaseSensitive?: boolean,
        minimumSearchScore?: number,
        readerCanChangeSearchCaseSensitivity?: boolean,
        classes?: string,
        totalBodyRows: number,
        totalColumns: number,
        ariaLabel: string,
      }>(),
      withConfiguredDefaults = createGetWithConfiguredDefaults('table')(props),
      baleada = ref(null),
      messages = config.messages.table,
      table = useTable(
        {
          totalBodyRows: withConfiguredDefaults.totalBodyRows,
          totalColumns: withConfiguredDefaults.totalColumns,
          ariaLabel: withConfiguredDefaults.ariaLabel,
          searchIsCaseSensitive: withConfiguredDefaults.searchIsCaseSensitive,
          minimumSearchScore: withConfiguredDefaults.minimumSearchScore,
          readerCanSearch: withConfiguredDefaults.readerCanSearch,
          readerCanChangeSearchCaseSensitivity: withConfiguredDefaults.readerCanChangeSearchCaseSensitivity,
        }
      )
</script>
