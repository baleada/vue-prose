<template>
  <details
    ref="baleada"
    class="baleada-prose-details"
    :class="[mergedProps.classes]"
  >
    <summary v-if="summary">
      <HeroiconsCheveronRight />
      <span>{{ summary }}</span>
    </summary>
    <section class="contents">
      <slot />
    </section>
  </details>
</template>

<script>
import { ref } from '@vue/composition-api'

import { HeroiconsCheveronRight } from '@baleada/vue-icons/heroicons'

import { mergeProps } from '../util'

export default {
  name: 'ProseDetails',
  components: {
    HeroiconsCheveronRight,
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
