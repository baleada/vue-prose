<template>
  <section
    ref="baleada"
    class="baleada-prose-list"
    :class="[mergedProps.classes]"
  >
    <div v-if="mergedProps.readerCanSearch">
      <input
        :ref="list.queryInput.ref"
        :placeholder="messages.searchPlaceholder"
        name="Search by query"
        type="text"
      />
    </div>
    <div v-if="mergedProps.readerCanSearch && mergedProps.readerCanChangeSearchCaseSensitivity">
      <input
        :ref="list.searchIgnoresCaseCheckbox.ref"
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

<script>
import { ref } from 'vue'
import { useList } from '../composition'
import { useContext } from '../composition'
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
    searchIgnoresCase: {
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
        searchIgnoresCase: mergedProps.value.searchIgnoresCase,
        minimumSearchScore: mergedProps.value.minimumSearchScore,
        readerCanSearch: mergedProps.value.readerCanSearch,
        readerCanChangeSearchCaseSensitivity: mergedProps.value.readerCanChangeSearchCaseSensitivity,
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
