<template>
  <details
    ref="baleada"
    class="baleada-prose-details"
    :class="[mergedProps.classes]"
  >
    <summary v-if="summary">
      <HeroiconsChevronRight />
      <span>{{ summary }}</span>
    </summary>
    <section class="contents">
      <slot />
    </section>
  </details>
</template>

<script>
import { ref } from 'vue'
import { HeroiconsChevronRight } from '@baleada/vue-heroicons'
import { toMergedProps } from '../util'

export default {
  name: 'ProseDetails',
  components: {
    HeroiconsChevronRight,
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
          mergedProps = toMergedProps({ props, component: 'details' })

    return {
      baleada,
      mergedProps,
    }
  },
}
</script>
