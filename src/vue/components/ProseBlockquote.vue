<template>
  <section
    class="baleada-prose-blockquote"
    :class="[classes]"
  >
    <section class="contents">
      <slot />
    </section>
    <a
      v-if="canTweet"
      :href="intent"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Tweet blockquote"
    >
      <SimpleTwitter />
    </a>
  </section>
</template>

<script>
import { getCurrentInstance } from '@vue/composition-api'

import { SimpleTwitter } from '@baleada/icons/vue'

import { toTweetIntent, toTextContent } from '../util'

export default {
  name: 'ProseBlockquote',
  components: {
    SimpleTwitter,
  },
  props: {
    canTweet: {
      type: Boolean,
      default: false,
    },
    tweetText: {
      type: String,
      default: '',
    },
    tweetUrl: {
      type: String,
      default: '',
    },
    tweetVia: {
      type: String,
      default: '',
    },
    tweetHashtags: {
      type: Array,
      default: () => []
    },
    classes: {
      type: String,
      default: '',
    },
  },
  setup (props) {
    const defaultSlot = getCurrentInstance().$slots.default[0],
          text = props.tweetText|| toTextContent(defaultSlot),
          intent = toTweetIntent({
            text,
            hashtags: props.tweetHashtags,
            url: props.tweetUrl,
            via: props.tweetVia,
          })

    return {
      intent
    }
  },
}
</script>
