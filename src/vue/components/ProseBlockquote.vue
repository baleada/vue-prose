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
    isTweetable: {
      type: Boolean,
      default: false,
    },
    tweetText: {
      type: String,
    },
    tweetHashtags: {
      type: Array,
    },
    classes: {
      type: String,
      default: '',
    },
  }
}
</script>
