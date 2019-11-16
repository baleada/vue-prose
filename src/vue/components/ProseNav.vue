<template>
  <nav class="prose-nav">
    <section v-for="(directory, index) in directories" :key="directory.name" :class="[index === 0 ? '' : 'mt-8']">
      <component :is="`h${directory.level + 1}`">{{ directory.name.toUpperCase() }}</component>
      <transition
        v-for="page in directory.pages"
        :key="page.href"
      >
        <nuxt-link
          v-show="frameworks.includes(page.framework)"
          :to="page.href"
        >
          {{ page.title }}
        </nuxt-link>
      </transition>
    </section>
  </nav>
</template>

<script>
import allDirectories from '~/static/json/manifest.json'

export default {
  setup() {
    const frameworks = ['Vue', 'React', 'Svelte', 'agnostic'],
          directories = allDirectories.filter(dir => dir.pages.length > 0)

    // TODO: filter based on framework, with enter/leave transitions

    return {
      directories,
      frameworks
    }
  },
}
</script>
