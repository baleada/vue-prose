<template>
  <section
    ref="baleada"
    class="baleada-prose-codeblock"
    :class="[mergedProps.classes]"
  >
    <section class="contents">
      <pre v-if="mergedProps.hasLang"><code>{{ lang }}</code></pre>
      <pre v-if="mergedProps.hasLineNumbers"><code>{{ lineNumbers }}</code></pre>
      <slot />
    </section>
    <!-- Copy button -->
    <InterfaceClick
      v-if="mergedProps.readerCanCopy"
      name="Copy code"
      @click="handleClick"
      v-bind="interfaceClickProps"
    >
      <HeroiconsClipboardCopy />
    </InterfaceClick>
  </section>
</template>

<script>
import { ref, computed, watch, inject, getCurrentInstance } from 'vue'

import { mergeProps } from '../util'
import { useSymbol } from '../symbols'

import { useCopyable } from '@baleada/vue-composition'
import { HeroiconsClipboardCopy } from '@baleada/vue-heroicons'
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
    lang: {
      type: String,
    },
    readerCanCopy: {
      // type: Boolean,
      // default: false,
    },
    codeblockHasLang: {
      // type: Boolean,
      // deafult: false,
    },
    codeblockHasLineNumbers: {
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
          defaultSlot = getCurrentInstance().$slots.default,
          code = defaultSlot.reduce((text, slot) => text + toTextContent(slot), '')

    copyable.value.setString(code.value)

    function handleClick () {
      copyable.value.copy()
    }

    let lineNumbers = ''
    for (let i = 1; i <= props.lines; i++) {
      lineNumbers += `${i}\n`
    }

    const interfaceClickProps = computed(() => inject(useSymbol('context', 'interfaceProps')).value.click) // TODO: when is reactivity necessary?

    return {
      baleada,
      handleClick,
      lineNumbers,
      mergedProps,
      interfaceClickProps,
    }
  },
}
</script>
