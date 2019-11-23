<template>
  <div role="rowgroup">
    <slot />
  </div>
</template>

<script>
import { provide } from '@vue/composition-api'

import { useSymbol } from '../composition'

export default {
  name: 'ProseRowgroup',
  props: {
    index: {
      type: Number,
      required: true,
    }
  },
  setup(props) {
    provide(useSymbol('rowgroup', 'index'), props.index)
  },
}
</script>
