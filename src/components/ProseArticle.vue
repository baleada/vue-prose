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
import { ref, watchEffect, onMounted, nextTick } from 'vue'
import { useContext } from '../composition'
import { getMergedProps, scrollToHeading } from '../util'

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
    const mergedProps = getMergedProps({ props, component: 'article' })

    // Reset article-provided state
    useContext(context => {
      context.article = {
        headings: [],
        media: [],
      }
    })

    /* Scroll to heading */
    const baleada = ref(null),
          getScrollableContainer = mergedProps.value.getScrollableContainer || (() => baleada.value)

    onMounted(() => {
      watchEffect(() => {
        nextTick(() => scrollToHeading(useContext().fullPath, { getScrollableContainer }))
      })
    })

    return {
      baleada,
      mergedProps
    }
  },
}
</script>
