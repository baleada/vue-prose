<template>
  <slot />
</template>

<script>
export default {
  props: {
    isOrdered: {
      type: Boolean,
      default: false,
    }
  },
}
</script>
