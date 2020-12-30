<template>
  <ProseArticle>
    <ProseBlockquote
      :readerCanTweet="true"
    >
      <p>hello</p>
    </ProseBlockquote>
  </ProseArticle>
</template>

<script>
import { ref } from 'vue'
import { ProseArticle, ProseBlockquote, useContext } from '/@src/index.js'
import createProseContext from '../../functions/createProseContext.js'

export default {
  components: {
    ProseArticle,
    ProseBlockquote,
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
