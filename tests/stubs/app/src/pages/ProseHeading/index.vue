<template>
  <ProseHeading :level="1" :isFirst="true">
    Prose 1
  </ProseHeading>
  <ProseHeading :level="2" style="margin-top: 150vh">
    Prose 2
  </ProseHeading>
</template>

<script>
import { ref } from 'vue'
import { ProseHeading, useContext } from '/@src/index.js'
import createProseContext from '../../functions/createProseContext.js'

export default {
  components: {
    ProseHeading,
  },
  setup () {
    const prose = ref(null)
    createProseContext(prose)

    window.TEST = {
      context: useContext()
    }

    return { prose }
  }
}
</script>
