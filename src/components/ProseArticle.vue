<template>
  <article
    ref="baleada"
    class="baleada-prose-article"
    :class="[mergedProps.classes]"
  >
    <slot />
  </article>
</template>

<script>
import { ref, isRef, computed, watch, onMounted, provide, inject } from 'vue'

import { useSymbol } from '../symbols'

import { mergeProps, scrollToHeading } from '../util'

export default {
  name: 'ProseArticle',
  props: {
    classes: {
      type: String,
      // default: '',
    },
    getScrollableContainer: {
      type: Function,
    }
  },
  setup (props) {
    const mergedProps = mergeProps({ props, component: 'article' })

    /* Track route */
    const fullPath = inject(useSymbol('context', 'fullPath'))

    /* Manage headings */
    const headings = ref([]),
          layoutHeadings = inject(useSymbol('context', 'headings'))
          
    provide(useSymbol('article', 'headings'), headings)

    watch(headings, () => {
      layoutHeadings.value = headings.value
    })

    /* Scroll to heading */
    const baleada = ref(null),
          container = mergedProps.getScrollableContainer || (() => baleada.value)
          
    onMounted(() => {
      scrollToHeading(fullPath.value, { container })
    })
    watch(fullPath, () => {
      scrollToHeading(fullPath.value, { container })
    }, { lazy: true })

    /* Collect frontMatter, stats, and file path from loaders */
    const stats = ref({})
    provide(useSymbol('article', 'stats'), stats)

    const frontMatter = ref({})
    provide(useSymbol('article', 'frontMatter'), frontMatter)

    const filePath = ref('')
    provide(useSymbol('article', 'filePath'), filePath)

    return {
      baleada,
      mergedProps
    }
  },
}
</script>
