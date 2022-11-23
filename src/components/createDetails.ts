import { defineComponent, h } from 'vue'
import { render as octiconsChevronRight24 } from '../../node_modules/@primer/octicons/build/svg/chevron-right-24.svg'
import { toClassList, toIconComponent } from '../extracted'
import type { Config } from '../config'

export type CreateDetails = typeof createDetails

export type DetailsOptional = {
  classes?: string,
}

export type DetailsProps = DetailsOptional & {
  summary: string,
}

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
            h(OcticonsChevronRight24),
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

const OcticonsChevronRight24 = toIconComponent(octiconsChevronRight24)
