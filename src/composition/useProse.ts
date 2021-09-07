import { ref, computed, onMounted, watch, shallowRef } from 'vue'
import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'
import { storeConfig } from '../state'
import { scrollToHeading } from '../extracted'

export function useEffects () {
  const { fullPath, scrollableContainer } = storeToRefs(useStore()),
        scrollEffect = () => scrollToHeading({ fullPath, scrollableContainer })

  onMounted(() => {
    scrollEffect()
    watch(fullPath, scrollEffect, { flush: 'post' })
  })
}

export const useStore = defineStore(storeConfig.name, () => {
  const fullPath = computed(storeConfig.getFullPath),
        messages = shallowRef(storeConfig.messages),
        propDefaults = shallowRef(storeConfig.propDefaults),
        scrollableContainer = computed(storeConfig.getScrollableContainer),
        article = ref({})

  return {
    fullPath,
    messages,
    propDefaults,
    scrollableContainer,
    article,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
}
