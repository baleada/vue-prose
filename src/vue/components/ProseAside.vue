<template>
  <aside
    ref="prose"
    class="baleada-prose-aside"
    :class="[`baleada-prose-aside-${type}`]"
  >
    <EvaInfo v-if="type === 'info'"/>
    <EvaAlertTriangle v-if="type === 'warning'"/>
    <EvaFlash v-if="type === 'danger'"/>
    <EvaAward v-if="type === 'success'"/>
    <section class="contents">
      <slot></slot>
    </section>
  </aside>
</template>

<script>
import { ref } from '@vue/composition-api'

import { EvaInfo } from '@baleada/icons/vue'
import { EvaAlertTriangle } from '@baleada/icons/vue'
import { EvaFlash } from '@baleada/icons/vue'
import { EvaAward } from '@baleada/icons/vue'

export default {
  name: 'ProseAside',
  components: {
    EvaInfo,
    EvaAlertTriangle,
    EvaFlash,
    EvaAward,
  },
  props: {
    type: {
      type: String,
      default: 'info',
      validator: (value) => {
        return ['info', 'warning', 'danger', 'success'].indexOf(value) !== -1;
      }
    }
  },
  setup() {
    const prose = ref(null)

    return {
      prose
    }
  },
}
</script>
