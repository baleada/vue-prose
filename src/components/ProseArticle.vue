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
import { ref, computed, watchEffect, onMounted, nextTick } from 'vue'
import { useContext } from '../composition'
import { getMergedProps, scrollToHeading } from '../util'

export default {
  name: 'ProseArticle',
  props: {
    classes: {
      type: String,
      // default: '',
    },
    scrollableContainer: {
      type: HTMLElement,
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
          scrollableContainer = computed(() => mergedProps.value.scrollableContainer || baleada.value)

    onMounted(() => {
      watchEffect(() => {
        nextTick(() => scrollToHeading(useContext().fullPath, { scrollableContainer }))
      })
    })

    return {
      baleada,
      mergedProps
    }
  },
}
</script>
