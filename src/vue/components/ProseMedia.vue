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

import { useSymbol } from '../composition'

export default {
  name: 'ProseMedia',
  props: {
    type: {
      type: String,
      required: true,
      validator: value => ['audio', 'video'].includes(value)
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

    return {}
  },
}
</script>
