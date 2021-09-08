<template>
  <aside
    ref="baleada"
    class="baleada-prose-aside"
    :class="[`baleada-prose-aside-${withConfiguredDefaults.type}`, withConfiguredDefaults.classes]"
  >
    <HeroiconsInformationCircle v-if="withConfiguredDefaults.type === 'info'"/>
    <HeroiconsExclamation v-if="withConfiguredDefaults.type === 'warning'"/>
    <HeroiconsLightningBolt v-if="withConfiguredDefaults.type === 'danger'"/>
    <HeroiconsSparkles v-if="withConfiguredDefaults.type === 'success'"/>
    <section class="baleada-prose-contents">
      <slot />
    </section>
  </aside>
</template>

<script setup lang="ts">
// @ts-ignore
import { HeroiconsInformationCircle, HeroiconsExclamation, HeroiconsLightningBolt, HeroiconsSparkles } from '@baleada/vue-heroicons'
import { createGetWithConfiguredDefaults } from '../extracted';

const props = defineProps<{
        type?: 'info' | 'warning' | 'danger' | 'success' | 'none',
        classes?: string,
      }>(),
      withConfiguredDefaults = createGetWithConfiguredDefaults('aside')(props)
</script>
