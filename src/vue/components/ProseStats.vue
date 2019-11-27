<template>
  <section class="baleada-prose-stats">
    <section class="contents">
      <slot v-bind="{ stats }"/>
      Updated on {{ intl }}
    </section>
  </section>
</template>

<script>
export default {
  name: 'ProseStats',
  props: {
    stats: {
      type: Object,
      required: true,
    }
  },
  setup ({ stats }) {
    const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ],
          date = new Date(stats.mtime),
          intl = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`

    return {
      intl
    }
  }
}
</script>
