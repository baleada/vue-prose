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
import { ref, onMounted, inject } from 'vue'

// import { EvaImage } from '@baleada/vue-heroicons'

import { useSymbol } from '../symbols'

import { mergeProps } from '../util'

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
  setup({ type, src }) {
    const baleada = ref(null),
          mergedProps = mergeProps({ props, component: 'media' }),
          media = inject(useSymbol('article', 'media'))

    headings.value.push({ type, src })
    
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
