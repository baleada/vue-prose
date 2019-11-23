<template>
  <section class="contents">
    <slot />
  </section>
</template>

<script>
export default {
  name: 'ProseList',
  props: {
    isOrdered: {
      type: Boolean,
      default: false,
    }
  },
}
</script>
