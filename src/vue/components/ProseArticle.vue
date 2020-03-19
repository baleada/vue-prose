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
          layoutHeadings = inject(useSymbol('layout', 'headings'))
          
    provide(useSymbol('article', 'headings'), headings)

    watch(headings, () => {
      layoutHeadings.value = headings.value
    })

    /* Scroll to heading */
    const baleada = ref(null),
          container = mergedProps.scrollableContainerGetter || (() => baleada.value)
          
    onMounted(() => {
      scrollToHeading(fullPath.value, { container })
    })
    watch(fullPath, () => {
      scrollToHeading(fullPath.value, { container })
    }, { lazy: true })

    /* Collect frontMatter and stats from loaders */
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
