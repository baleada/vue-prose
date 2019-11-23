<template>
  <nav class="prose-nav">
    <section v-for="(directory, index) in directories" :key="directory.name" :class="[index === 0 ? '' : 'mt-8']">
      <component :is="`h${directory.level + 1}`">{{ directory.name.toUpperCase() }}</component>
      <transition
        v-for="page in directory.pages"
        :key="page.href"
      >
        <nuxt-link
          :to="page.href"
        >
          {{ page.title }}
        </nuxt-link>
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
