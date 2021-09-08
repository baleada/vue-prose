<template>
  <section
    class="baleada-prose-blockquote"
    :class="[withConfiguredDefaults.classes]"
  >
    <section class="baleada-prose-contents">
      <slot />
    </section>
    <a
      v-if="withConfiguredDefaults.readerCanTweet"
      :href="intent"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Tweet blockquote"
    >
      <SimpleTwitter />
    </a>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, useSlots } from 'vue'
import { SimpleTwitter } from '@baleada/vue-simple-icons/lite'
import { toTweetIntent, toTextContent, createGetWithConfiguredDefaults } from '../extracted'
import { useStore } from '../composition'

const props = defineProps<{
        readerCanTweet?: boolean,
        tweetText?: string,
        tweetUrl?: string,
        tweetVia?: string,
        tweetHashtags?: string[],
        classes?: string,
      }>(),
      withConfiguredDefaults = createGetWithConfiguredDefaults('blockquote')(props),
      defaultSlots = useSlots().default(),
      text = withConfiguredDefaults.tweetText || defaultSlots.reduce((text, slot) => text + toTextContent(slot), ''),
      { fullPath } = useStore(),
      intent = ref('')

onMounted(() => {
  intent.value = toTweetIntent({
    text,
    hashtags: withConfiguredDefaults.tweetHashtags,
    url: withConfiguredDefaults.tweetUrl === 'current' ? `${window.origin}${fullPath}` : withConfiguredDefaults.tweetUrl,
    via: withConfiguredDefaults.tweetVia,
  })
})
</script>


