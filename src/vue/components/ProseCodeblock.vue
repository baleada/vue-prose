<template>
  <section
    ref="prose"
    class="baleada-prose-codeblock"
  >
    <!-- Copy button -->
    <button
      name="copy-code"
      @click="handleCopyButtonClick"
    >
      <EvaCopy :class="'icon'" />
    </button>
    <section class="contents">
      <slot />
    </section>
  </section>
</template>

<script>
import { ref, computed } from '@vue/composition-api'
import { useCopiable } from '@baleada/composition/vue'

import { EvaCopy } from '@baleada/icons/vue'

export default {
  name: 'ProseCodeblock',
  components: {
    EvaCopy,
  },
  setup() {
    const prose = ref(null),
          copiable = useCopiable(''),
          code = computed(() => {
            const code = prose.value ? prose.value.textContent : ''
            useCopiable.setString(code)
            return code
          })

    function handleCopyButtonClick () {
      copiable.copy()
    }

    return {
      prose,
      handleCopyButtonClick
    }
  },
}
</script>
