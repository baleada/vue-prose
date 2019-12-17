<template>
  <component
    ref="prose"
    class="baleada-prose-heading"
    :class="[classes]"
    :is="`h${level}`"
  >
    <a
      :id="slug"
      :href="`#${slug}`"
      class="contents"
    >
      <slot />
    </a>
    <button
      name="Copy link to heading"
      @click="handleClick"
    >
      <EvaLink />
    </button>
  </component>
</template>

<script>
import { ref, onMounted, inject, getCurrentInstance } from '@vue/composition-api'

import { useCopiable } from '@baleada/composition/vue'

import { useSymbol } from '../composition'
import { simpleSlugify, toTextContent } from '../util'

import { EvaLink } from '@baleada/icons/vue'

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

    addHeading({ level: props.level, slug, text })

    /* Copy link */
    const copiable = useCopiable('')

    onMounted(() => {
      copiable.value.setString(`${window.location.origin}${window.location.pathname}#${slug}`)
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
