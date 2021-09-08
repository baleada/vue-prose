<template>
  <section
    class="baleada-prose-media"
    ref="baleada"
    :class="[withConfiguredDefaults.classes]"
  >
    <section class="baleada-prose-contents">
      <component :aria-label="withConfiguredDefaults.ariaLabel" :is="tag" :src="src" />
    </section>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from '../composition'
import { createGetWithConfiguredDefaults } from '../extracted'

const props = defineProps<{
        classes?: string
        type: 'image' | 'img' | 'audio' | 'video' | 'embed' | 'iframe',
        isFirst: boolean,
        src: string,
        ariaLabel: string,
      }>(),
      withConfiguredDefaults = createGetWithConfiguredDefaults('media')(props),
      baleada = ref(null),
      store = useStore()

// Reset article-provided state
if (withConfiguredDefaults.isFirst) {
  store.article.media = []
}

// Compute tag
const tag = computed(() => {
  switch (withConfiguredDefaults.type) {
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
store.article.media = [
  ...store.article.media,
  {
    type: withConfiguredDefaults.type,
    tag: tag.value,
    src: withConfiguredDefaults.src,
    ariaLabel: withConfiguredDefaults.ariaLabel
  }
]

// download
// play/pause
// speed
// seek
// change quality
// do cool cloudinary stuff
// lazy load
// - set src to a placeholder
</script>
