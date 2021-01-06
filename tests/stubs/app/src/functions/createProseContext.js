import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useContext } from '/@src/index.js'

export default function createProseContext () {
  const route = useRoute(),
        fullPath = computed(() => route.fullPath),
        defaultProps = {
          article: {
            
          },
          blockquote: {
            
          },
          codeblock: {
            
          },
          heading: {
            
          },
        }

  useContext(
    { fullPath, defaultProps }
  )
}
