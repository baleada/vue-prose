<template>
  <section
    class="baleada-prose-media"
    ref="prose"
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
    }
  },
  setup({ type, src }) {
    const prose = ref(null),
          addMedia = inject(useSymbol('layout', 'addMedia'))

    onMounted(() => addMedia({ type, src }))

    // download
    // play/pause
    // speed
    // seek
    // change quality
    // do cool cloudinary stuff
    // lazy load
    // - set src to a placeholder

    return {}
  },
}
</script>
