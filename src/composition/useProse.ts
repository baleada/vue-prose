import { ref, computed, onMounted, watch, watchEffect } from 'vue'
import type { Ref } from 'vue'
import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { config } from '../config'
import { scrollToHeading } from '../extracted'

export function useEffects ({ scrollableContainer }: { scrollableContainer?: Ref<HTMLElement> } = {}) {
  const store = useStore()

  // useRoute can only be called inside a `setup` function,
  // which is where `useEffects` gets called.
  //
  // We take this opportunity to manually make `fullPath`
  // reactive if needed.
  if (store.fullPath === 'vue-router') {
    const route = useRoute()    
    watchEffect(() => store.setFullPath(route.fullPath))
  }

  if (scrollableContainer) {
    const { fullPath } = storeToRefs(store),
    scrollEffect = () => scrollToHeading({ fullPath, scrollableContainer })

    onMounted(() => {
      scrollEffect()
      watch(fullPath, scrollEffect, { flush: 'post' })
    })
  }
}

export type Article = {
  headings: {
    level: number,
    slug: string,
    text: string,
  }[],
  media: {
    type: 'image' | 'img' | 'audio' | 'video' | 'embed' | 'iframe',
    tag: 'img' | 'audio' | 'video' | 'iframe',
    src: string,
    ariaLabel: string,
  }[]
}

export const useStore = defineStore('Baleada Prose', () => {
  const vueRouterFullPath = ref('vue-router'),
        setVueRouterFullPath = (fullPath: string) => vueRouterFullPath.value = fullPath,
        fullPath = config.getFullPath === 'vue-router'
          ? computed(() => vueRouterFullPath.value)
          : computed(config.getFullPath),
        article = ref<Article>({
          headings: [],
          media: [],
        })

  return {
    fullPath,
    article,
    setFullPath: setVueRouterFullPath,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
}
