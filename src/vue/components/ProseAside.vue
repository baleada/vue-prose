<template functional>
  <aside
    ref="prose"
    class="baleada-prose-aside"
    :class="[`baleada-prose-aside-${props.type}`, props.classes]"
  >
    <EvaInfo v-if="props.type === 'info'"/>
    <EvaAlertTriangle v-if="props.type === 'warning'"/>
    <EvaFlash v-if="props.type === 'danger'"/>
    <EvaAward v-if="props.type === 'success'"/>
    <section class="contents">
      <slot />
    </section>
  </aside>
</template>

<script>
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
    },
    classes: {
      type: String,
      default: '',
    },
  },
}
</script>
