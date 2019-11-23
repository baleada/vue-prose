<template>
  <section class="contents prose-blockquote">
    <slot />
  </section>
</template>

<script>
export default {
  name: 'ProseBlockquote',
  props: {
    isTweetable: {
      type: Boolean,
      default: false,
    },
    tweetText: {
      type: String,
    },
    tweetHashtags: {
      type: Array,
    }
  }
}
</script>
