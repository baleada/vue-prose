<template>
  <transition>
    <div
      v-show="matchesFilterQuery"
      ref="prose"
      role="row"
    >
      <slot />
    </div>
  </transition>
</template>

<script>
import { ref, computed, watch, onMounted, inject } from '@vue/composition-api'

import { useSymbol } from '../composition'

export default {
  setup () {
    const prose = ref(null),
          text = ref(''),
          filterQuery = inject(useSymbol('grid', 'filterQuery')),
          filterQueryIsCaseSensitive = inject(useSymbol('grid', 'filterQueryIsCaseSensitive'))
          matchesFilterQuery = computed(() => {
            return filterQueryIsCaseSensitive
              ? filterQuery === '' || text.includes(filterQuery)
              : filterQuery === '' || text.toLowerCase().includes(filterQuery.toLowerCase())
          }),

    onMounted(() => {
      text.value = prose.value.textContent
    })

    return {
      prose,
      matchesFilterQuery
    }
  }
}
</script>
