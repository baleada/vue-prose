<template>
  <nav class="baleada-prose-nav">
    <section
      v-for="(directory, index) in directories"
      :key="directory.name"
    >
      <component :is="`h${directory.level + 1}`">{{ directory.name.toUpperCase() }}</component>
      <transition
        name="baleada-prose-nav"
        v-for="page in directory.pages"
        :key="page.href"
      >
        <!-- TODO: review coupling with nuxt -->
        <NuxtLink
          :to="page.href"
        >
          {{ page.title }}
        </NuxtLink>
      </transition>
    </section>
  </nav>
</template>

<script>
import { inject } from '@vue/composition-api'

import { useSymbol } from '../composition'

export default {
  name: 'ProseNav',
  setup() {
    const manifest = inject(useSymbol('layout', 'manifest')),
          directories = manifest.filter(dir => dir.pages.length > 0)

    // TODO: filter based on metadata, with enter/leave transitions

    return {
      directories,
    }
  },
}
</script>
