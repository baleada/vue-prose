<template>
  <component
    ref="baleada"
    class="baleada-prose-heading"
    :class="[mergedProps.classes]"
    :is="`h${level}`"
  >
    <InterfaceClick
      tag="a"
      :id="slug"
      :href="`#${slug}`"
      class="contents"
      :class="mergedProps.contentsClasses"
      v-bind="interfaceClickProps"
    >
      <slot />
    </InterfaceClick>
    <InterfaceClick
      v-if="mergedProps.readerCanCopy"
      name="Copy link to heading"
      @click="handleClick"
      v-bind="interfaceClickProps"
    >
      <HeroiconsLink :class="mergedProps.interfacContentsClasses" />
    </InterfaceClick>
  </component>
</template>

<script>
import { ref, computed, onMounted, inject, getCurrentInstance } from 'vue'

import { useSymbol } from '../symbols'
import { mergeProps, simpleSlugify, toTextContent } from '../util'

import { useCopyable } from '@baleada/vue-composition'
import { InterfaceClick } from '@baleada/vue-interface'
import { HeroiconsLink } from '@baleada/vue-heroicons'

export default {
  name: 'ProseHeading',
  components: {
    HeroiconsLink,
    InterfaceClick,
  },
  props: {
    level: {
      type: Number,
      required: true,
    },
    readerCanCopy: {
      // type: Boolean,
      // default: false,
    },
    classes: {
      type: String,
      // default: '',
    },
    contentsClasses: {
      type: String,
      // default: '',
    },
    interfaceClasses: {
      type: String,
      // default: '',
    },
    interfaceContentsClasses: {
      type: String,
      // default: '',
    },
  },
  setup (props) {
    const baleada = ref(null),
          mergedProps = mergeProps({ props, component: 'heading' }),
          defaultSlot = getCurrentInstance().$slots.default,
          text = defaultSlot.reduce((text, slot) => text + toTextContent(slot), ''),
          slug = simpleSlugify(text).toLowerCase(),
          headings = inject(useSymbol('article', 'headings'))

    headings.value.push({ level: props.level, slug, text })

    /* Copy link */
    const copyable = useCopyable('')

    onMounted(() => {
      copyable.value.setString(`${window.location.origin}${window.location.pathname}#${slug}`)
    })

    function handleClick () {
      copyable.value.copy()
    }

    const interfaceClickProps = computed(() => inject(useSymbol('context', 'interfaceProps')).value.click) // TODO: when is reactivity necessary?

    return {
      baleada,
      slug,
      handleClick,
      mergedProps,
      interfaceClickProps,
    }
  },
}
</script>
