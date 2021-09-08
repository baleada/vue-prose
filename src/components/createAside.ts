import { defineComponent, h } from 'vue'
// @ts-ignore
import { HeroiconsInformationCircle, HeroiconsExclamation, HeroiconsLightningBolt, HeroiconsSparkles } from '@baleada/vue-heroicons'
import { toClassList } from '../extracted'
import type { Config } from '../state'

export const createAside = (config: Config) => defineComponent({
  name: 'BaleadaProseAside',
  setup (props, { slots }) {
    const Icon = (() => {
      switch (props.type) {
        case 'info':
          return HeroiconsInformationCircle
        case 'warning':
          return HeroiconsExclamation
        case 'danger':
          return HeroiconsLightningBolt
        case 'success':
          return HeroiconsSparkles
      }
    })()

    return () => h(
      'aside',
      {
        class: toClassList('baleada-prose-aside', `baleada-prose-aside-${props.type}`, props.classes),
      },
      [
        ...(Icon ? [h(Icon)] : []),
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
