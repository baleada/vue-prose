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
    >
      <slot />
    </a>
    <InterfaceButton
      v-if="mergedProps.canCopy"
      name="Copy link to heading"
      @click="handleClick"
      v-bind="interfaceButtonProps"
    >
      <EvaLink />
    </InterfaceButton>
  </component>
</template>

<script>
import { ref, computed, onMounted, inject, getCurrentInstance } from '@vue/composition-api'

import { useSymbol } from '../composition'
import { mergeProps, simpleSlugify, toTextContent } from '../util'

import { useCopyable } from '@baleada/composition/vue'
import { InterfaceButton } from '@baleada/interface/vue'
import { EvaLink } from '@baleada/icons/vue'

export default {
  name: 'ProseHeading',
  components: {
    EvaLink,
    InterfaceButton,
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
      default: '',
    },
  },
  setup (props) {
    const baleada = ref(null),
          mergedProps = mergeProps({ props, component: 'heading' }),
          defaultSlots = getCurrentInstance().$slots.default,
          text = defaultSlots.reduce((text, slot) => text + toTextContent(slot), ''),
          slug = simpleSlugify(text).toLowerCase(),
          addHeading = inject(useSymbol('article', 'addHeading'))

    addHeading({ level: props.level, slug, text })

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
