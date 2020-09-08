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
import { ref, computed, getCurrentInstance } from 'vue'
import { useCopyable } from '@baleada/vue-composition'
import { HeroiconsClipboardCopy } from '@baleada/vue-heroicons'
import { InterfaceClick } from '@baleada/vue-interface'
import { toMergedProps } from '../util'
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
          mergedProps = toMergedProps({ props, component: 'codeblock' })

    // Set up copy code to clipboard feature
    const copyable = useCopyable(''),
          defaultSlot = getCurrentInstance().$slots.default,
          code = defaultSlot.reduce((text, slot) => text + toTextContent(slot), '')

    copyable.value.setString(code.value)

    function clickHandle () {
      copyable.value.copy()
    }

    // Compute line numbers
    const lineNumbers = (() => {
      let lineNumbers = ''
      for (let i = 1; i <= props.totalLines; i++) {
        lineNumbers += `${i}\n`
      }
      return lineNumbers
    })()
    
    // Access InterfaceClick props
    const { interfacePropsByComponent } = useContext(),
          interfaceClickProps = interfacePropsByComponent.click // TODO: when is reactivity necessary?

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
