<template>
  <section
    class="baleada-prose-blockquote"
    :class="[mergedProps.classes]"
  >
    <section class="contents">
      <slot />
    </section>
    <InterfaceClick
      tag="a"
      v-if="mergedProps.readerCanTweet"
      :href="intent"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Tweet blockquote"
    >
      <SimpleTwitter />
    </InterfaceClick>
  </section>
</template>

<script>
import { ref, getCurrentInstance, inject, onMounted } from 'vue'

import { SimpleTwitter } from '@baleada/vue-simple-icons'

import { mergeProps, toTweetIntent, toTextContent } from '../util'
import { useSymbol } from '../symbols'

export default {
  name: 'ProseBlockquote',
  components: {
    SimpleTwitter,
  },
  props: {
    readerCanTweet: {
      // type: Boolean,
      // default: false,
    },
    tweetText: {
      type: String,
      // default: '',
    },
    tweetUrl: {
      type: String,
      // default: '',
    },
    tweetVia: {
      type: String,
      // default: '',
    },
    tweetHashtags: {
      type: Array,
      // default: () => []
    },
    classes: {
      type: String,
      // default: '',
    },
  },
  setup (props) {
    const mergedProps = mergeProps({ props, component: 'blockquote' }),
          defaultSlots = getCurrentInstance().$slots.default,
          text = mergedProps.tweetText || defaultSlots.reduce((text, slot) => text + toTextContent(slot), ''),
          fullPath = inject(useSymbol('context', 'fullPath')),
          intent = ref('')

    onMounted(() => {
      intent.value = toTweetIntent({
        text,
        hashtags: mergedProps.tweetHashtags,
        url: mergedProps.tweetUrl === 'current' ? `${window.origin}${fullPath.value}` : mergedProps.tweetUrl,
        via: mergedProps.tweetVia,
      })
    })

    return {
      intent,
      mergedProps,
    }
  },
}
</script>
