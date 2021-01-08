<template>
  <section
    class="baleada-prose-media"
    ref="baleada"
    :class="[mergedProps.classes]"
  >
    <section class="baleada-prose-contents">
      <component :aria-label="mergedProps.ariaLabel" :is="tag" :src="src" />
    </section>
  </section>
</template>

<script>
import { ref, computed } from 'vue'
import { useContext } from '../composition'
import { getMergedProps } from '../util'

export default {
  name: 'ProseMedia',
  components: {
    // EvaImage,
  },
  props: {
    type: {
      type: String,
      required: true,
      validator: value => ['image', 'img', 'audio', 'video', 'embed', 'iframe'].includes(value)
    },
    isFirst: {
      type: Boolean,
    },
    src: {
      type: String,
      required: true,
    },
    ariaLabel: {
      type: String,
      required: true, // TODO: provide warning/error tooling for markdown-only users
    },
    classes: {
      type: String,
      // default: '',
    }
  },
  setup(props) {
    const baleada = ref(null),
          mergedProps = getMergedProps({ props, component: 'media' })

    // Reset article-provided state
    if (props.isFirst) {
      useContext(context => (context.article.media = []))
    }

    // Compute tag
    const tag = computed(() => {
      switch (props.type) {
        case 'image':
        case 'img':
          return 'img'
        case 'audio':
          return 'audio'
        case 'video':
          return 'video'
        case 'embed':
        case 'iframe':
          return 'iframe'
      }
    })

    // Register media in context
    useContext(context => context.article.media = [...context.article.media, { type: props.type, tag: tag.value, src: props.src, ariaLabel: mergedProps.value.ariaLabel }])

    
    
    // download
    // play/pause
    // speed
    // seek
    // change quality
    // do cool cloudinary stuff
    // lazy load
    // - set src to a placeholder

    return {
      mergedProps,
      tag,
    }
  },
}
</script>
