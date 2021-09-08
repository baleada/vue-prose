<template>
  <section
    ref="baleada"
    class="baleada-prose-list"
    :class="[withConfiguredDefaults.classes]"
  >
    <div v-if="withConfiguredDefaults.readerCanSearch">
      <input
        :ref="list.queryInput.ref"
        :placeholder="messages.searchPlaceholder"
        name="Search by query"
        type="text"
      />
    </div>
    <div v-if="withConfiguredDefaults.readerCanSearch && withConfiguredDefaults.readerCanChangeSearchCaseSensitivity">
      <input
        :ref="list.searchIsCaseSensitiveCheckbox.ref"
        name="Change search case sensitivity"
        type="checkbox"
      />
      <label>
        {{ messages.changeSearchCaseSensitivityLabel }}
      </label>
    </div>
    <section class="baleada-prose-contents">
      <component
        :ref="list.root.ref"
        :is="tag"
      >
        <slot
          v-for="{ id, ref } in list.items"
          :ref="ref"
          :key="id"
          :name="id"
        />
      </component>
    </section>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useList } from '../composition'
import { createGetWithConfiguredDefaults } from '../extracted'
import { config } from '../state'

const props = defineProps<{
        readerCanSearch?: boolean,
        searchIsCaseSensitive?: boolean,
        readerCanChangeSearchCaseSensitivity?: boolean,
        minimumSearchScore?: number,
        classes?: string,
        tag: 'ol' | 'ul',
        totalItems: number,
      }>(),
      withConfiguredDefaults = createGetWithConfiguredDefaults('list')(props),
      baleada = ref(null),
      messages = config.messages.list,
      list = useList(
        {
          totalItems: withConfiguredDefaults.totalItems,
          searchIsCaseSensitive: withConfiguredDefaults.searchIsCaseSensitive,
          minimumSearchScore: withConfiguredDefaults.minimumSearchScore,
          readerCanSearch: withConfiguredDefaults.readerCanSearch,
          readerCanChangeSearchCaseSensitivity: withConfiguredDefaults.readerCanChangeSearchCaseSensitivity,
        }
      )
</script>
