<template>
  <section
    class="baleada-prose-media"
    ref="baleada"
    :class="[mergedProps.classes]"
  >
    <section class="contents">
      <component :is="type === 'image' ? 'img' : type" :src="src" />
    </section>
  </section>
</template>

<script>
import { ref } from 'vue'

import { toMergedProps } from '../util'

export default {
  name: 'ProseMedia',
  components: {
    // EvaImage,
  },
  props: {
    type: {
      type: String,
      required: true,
      validator: value => ['image', 'audio', 'video'].includes(value)
    },
    src: {
      type: String,
      required: true,
    },
    classes: {
      type: String,
      // default: '',
    }
  },
  setup(props) {
    const baleada = ref(null),
          mergedProps = toMergedProps({ props, component: 'media' })

    // Register media in context
    useContext(context => context.article.media = [...context.article.media, { type: props.type, src: props.src }])
    
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
    }
  },
}
</script>
