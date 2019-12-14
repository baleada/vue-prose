<template>
  <component
    ref="prose"
    class="baleada-prose-heading"
    :class="[classes]"
    :is="`h${level}`"
  >
    <button
      name="Copy link to heading"
      @click="handleClick"
    >
      <EvaLink />
    </button>
    <a
      :id="slug"
      :href="`#${slug}`"
      class="contents"
    >
      <slot />
    </a>
  </component>
</template>

<script>
import { ref, computed, watch, onMounted, inject, getCurrentInstance } from '@vue/composition-api'

import { useCopiable } from '@baleada/composition/vue'

import { useSymbol } from '../composition'

import simpleSlugify from '../util/simpleSlugify'

import { EvaLink } from '@baleada/icons/vue'

function toTextContent (vNode) {
  const { tag, text, children } = vNode
  return tag
    ? children.reduce((textContent, child) => textContent + toTextContent(child), '')
    : text
}

export default {
  name: 'ProseHeading',
  components: {
    EvaLink
  },
  props: {
    level: {
      type: Number,
      required: true,
    },
    classes: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const prose = ref(null),
          defaultSlot = getCurrentInstance().$slots.default[0],
          text = toTextContent(defaultSlot),
          slug = simpleSlugify(text).toLowerCase(),
          addHeading = inject(useSymbol('article', 'addHeading'))

    onMounted(() => {
      addHeading({ level: props.level, slug, text })
    })

    /* Copy link */
    const copiable = useCopiable('')

    onMounted(() => {
      copiable.value.setString(`${window.location.origin}${window.location.pathname}#${slug.value}`)
    })

    function handleClick () {
      copiable.value.copy()
    }

    return {
      prose,
      slug,
      handleClick
    }
  },
}
</script>
