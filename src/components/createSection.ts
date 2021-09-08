import { defineComponent, h } from 'vue'
import { toClassList } from '../extracted'
import type { Config } from '../state'

export const createSection = (config: Config) => defineComponent({
  name: 'BaleadaProseSection',
  setup (props, { slots }) {
    return () => h(
      'section',
      {
        class: toClassList('baleada-prose-section', props.classes),
      },
      [
        h(
          'section',
          {
            class: 'baleada-prose-contents'
          },
          slots.default()
        )
      ]
    )
  },
  props: {
    classes: {
      default: config.propDefaults.section.classes,
    }
  }
})
