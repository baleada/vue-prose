<template>
  <BaleadaProseCodeblock
    :totalLines="4"
    lang="ts"
  >
    <pre><code>function foo (bar: string) {
  const qux = bar.split('').reverse().join('')
  return qux.replace(/*+/g, '')
}</code></pre>
  </BaleadaProseCodeblock>
</template>

<script setup lang="ts">

</script>
