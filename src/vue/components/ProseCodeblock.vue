<template>
  <section
    ref="prose"
    class="baleada-prose-codeblock"
    :class="[mergedProps.classes]"
  >
    <section class="contents">
      <pre v-if="mergedProps.hasLineNumbers">
        <code>{{ lineNumbers }}</code>
      </pre>
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
      type: Boolean,
      // default: false,
    },
    hasLineNumbers: {
      type: Boolean,
      // default: false,
    },
    classes: {
      type: String,
      default: '',
    }
  },
  setup (props) {
    const prose = ref(null),
          mergedProps = mergeProps({ props, component: 'codeblock' }),
          copyable = useCopyable(''),
          code = computed(() => prose.value ? prose.value.textContent : '')

    watch(code, () => copyable.value.setString(code.value))

    function handleClick () {
      copyable.value.copy()
    }

    const lineNumbers = new Array(props.lines).map(line => `${line + 1}\n`)

    return {
      prose,
      handleClick,
      lineNumbers,
      mergedProps,
    }
  },
}
</script>
