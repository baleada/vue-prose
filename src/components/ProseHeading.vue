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
      @click="clickHandle"
      v-bind="interfaceClickProps"
    >
      <HeroiconsLink :class="mergedProps.interfacContentsClasses" />
    </InterfaceClick>
  </component>
</template>

<script>
import { ref, computed, onMounted } from 'vue'

import { useContext } from '../api'
import { toMergedProps, simpleSlugify, toTextContent } from '../util'

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
  setup (props, { slots }) {
    const baleada = ref(null),
          mergedProps = toMergedProps({ props, component: 'heading' })

    // Get slug for various features
    const defaultSlot = slots.default(),
          text = defaultSlot.reduce((text, slot) => text + toTextContent(slot), '').trim(),
          slug = simpleSlugify(text).toLowerCase()
    
    // Register heading in context
    useContext(context => context.article.headings = [...context.article.headings, { level: props.level, slug, text }])

    // Set up copy link feature
    const copyable = useCopyable('')

    onMounted(() => {
      copyable.value.setString(`${window.location.origin}${window.location.pathname}#${slug}`)
    })

    function clickHandle () {
      copyable.value.copy()
    }

    // Access InterfaceClick props
    const interfaceClickProps = useContext().interfacePropsByComponent.click // TODO: when is reactivity necessary?

    return {
      baleada,
      slug,
      clickHandle,
      mergedProps,
      interfaceClickProps,
    }
  },
}
</script>
