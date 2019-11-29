<template functional>
  <section
    class="baleada-prose-section"
    :class="[props.classes]"
  >
    <section class="contents">
      <slot />
    </section>
  </section>
</template>

<script>
export default {
  name: 'ProseSection',
  props: {
    classes: {
      type: String,
      default: '',
    },
  },
}
</script>
