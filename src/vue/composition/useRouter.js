/* Adapted from https://github.com/u3u/vue-hooks */
import { computed } from '@vue/composition-api'
import { getRuntimeVM } from '../util/runtime'

export default function useRouter () {
  const vm = getRuntimeVM(),
        route = computed(() => vm.$route)
  return { route, router: vm.$router }
}
