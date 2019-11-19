<template>
  <aside class="prose-aside transition" :class="[`prose-aside-${type}`]">
    <div>
      <div v-if="type === 'info'" class="prose-aside-icon">
        <EvaInfo :class="'fill-current'"/>
      </div>
      <div v-if="type === 'warning'" class="prose-aside-icon">
        <EvaAlertTriangle :class="'fill-current'"/>
      </div>
      <div v-if="type === 'danger'" class="prose-aside-icon">
        <EvaFlash :class="'fill-current'"/>
      </div>
      <div v-if="type === 'success'" class="prose-aside-icon">
        <EvaAward :class="'fill-current'"/>
      </div>
    </div>
    <div class="contents" ref="prose">
      <slot></slot>
    </div>
  </aside>
</template>

<script>
import { ref } from '@vue/composition-api'

import { EvaInfo } from '@baleada/icons/vue'
import { EvaAlertTriangle } from '@baleada/icons/vue'
import { EvaFlash } from '@baleada/icons/vue'
import { EvaAward } from '@baleada/icons/vue'

export default {
  name: 'ProseAside',
  components: {
    EvaInfo,
    EvaAlertTriangle,
    EvaFlash,
    EvaAward,
  },
  props: {
    type: {
      type: String,
      default: 'info',
      validator: (value) => {
        return ['info', 'warning', 'danger', 'success'].indexOf(value) !== -1;
      }
    }
  },
  setup() {
    const prose = ref(null)

    return {
      prose
    }
  },
}
</script>
