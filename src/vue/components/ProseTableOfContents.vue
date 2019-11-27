<template functional>
  <section class="baleada-prose-table-of-contents">
    <h2>ON THIS PAGE</h2>
    <NuxtLink
      v-for="(heading, index) in props.headings"
      :key="index"
      :class="`baleada-prose-table-of-contents-h${heading.level}`"
      :to="`#${heading.slug}`"
    >
      {{ heading.text }}
    </NuxtLink>
  </section>
</template>

<script>
export default {
  name: 'ProseTableOfContents',
  functional: true,
  props: {
    headings: {
      type: Array,
      required: true
    }
  },
}
</script>
