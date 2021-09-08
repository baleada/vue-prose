<template>
  <section
    class="baleada-prose-section"
    :class="[withConfiguredDefaults.classes]"
  >
    <section class="baleada-prose-contents">
      <slot />
    </section>
  </section>
</template>

<script setup lang="ts">
import { createGetWithConfiguredDefaults } from '../extracted'

const props = defineProps<{
        classes?: string
      }>(),
      withConfiguredDefaults = createGetWithConfiguredDefaults('section')(props)
</script>
