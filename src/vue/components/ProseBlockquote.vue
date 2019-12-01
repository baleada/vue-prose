<template>
  <section
    class="baleada-prose-blockquote"
    :class="[classes]"
  >
    <section class="contents">
      <slot />
    </section>
  </section>
</template>

<script>
export default {
  name: 'ProseBlockquote',
  props: {
    canTweet: {
      type: Boolean,
      default: false,
    },
    tweetText: {
      type: String,
    },
    hashtags: {
      type: Array,
    },
    classes: {
      type: String,
      default: '',
    },
  }
}
</script>
