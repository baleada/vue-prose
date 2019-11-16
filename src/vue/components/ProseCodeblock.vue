<template>
  <section
    class="relative prose-codeblock swiper-no-swiping transition"
  >
    <!-- Copy button -->
    <button
      name="copy-code"
      class="absolute right-0 top-0 mt-2 mr-2 h-5 w-5 text-gray-600 btn-grows transition"
      @click="handleCopyButtonClick"
    >
      <EvaCopy :class="'icon'" />
    </button>
    <div class="contents" ref="prose">
      <slot />
    </div>
  </section>
</template>

<script>
import { ref, computed } from '@vue/composition-api'
import useCopiable from '@baleada/composition'

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
