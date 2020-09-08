<template>
  <section
    ref="baleada"
    class="baleada-prose-list"
    :class="[mergedProps.classes]"
  >
    <div v-if="mergedProps.readerCanSearch">
      <input
        :ref="list.queryInput.ref"
        :placeholder="messages.list.searchByQueryPlaceholder"
        name="Search by query"
        type="text"
      />
    </div>
    <div v-if="mergedProps.readerCanSearch && mergedProps.readerCanChangeSearchCaseSensitivity">
      <input
        :ref="list.ignoreQueryCaseCheckbox.ref"
        name="Change search case sensitivity"
        type="checkbox"
      />
      <label>
        {{ messages.list.changeSearchCaseSensitivityLabel }}
      </label>
    </div>
    <section class="contents">
      <component
        :ref="list.root.ref"
        :is="tag"
      >
        <slot
          :ref="list.items.ref"
          v-for="{ id } in list.items.metadata"
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
import { toMergedProps } from '../util'

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
          mergedProps = toMergedProps({ props, component: 'list' })

    // Access messages
    const { messagesByComponent } = useContext(),
          messages = messagesByComponent.list

    // Connect UI logic
    const list = useList(
      {
        totalItems: props.totalItems,
        searchIgnoresQueryCase: props.searchIgnoresQueryCase,
        minimumSearchScore: props.minimumSearchScore,
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
