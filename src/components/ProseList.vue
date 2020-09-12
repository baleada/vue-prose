<template>
  <section
    ref="baleada"
    class="baleada-prose-list"
    :class="[mergedProps.classes]"
  >
    <div v-if="mergedProps.readerCanSearch">
      <input
        :ref="list.queryInput.ref"
        :placeholder="messages.searchByQueryPlaceholder"
        name="Search by query"
        type="text"
      />
    </div>
    <div v-if="mergedProps.readerCanSearch && mergedProps.readerCanChangeSearchCaseSensitivity">
      <input
        :ref="list.searchIgnoresQueryCaseCheckbox.ref"
        name="Change search case sensitivity"
        type="checkbox"
      />
      <label>
        {{ messages.changeSearchCaseSensitivityLabel }}
      </label>
    </div>
    <section class="contents">
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

<script>
import { ref } from 'vue'
import { useList } from '../composition'
import { useContext } from '../api'
import { getMergedProps } from '../util'

export default {
  name: 'ProseList',
  props: {
    tag: {
      type: String,
      validator: value => ['ol', 'ul'].includes(value),
    },
    totalItems: {
      type: Number,
      required: true,
    },
    readerCanSearch: {
      // type: Boolean,
      // default: false,
    },
    searchIgnoresQueryCase: {
      // type: Boolean,
      // default: false,
    },
    readerCanChangeSearchCaseSensitivity: {
      // type: Boolean,
      // default: false,
    },
    classes: {
      type: String,
      // default: '',
    },
  },
  setup(props) {
    const baleada = ref(null),
          mergedProps = getMergedProps({ props, component: 'list' })

    // Access messages
    const messages = useContext().messagesByComponent.list

    // Connect UI logic
    const list = useList(
      {
        totalItems: props.totalItems,
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
      list,
      mergedProps,
    }
  },
}
</script>
