import { ref, shallowRef, computed, onMounted, watch, watchEffect } from 'vue'
import type { Ref } from 'vue'
import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useListenable } from '@baleada/vue-composition'
import { config } from '../config'
import { scrollToHeading } from '../extracted'
import type { ListenEffect, ListenOptions } from '@baleada/logic'


// TODO: scrollIntoView reactivity to react to prefers-reduced-motion query.
// Option to have Listenable handle that for you.
export function useEffects (
  { scrollableContainer, scrollIntoView }: {
    scrollableContainer?: Ref<HTMLElement>,
    scrollIntoView?: {
      behavior?: ScrollBehavior | 'preferred',
      block?: ScrollLogicalPosition,
      inline?: ScrollLogicalPosition,
    },
  } = {
    scrollIntoView: { behavior: 'preferred', block: 'start' },
  }
) {
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
          ensuredScrollIntoView = (() => {
            if (scrollIntoView.behavior = 'preferred') {
              const behavior = ref<ScrollBehavior>('auto'),
                    ensuredScrollIntoView = computed(() => ({
                      ...scrollIntoView,
                      behavior: behavior.value,
                    }) as ScrollIntoViewOptions),
                    prefersReducedMotion = useListenable('(prefers-reduced-motion: reduce)'),
                    prefersReducedMotionEffect: ListenEffect<'(prefers-reduced-motion: reduce)'> = event => {
                      setBehavior(event.matches)
                    },
                    prefersReducedMotionInstantEffect: ListenOptions<'(prefers-reduced-motion: reduce)'>['instantEffect'] = list => {
                      setBehavior(list.matches)
                    },
                    setBehavior = (matches: boolean) => {
                      behavior.value = matches ? 'auto' : 'smooth'
                    }

              onMounted(() => {
                prefersReducedMotion.value.listen(
                  prefersReducedMotionEffect,
                  { instantEffect: prefersReducedMotionInstantEffect }
                )
              })

              return ensuredScrollIntoView
            }

            return shallowRef(scrollIntoView as ScrollIntoViewOptions)
          })(),
          scrollEffect = () => scrollToHeading({ fullPath, scrollableContainer, scrollIntoView: ensuredScrollIntoView })

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
