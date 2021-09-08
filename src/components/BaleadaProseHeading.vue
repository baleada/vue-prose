<template>
  <component
    ref="baleada"
    class="baleada-prose-heading"
    :class="[withConfiguredDefaults.classes]"
    :is="`h${level}`"
  >
    <a
      :id="slug"
      :href="`#${slug}`"
      class="baleada-prose-contents"
    >
      <slot />
    </a>
    <button
      v-if="withConfiguredDefaults.readerCanCopy"
      name="Copy link to heading"
      @click="clickEffect"
    >
      <HeroiconsLink />
    </button>
  </component>
</template>

<script setup lang="ts">
import { ref, onMounted, useSlots } from 'vue'
import { useCopyable } from '@baleada/vue-composition'
import { createSlug } from '@baleada/logic'
// @ts-ignore
import { HeroiconsLink } from '@baleada/vue-heroicons'
import { useStore } from '../composition'
import { createGetWithConfiguredDefaults, toTextContent } from '../extracted'
import { config } from '../state'

const toSlug = createSlug()

const props = defineProps<{
        readerCanCopy?: boolean,
        classes?: string,
        level: number,
        isFirst: boolean,
      }>(),
      withConfiguredDefaults = createGetWithConfiguredDefaults('heading')(props),
      baleada = ref(null),
      store = useStore()

// Clear stored headings
if (withConfiguredDefaults.isFirst) {
  store.article.headings = []
}

// Get slug for various features
const defaultSlot = useSlots().default(),
      text = defaultSlot.reduce((text, slot) => text + toTextContent(slot), '').trim(),
      slug = toSlug(text)

// Register heading in store
store.article.headings = [...store.article.headings, { level: withConfiguredDefaults.level, slug, text }]

// Set up copy link feature
const copyable = useCopyable('')

onMounted(() => {
  copyable.value.setString(`${window.location.origin}${window.location.pathname}#${slug}`)
})

function clickEffect () {
  copyable.value.copy()
}
</script>
