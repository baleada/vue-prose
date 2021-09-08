<template>
  <details
    ref="baleada"
    class="baleada-prose-details"
    :class="[withConfiguredDefaults.classes]"
  >
    <summary v-if="withConfiguredDefaults.summary">
      <HeroiconsChevronRight />
      <span>{{ withConfiguredDefaults.summary }}</span>
    </summary>
    <section class="baleada-prose-contents">
      <slot />
    </section>
  </details>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// @ts-ignore
import { HeroiconsChevronRight } from '@baleada/vue-heroicons'
import { createGetWithConfiguredDefaults } from '../extracted'

const props = defineProps<{
        classes?: string,
        summary: string,
      }>(),
      withConfiguredDefaults = createGetWithConfiguredDefaults('details')(props),
      baleada = ref(null)
</script>
