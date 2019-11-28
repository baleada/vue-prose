<template>
  <section
    ref="prose"
    class="baleada-prose-codeblock"
  >
    <!-- Copy button -->
    <button
      name="Copy code"
      @click="handleClick"
    >
      <EvaCopy :class="'icon'" />
    </button>
    <section class="contents">
      <pre v-if="hasLineNumbers">
        <code>{{ lineNumbers }}</code>
      </pre>
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
  props: {
    lines: {
      type: Number,
    },
    hasLineNumbers: {
      type: Boolean,
      default: false,
    }
  },
  setup(props) {
    const prose = ref(null),
          copiable = useCopiable(''),
          code = computed(() => {
            const code = prose.value ? prose.value.textContent : ''
            useCopiable.setString(code)
            return code
          })

    function handleClick () {
      copiable.copy()
    }

    const lineNumbers = new Array(props.lines).map(line => `${line + 1}\n`)

    return {
      prose,
      handleClick,
      lineNumbers,
    }
  },
}
</script>
