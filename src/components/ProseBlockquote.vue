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
import { ref, onMounted } from 'vue'
import { InterfaceClick } from '@baleada/vue-interface'
import { SimpleTwitter } from '@baleada/vue-simple-icons'
import { toMergedProps, toTweetIntent, toTextContent } from '../util'
import { useContext } from '../api'

export default {
  name: 'ProseBlockquote',
  components: {
    InterfaceClick,
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
  setup (props, { slots }) {
    const mergedProps = toMergedProps({ props, component: 'blockquote' }),
          defaultSlots = slots.default(),
          text = mergedProps.tweetText || defaultSlots.reduce((text, slot) => text + toTextContent(slot), ''),
          { fullPath } = useContext(),
          intent = ref('')

    onMounted(() => {
      intent.value = toTweetIntent({
        text,
        hashtags: mergedProps.tweetHashtags,
        url: mergedProps.tweetUrl === 'current' ? `${window.origin}${fullPath}` : mergedProps.tweetUrl,
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
