<template>
  <ProseArticle>
    <section ref="prose">
      Prose
    </section>
  </ProseArticle>
</template>

<script>
import { ref } from 'vue'
import { ProseArticle } from '/@src/index.js'
import createProseContext from '../../functions/createProseContext.js'

export default {
  components: {
    ProseArticle
  },
  setup () {
    const prose = ref(null)
    createProseContext(prose)
    return { prose }
  }
}
</script>
