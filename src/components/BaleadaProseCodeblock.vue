<template>
  <section
    ref="baleada"
    class="baleada-prose-codeblock"
    :class="[withConfiguredDefaults.classes]"
  >
    <section class="baleada-prose-contents">
      <pre v-if="withConfiguredDefaults.showsLang"><code>{{ lang }}</code></pre>
      <pre v-if="withConfiguredDefaults.showsLineNumbers"><code>{{ lineNumbers }}</code></pre>
      <slot />
    </section>
    <!-- Copy button -->
    <button
      v-if="withConfiguredDefaults.readerCanCopy"
      name="Copy code"
      @click="clickHandle"
    >
      <HeroiconsClipboardCopy />
    </button>
  </section>
</template>

<script setup lang="ts">
import { ref, useSlots } from 'vue'
import { useCopyable } from '@baleada/vue-composition'
// @ts-ignore
import { HeroiconsClipboardCopy } from '@baleada/vue-heroicons'
import { createGetWithConfiguredDefaults, toTextContent } from '../extracted'

const props = defineProps<{
        readerCanCopy?: boolean,
        showsLang?: boolean,
        showsLineNumbers?: boolean,
        classes?: string,
        totalLines: number,
        lang: string,
      }>(),
      withConfiguredDefaults = createGetWithConfiguredDefaults('codeblock')(props),
      baleada = ref(null)

// Set up copy code to clipboard feature
const copyable = useCopyable(''),
      defaultSlot = useSlots().default(),
      code = defaultSlot.reduce((text, slot) => text + toTextContent(slot), '')

copyable.value.setString(code)

function clickHandle () {
  copyable.value.copy()
}

// Compute line numbers
const lineNumbers = Array(withConfiguredDefaults.totalLines)
  .fill(undefined)
  .reduce((lineNumbers, _, index) => `${lineNumbers}${index + 1}\n`, '')
</script>
