<template>
  <details
    ref="prose"
    class="baleada-prose-details"
    :class="[mergedProps.classes]"
    @click="handleClick"
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
    const prose = ref(null),
          mergedProps = mergeProps({ props, component: 'details' })

    /* Manage open state */
    // const status = ref('closed'),
    //       open = () => status.value = 'open',
    //       close = () => status.value = 'closed',
    //       handleClick = () => {
    //         switch (status.value) {
    //         case 'open':
    //           close()
    //           break
    //         case 'closed':
    //           open()
    //           break
    //         }
    //         console.log(status.value)
    //       }

    return {
      prose,
      // status,
      // handleClick,
      mergedProps,
    }
  },
}
</script>
