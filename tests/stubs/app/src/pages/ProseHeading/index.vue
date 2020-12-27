<template>
  <ProseArticle>
    <ProseHeading :level="1">
      Prose
    </ProseHeading>
  </ProseArticle>
</template>

<script>
import { ref } from 'vue'
import { ProseArticle, ProseHeading, useContext } from '/@src/index.js'
import createProseContext from '../../functions/createProseContext.js'

export default {
  components: {
    ProseArticle,
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
