<template>

</template>

<script>
export default {
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
