<template>
  <article
    ref="prose"
    class="baleada-prose-article"
    :class="[mergedProps.classes]"
  >
    <slot />
  </article>
</template>

<script>
import { ref, isRef, computed, watch, onMounted, provide, inject } from '@vue/composition-api'

import { useSymbol } from '../composition'

import { mergeProps, scrollToHeading } from '../util'

export default {
  name: 'ProseArticle',
  props: {
    classes: {
      type: String,
      // default: '',
    },
    scrollableContainerGetter: {
      type: Function,
    }
  },
  setup (props) {
    const mergedProps = mergeProps({ props, component: 'article' })

    /* Track route */
    const fullPath = inject(useSymbol('layout', 'fullPath'))

    /* Manage headings */
    const headings = ref([]),
          addHeading = heading => headings.value.push(heading),
          setHeadings = inject(useSymbol('layout', 'setHeadings'))

    provide(useSymbol('article', 'addHeading'), addHeading)
    provide(useSymbol('article', 'headings'), headings)

    watch(headings, () => {
      setHeadings(headings.value)
    })

    /* Scroll to heading */
    const prose = ref(null),
          container = mergedProps.scrollableContainerGetter || (() => prose.value)
          
    onMounted(() => {
      scrollToHeading(fullPath.value, { container })
    })
    watch(fullPath, () => {
      scrollToHeading(fullPath.value, { container })
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
      mergedProps
    }
  },
}
</script>
