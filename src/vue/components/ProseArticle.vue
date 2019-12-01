<template>
  <article
    ref="prose"
    class="baleada-prose-article"
  >
    <section class="contents">
      <slot
        name="before"
        v-bind="{ stats, frontMatter, filePath, fullPath }"
      />
      <slot />
      <slot
        name="after"
        v-bind="{ stats, frontMatter, filePath, fullPath }"
      />
    </section>
  </article>
</template>

<script>
import { ref, computed, watch, onMounted, provide, inject } from '@vue/composition-api'

import { useSymbol } from '../composition'

import scrollToHeading from '../util/scrollToHeading'

export default {
  name: 'ProseArticle',
  setup() {
    /* Track route */
    const fullPath = inject(useSymbol('layout', 'fullPath'))

    /* Scroll to heading */
    const prose = ref(null)
    onMounted(() => {
      scrollToHeading(fullPath.value, { container: prose.value })
    })
    watch(fullPath, () => {
      scrollToHeading(fullPath.value, { container: prose.value })
    }, { lazy: true })

    /* Collect frontMatter and stats from loaders */
    const stats = ref({}),
          setStats = newStats => (stats.value = newStats)
    provide(useSymbol('article', 'setStats'), setStats)
    provide(useSymbol('article', 'stats'), stats)

    const frontMatter = ref({}),
          setFrontMatter = newFrontMatter => (frontMatter.value = newFrontMatter)
    provide(useSymbol('article', 'setFrontMatter'), setFrontMatter)
    provide(useSymbol('article', 'frontMatter'), frontMatter)

    const filePath = ref(''),
          setFilePath = newFilePath => (filePath.value = newFilePath)
    provide(useSymbol('article', 'setFilePath'), setFilePath)
    provide(useSymbol('article', 'filePath'), filePath)

    return {
      prose,
      stats,
      frontMatter,
      filePath,
      fullPath,
    }
  },
}
</script>
