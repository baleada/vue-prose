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
      @click="clickHandle"
      v-bind="interfaceClickProps"
    >
      <HeroiconsClipboardCopy />
    </InterfaceClick>
  </section>
</template>

<script>
import { ref, computed } from 'vue'
import { useCopyable } from '@baleada/vue-composition'
import { HeroiconsClipboardCopy } from '@baleada/vue-heroicons'
import { InterfaceClick } from '@baleada/vue-interface'
import { getMergedProps, toTextContent } from '../util'
import { useContext } from '../api'

export default {
  name: 'ProseCodeblock',
  components: {
    HeroiconsClipboardCopy,
    InterfaceClick,
  },
  props: {
    totalLines: {
      type: Number,
    },
    lang: {
      type: String,
    },
    readerCanCopy: {
      // type: Boolean,
      // default: false,
    },
    hasLang: {
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
  setup (props, { slots }) {
    const baleada = ref(null),
          mergedProps = getMergedProps({ props, component: 'codeblock' })

    // Set up copy code to clipboard feature
    const copyable = useCopyable(''),
          defaultSlot = slots.default(),
          code = defaultSlot.reduce((text, slot) => text + toTextContent(slot), '')

    copyable.value.setString(code)

    function clickHandle () {
      copyable.value.copy()
    }

    // Compute line numbers
    const lineNumbers = Array(props.totalLines)
      .fill()
      .reduce((lineNumbers, _, index) => `${lineNumbers}${index + 1}\n`, '')
    
    // Access InterfaceClick props
    const interfaceClickProps = useContext().interfacePropsByComponent.click // TODO: when is reactivity necessary?

    return {
      baleada,
      clickHandle,
      lineNumbers,
      mergedProps,
      interfaceClickProps,
    }
  },
}
</script>
