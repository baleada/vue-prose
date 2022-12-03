import { defineComponent, h } from 'vue'
import { render as octiconsInfo24 } from '../../node_modules/@primer/octicons/build/svg/info-24.svg'
import { render as octiconsAlertFill24 } from '../../node_modules/@primer/octicons/build/svg/alert-fill-24.svg'
import { render as octiconsZap24 } from '../../node_modules/@primer/octicons/build/svg/zap-24.svg'
import { render as octiconsRocket24 } from '../../node_modules/@primer/octicons/build/svg/rocket-24.svg'
import { toClassList, toIconComponent } from '../extracted'
import type { Config } from '../config'

export type CreateAside = typeof createAside

export type AsideOptional = {
  type?: 'info' | 'warning' | 'danger' | 'success' | 'simple',
  classes?: string,
}

export type AsideProps = AsideOptional

export const createAside = (config: Config) => defineComponent({
  name: config.componentNames.aside,
  setup (props, { slots }) {
    const Icon = (() => {
      switch (props.type) {
        case 'info':
          return OcticonsInfo24
        case 'warning':
          return OcticonsAlertFill24
        case 'danger':
          return OcticonsZap24
        case 'success':
          return OcticonsRocket24
      }
    })()

    return () => h(
      'aside',
      {
        class: toClassList('baleada-prose-aside', `baleada-prose-aside-${props.type}`, props.classes),
      },
      [
        h(
          'div',
          ...(Icon ? [h(Icon)] : []),
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
    type: {
      default: config.propDefaults.aside.type,
    },
    classes: {
      default: config.propDefaults.aside.classes,
    },
  },
})

const OcticonsInfo24 = toIconComponent(octiconsInfo24)
const OcticonsAlertFill24 = toIconComponent(octiconsAlertFill24)
const OcticonsZap24 = toIconComponent(octiconsZap24)
const OcticonsRocket24 = toIconComponent(octiconsRocket24)
