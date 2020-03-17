<template>
  <section
    class="baleada-prose-media"
    ref="baleada"
    :class="[mergedProps.classes]"
  >
    <section class="contents">
      <component :is="type" :src="src" />
    </section>
  </section>
</template>

<script>
import { ref, onMounted, inject } from '@vue/composition-api'

import { EvaImage } from '@baleada/icons/vue'

import { useSymbol } from '../composition'

import { mergeProps } from '../util'

export default {
  name: 'ProseMedia',
  components: {
    EvaImage,
  },
  props: {
    type: {
      type: String,
      required: true,
      validator: value => ['img', 'audio', 'video'].includes(value)
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
          addMedia = inject(useSymbol('layout', 'addMedia')),
          mergedProps = mergeProps({ props, component: 'media' })

    addMedia({ type, src }) // TODO: Maybe include ref here if it allows to avoid double loading

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
