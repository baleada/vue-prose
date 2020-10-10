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
import { ref, watchEffect, onMounted } from 'vue'
import { useContext } from '../api'
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
<<<<<<< HEAD
=======
        file: {
          log: [],
          frontMatter: {},
          relativePath: '',
        }
>>>>>>> 8e9d61d3f79e432764669e08eed8d49d6c64ece3
      }
    })

    /* Scroll to heading */
    const baleada = ref(null),
          getScrollableContainer = mergedProps.getScrollableContainer || (() => baleada.value)

    onMounted(() => {
      watchEffect(() => {
        scrollToHeading(useContext().fullPath, { getScrollableContainer })
      })
    })

    return {
      baleada,
      mergedProps
    }
  },
}
</script>
