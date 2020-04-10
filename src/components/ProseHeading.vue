<template>
  <component
    ref="baleada"
    class="baleada-prose-heading"
    :class="[mergedProps.classes]"
    :is="`h${level}`"
  >
    <a
      :id="slug"
      :href="`#${slug}`"
      class="contents"
      :class="mergedProps.descendant1Classes"
    >
      <slot />
    </a>
    <InterfaceClick
      v-if="mergedProps.canCopy"
      name="Copy link to heading"
      @click="handleClick"
      v-bind="interfaceButtonProps"
      :class="mergedProps.descendant2Classes"
    >
      <HeroiconsLink :class="mergedProps.descendant3Classes" />
    </InterfaceClick>
  </component>
</template>

<script>
import { ref, computed, onMounted, inject, getCurrentInstance } from '@vue/composition-api'

import { useSymbol } from '../symbols'
import { mergeProps, simpleSlugify, toTextContent } from '../util'

import { useCopyable } from '@baleada/vue-composition'
import { InterfaceClick } from '@baleada/vue-interface'
import { HeroiconsLink } from '@baleada/vue-icons/heroicons'

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
    canCopy: {
      // type: Boolean,
      // default: false,
    },
    classes: {
      type: String,
      // default: '',
    },
    descendant1Classes: {
      type: String,
      // default: '',
    },
    descendant2Classes: {
      type: String,
      // default: '',
    },
    descendant3Classes: {
      type: String,
      // default: '',
    },
  },
  setup (props) {
    const baleada = ref(null),
          mergedProps = mergeProps({ props, component: 'heading' }),
          defaultSlots = getCurrentInstance().$slots.default,
          text = defaultSlots.reduce((text, slot) => text + toTextContent(slot), ''),
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

    const interfaceButtonProps = computed(() => inject(useSymbol('layout', 'interfaceProps')).value.button) // TODO: when is reactivity necessary?

    return {
      baleada,
      slug,
      handleClick,
      mergedProps,
      interfaceButtonProps,
    }
  },
}
</script>
