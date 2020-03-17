<template>
  <section
    ref="baleada"
    class="baleada-prose-codeblock"
    :class="[mergedProps.classes]"
  >
    <section class="contents">
      <pre v-if="mergedProps.hasLineNumbers"><code>{{ lineNumbers }}</code></pre>
      <slot />
    </section>
    <!-- Copy button -->
    <button
      v-if="mergedProps.canCopy"
      name="Copy code"
      @click="handleClick"
    >
      <EvaCopy />
    </button>
  </section>
</template>

<script>
import { ref, computed, watch } from '@vue/composition-api'
import { useCopyable } from '@baleada/composition/vue'

import { mergeProps } from '../util'

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
    canCopy: {
      // type: Boolean,
      // default: false,
    },
    hasLineNumbers: {
      // type: Boolean,
      // default: false,
    },
    classes: {
      type: String,
      default: '',
    }
  },
  setup (props) {
    const baleada = ref(null),
          mergedProps = mergeProps({ props, component: 'codeblock' }),
          copyable = useCopyable(''),
          code = computed(() => baleada.value ? baleada.value.textContent : '')

    watch(code, () => copyable.value.setString(code.value))

    function handleClick () {
      copyable.value.copy()
    }

    let lineNumbers = ''
    for (let i = 1; i <= props.lines; i++) {
      lineNumbers += `${i}\n`
    }

    return {
      baleada,
      handleClick,
      lineNumbers,
      mergedProps,
    }
  },
}
</script>
