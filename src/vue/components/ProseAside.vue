<template>
  <aside
    ref="prose"
    class="baleada-prose-aside"
    :class="[`baleada-prose-aside-${type}`, classes]"
  >
    <EvaInfo v-if="type === 'info'"/>
    <EvaAlertTriangle v-if="type === 'warning'"/>
    <EvaFlash v-if="type === 'danger'"/>
    <EvaAward v-if="type === 'success'"/>
    <section class="contents">
      <slot />
    </section>
  </aside>
</template>

<script>
import { EvaInfo, EvaAlertTriangle, EvaFlash, EvaAward } from '@baleada/icons/vue'

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
