<template>
  <component
    class="prose-heading relative transition cursor-pointer"
    :is="`h${level}`"
    @mouseover="handleMouseover"
    @mouseleave="handleMouseleave"
  >
    <!-- TODO: make this a button that copies the link -->
    <a
      :href="`#${slug}`"
      :class="[
        'hidden md:inline-flex items-center absolute left-0 h-5 w-5 transition',
        Number(level) === 1 ? 'top-1' : 'top-1/2',
        buttonIsShown ? '' : 'opacity-0 pointer-events-none'
      ]"
      :style="{
        transform: `translateX(-150%)${Number(level) === 1 ? '' : ' translateY(-50%)'}`
      }"
    >
      <EvaLink :class="'icon text-inherit'" />
    </a>
    <a
      ref="prose"
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
  setup(props, { slots }) {
    const prose = ref(null),
          text = computed(() => prose.value ? prose.value.textContent : ''),
          slug = computed(() => simpleSlugify(text.value).toLowerCase()),
          buttonIsShown = ref(false),
          handleMouseover = () => (buttonIsShown.value = true),
          handleMouseleave = () => (buttonIsShown.value = false),
          addHeading = inject(useSymbol('layout', 'addHeading'))

    onMounted(() => {
      addHeading({ level: props.level, slug: slug.value, text: text.value })
    })

    return {
      prose,
      slug,
      buttonIsShown,
      handleMouseover,
      handleMouseleave,
    }
  },
}
</script>
