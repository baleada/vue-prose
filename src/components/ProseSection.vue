<template>
  <section
    class="baleada-prose-section"
    :class="[mergedProps.classes]"
  >
    <section class="contents">
      <slot />
    </section>
  </section>
</template>

<script>
import { toMergedProps } from '../util'

export default {
  name: 'ProseSection',
  props: {
    classes: {
      type: String,
      // default: '',
    },
  },
  setup (props) {
    const mergedProps = toMergedProps({ props, component: 'section' })

    return {
      mergedProps,
    }
  }
}
</script>
