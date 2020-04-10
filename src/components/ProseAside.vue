<template>
  <aside
    ref="baleada"
    class="baleada-prose-aside"
    :class="[`baleada-prose-aside-${mergedProps.type}`, mergedProps.classes]"
  >
    <HeroiconsInformationCircle v-if="mergedProps.type === 'info'"/>
    <HeroiconsExclamation v-if="mergedProps.type === 'warning'"/>
    <HeroiconsLightningBolt v-if="mergedProps.type === 'danger'"/>
    <HeroiconsSparkles v-if="mergedProps.type === 'success'"/>
    <section class="contents">
      <slot />
    </section>
  </aside>
</template>

<script>
import { HeroiconsInformationCircle, HeroiconsExclamation, HeroiconsLightningBolt, HeroiconsSparkles } from '@baleada/vue-icons/heroicons'

import { mergeProps } from '../util'

export default {
  name: 'ProseAside',
  components: {
    HeroiconsInformationCircle,
    HeroiconsExclamation,
    HeroiconsLightningBolt,
    HeroiconsSparkles,
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
