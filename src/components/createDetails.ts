import { defineComponent, h } from 'vue'
// @ts-ignore
import { HeroiconsChevronRight } from '@baleada/vue-heroicons'
import { toClassList } from '../extracted'
import type { Config } from '../state'

export type CreateDetails = typeof createDetails

export const createDetails = (config: Config) => defineComponent({
  name: config.componentNames.details,
  setup (props, { slots }) {
    return () => h(
      'details',
      {
        class: toClassList('baleada-prose-details', props.classes),
      },
      [
        h(
          'summary',
          [
            h(HeroiconsChevronRight),
            h(
              'span',
              [
                props.summary,
              ]
            )
          ]
        ),
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
    summary: {
      type: String,
      required: true,
    },
    classes: {
      default: config.propDefaults.details.classes,
    }
  }
})
