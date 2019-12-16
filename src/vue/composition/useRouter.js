/* Adapted from https://github.com/u3u/vue-hooks */
import { computed, getCurrentInstance } from '@vue/composition-api'

export default function useRouter () {
  const vm = getCurrentInstance(),
        route = computed(() => vm.$route)
  return { route, router: vm.$router }
}
