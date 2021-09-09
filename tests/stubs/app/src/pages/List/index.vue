<template>
  <BaleadaProseList
    tag="ol"
    :totalItems="3"
    :readerCanSearch="true"
    :readerCanChangeSearchCaseSensitivity="true"
  >
    <template #prose-looped-0="{ ref }">
      <li :ref="ref">list item</li>
    </template>
    <template #prose-looped-1="{ ref }">
      <li :ref="ref">also list item</li>
    </template>
    <template #prose-looped-2="{ ref }">
      <li :ref="ref">yay</li>
    </template>
  </BaleadaProseList>
</template>

<script setup lang="ts">

</script>
