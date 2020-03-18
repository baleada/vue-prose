<template>
  <details
    ref="baleada"
    class="baleada-prose-details"
    :class="[mergedProps.classes]"
  >
    <summary v-if="summary">
      <EvaChevronRight />
      <span>{{ summary }}</span>
    </summary>
    <section class="contents">
      <slot />
    </section>
  </details>
</template>

<script>
import { ref } from '@vue/composition-api'

import { EvaChevronRight } from '@baleada/icons/vue'

import { mergeProps } from '../util'

export default {
  name: 'ProseDetails',
  components: {
    EvaChevronRight,
  },
  props: {
    summary: {
      type: String,
      // default: ''
    },
    classes: {
      type: String,
      // default: '',
    },
  },
  setup (props) {
    const baleada = ref(null),
          mergedProps = mergeProps({ props, component: 'details' })

    return {
      baleada,
      mergedProps,
    }
  },
}
</script>
