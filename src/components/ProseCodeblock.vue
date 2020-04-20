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
    <InterfaceClick
      v-if="mergedProps.canCopy"
      name="Copy code"
      @click="handleClick"
      v-bind="interfaceButtonProps"
    >
      <HeroiconsClipboardCopy />
    </InterfaceClick>
  </section>
</template>

<script>
import { ref, computed, watch, inject } from '@vue/composition-api'

import { mergeProps } from '../util'
import { useSymbol } from '../symbols'

import { useCopyable } from '@baleada/vue-composition'
import { HeroiconsClipboardCopy } from '@baleada/vue-icons/heroicons'
import { InterfaceClick } from '@baleada/vue-interface'

export default {
  name: 'ProseCodeblock',
  components: {
    HeroiconsClipboardCopy,
    InterfaceClick,
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
      // default: '',
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

    const interfaceButtonProps = computed(() => inject(useSymbol('layout', 'interfaceProps')).value.click) // TODO: when is reactivity necessary?

    return {
      baleada,
      handleClick,
      lineNumbers,
      mergedProps,
      interfaceButtonProps,
    }
  },
}
</script>
