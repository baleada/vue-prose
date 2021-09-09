import { defineComponent, h } from 'vue'
import { toClassList } from '../extracted'
import type { Config } from '../config'

export type CreateSection = typeof createSection

export type SectionOptional = {
  classes?: string,
}

export type SectionProps = SectionOptional

export const createSection = (config: Config) => defineComponent({
  name: config.componentNames.section,
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
