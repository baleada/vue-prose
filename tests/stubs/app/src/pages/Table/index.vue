<template>
  <BaleadaProseTable
    :totalBodyRows="4"
    :totalColumns="2"
    :readerCanSearch="true"
    :readerCanChangeSearchCaseSensitivity="true"
    ariaLabel="My table"
  >
    <template #looped-0-looped-0-looped-0="{ ref }">
      <div :ref="ref">Letter</div>
    </template>
    <template #looped-0-looped-0-looped-1="{ ref }">
      <div :ref="ref">Word</div>
    </template>
    <template #looped-1-looped-0-looped-0="{ ref }">
      <div :ref="ref">A</div>
    </template>
    <template #looped-1-looped-0-looped-1="{ ref }">
      <div :ref="ref">Apple</div>
    </template>
    <template #looped-1-looped-1-looped-0="{ ref }">
      <div :ref="ref">B</div>
    </template>
    <template #looped-1-looped-1-looped-1="{ ref }">
      <div :ref="ref">Boy</div>
    </template>
    <template #looped-1-looped-2-looped-0="{ ref }">
      <div :ref="ref">C</div>
    </template>
    <template #looped-1-looped-2-looped-1="{ ref }">
      <div :ref="ref">Captain Jean Luc Picard of the USS Enterprise</div>
    </template>
    <template #looped-1-looped-3-looped-0="{ ref }">
      <div :ref="ref">D</div>
    </template>
    <template #looped-1-looped-3-looped-1="{ ref }">
      <div :ref="ref">Dog</div>
    </template>
</BaleadaProseTable>
</template>

<script setup lang="ts">

</script>
