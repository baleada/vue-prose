<template>
  <aside
    ref="baleada"
    class="baleada-prose-aside"
    :class="[`baleada-prose-aside-${mergedProps.type}`, mergedProps.classes]"
  >
    <EvaInfo v-if="mergedProps.type === 'info'"/>
    <EvaAlertTriangle v-if="mergedProps.type === 'warning'"/>
    <EvaFlash v-if="mergedProps.type === 'danger'"/>
    <EvaAward v-if="mergedProps.type === 'success'"/>
    <section class="contents">
      <slot />
    </section>
  </aside>
</template>

<script>
import EvaInfo from '@baleada/icons-vue/lib/EvaInfo'
import EvaAlertTriangle from '@baleada/icons-vue/lib/EvaAlertTriangle'
import EvaFlash from '@baleada/icons-vue/lib/EvaFlash'
import EvaAward from '@baleada/icons-vue/lib/EvaAward'

import { mergeProps } from '../util'

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
      // default: 'info',
      validator: value => ['info', 'warning', 'danger', 'success', 'simple'].includes(value)
    },
    classes: {
      type: String,
      // default: '',
    },
  },
  setup (props) {
    const mergedProps = mergeProps({ props, component: 'aside' })

    return {
      mergedProps
    }
  }
}
</script>
