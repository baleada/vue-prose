<template functional>
  <section class="prose-table-of-contents">
    <h2>ON THIS PAGE</h2>
    <NuxtLink
      v-for="(heading, index) in props.headings"
      :key="index"
      :class="`h${heading.level} transition`"
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

<style lang="postcss" media="screen">
  .prose-table-of-contents {
    @apply flex flex-col;

    * + a {
      @apply mt-2;
    }

    .h1 {
      @apply ml-0 font-500;
    }
    .h2 {
      @apply ml-2;
    }
    .h3 {
      @apply ml-5;
    }
    .h4 {
      @apply ml-7;
    }
    .h5 {
      @apply ml-9;
    }
    .h6 {
      @apply ml-10;
    }

    .dark & {
      h2 {
        @apply bg-gray-900;
      }
    }
  }
</style>
