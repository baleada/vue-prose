<template>
  <component
    ref="prose"
    class="baleada-prose-heading"
    :is="`h${level}`"
  >
    <button
      name="Copy link to heading"
      @click="handleClick"
    >
      <EvaLink />
    </a>
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
import { ref, computed, onMounted, inject } from '@vue/composition-api'

import { useCopiable } from '@baleada/composition/vue'

import { useSymbol } from '../composition'

import simpleSlugify from '../util/simpleSlugify'

import { EvaLink } from '@baleada/icons/vue'

export default {
  name: 'ProseHeading',
  components: {
    EvaLink
  },
  props: {
    level: {
      type: [Number, String],
      required: true,
    }
  },
  setup(props) {
    const prose = ref(null),
          text = computed(() => prose.value ? prose.value.textContent : ''),
          slug = computed(() => simpleSlugify(text.value).toLowerCase()),
          addHeading = inject(useSymbol('layout', 'addHeading'))

    onMounted(() => {
      addHeading({ level: props.level, slug: slug.value, text: text.value })
    })

    /* Copy link */
    const copiable = useCopiable('')

    watch(slug, () => {
      useCopiable.setString(`${window.location.origin}${window.location.pathname}#${slug.value}`)
    }, { lazy: true })

    function handleClick () {
      copiable.copy()
    }

    return {
      prose,
      slug,
      handleClick
    }
  },
}
</script>
