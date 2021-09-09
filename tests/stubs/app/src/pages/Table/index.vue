<template>
  <BaleadaProseTable
    :totalBodyRows="4"
    :totalColumns="2"
    :readerCanSearch="true"
    :readerCanChangeSearchCaseSensitivity="true"
    ariaLabel="My table"
  >
    <template #prose-looped-0-prose-looped-0-prose-looped-0="{ ref }">
      <div :ref="ref">Letter</div>
    </template>
    <template #prose-looped-0-prose-looped-0-prose-looped-1="{ ref }">
      <div :ref="ref">Word</div>
    </template>
    <template #prose-looped-1-prose-looped-0-prose-looped-0="{ ref }">
      <div :ref="ref">A</div>
    </template>
    <template #prose-looped-1-prose-looped-0-prose-looped-1="{ ref }">
      <div :ref="ref">Apple</div>
    </template>
    <template #prose-looped-1-prose-looped-1-prose-looped-0="{ ref }">
      <div :ref="ref">B</div>
    </template>
    <template #prose-looped-1-prose-looped-1-prose-looped-1="{ ref }">
      <div :ref="ref">Boy</div>
    </template>
    <template #prose-looped-1-prose-looped-2-prose-looped-0="{ ref }">
      <div :ref="ref">C</div>
    </template>
    <template #prose-looped-1-prose-looped-2-prose-looped-1="{ ref }">
      <div :ref="ref">Captain Jean Luc Picard of the USS Enterprise</div>
    </template>
    <template #prose-looped-1-prose-looped-3-prose-looped-0="{ ref }">
      <div :ref="ref">D</div>
    </template>
    <template #prose-looped-1-prose-looped-3-prose-looped-1="{ ref }">
      <div :ref="ref">Dog</div>
    </template>
</BaleadaProseTable>
</template>

<script setup lang="ts">

</script>
