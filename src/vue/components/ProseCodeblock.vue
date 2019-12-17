<template>
  <section
    ref="prose"
    class="baleada-prose-codeblock"
    :class="[classes]"
  >
    <section class="contents">
      <pre v-if="hasLineNumbers">
        <code>{{ lineNumbers }}</code>
      </pre>
      <slot />
    </section>
    <!-- Copy button -->
    <button
      name="Copy code"
      @click="handleClick"
    >
      <EvaCopy />
    </button>
  </section>
</template>

<script>
import { ref, computed, watch } from '@vue/composition-api'
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
    },
    classes: {
      type: String,
      default: '',
    }
  },
  setup(props) {
    const prose = ref(null),
          copiable = useCopiable(''),
          code = computed(() => prose.value ? prose.value.textContent : '')

    watch(code, () => copiable.value.setString(code.value))

    function handleClick () {
      copiable.value.copy()
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
