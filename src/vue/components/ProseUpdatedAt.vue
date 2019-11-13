<template lang="html">
<div class="mt-3 mb-7 text-1 italic text-gray-800">
  Updated on {{ intl }}
</div>
</template>

<script>
export default {
  name: 'ProseUpdatedAt',
  props: {
    timestamp: {
      type: String,
      required: true,
    }
  },
  setup ({ timestamp }) {
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
          date = new Date(timestamp),
          intl = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`

    return {
      intl
    }
  }
}
</script>
