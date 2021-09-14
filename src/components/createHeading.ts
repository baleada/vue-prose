import { defineComponent, h, computed, onMounted } from 'vue'
import { useCopyable } from '@baleada/vue-composition'
import { createSlug } from '@baleada/logic'
// @ts-ignore
import { HeroiconsLink } from '@baleada/vue-heroicons'
import { toTextContent } from '../extracted'
import { useStore } from '../composition'
import { toClassList } from '../extracted'
import type { Config } from '../config'

export type CreateHeading = typeof createHeading

export type HeadingOptional = {
  readerCanCopy?: boolean,
  classes?: string,
}

export type HeadingProps = HeadingOptional & {
  level: number,
  isFirst: boolean,
}

export const createHeading = (config: Config) => defineComponent({
  name: config.componentNames.heading,
  setup (props, { slots }) {
    const store = useStore()

    // Clear stored headings
    if (props.isFirst) {
      store.headings = []
    }

    // Get slug for various features
    const defaultSlot = slots.default(),
          text = defaultSlot.reduce((text, slot) => text + toTextContent(slot), '').trim(),
          slug = toSlug(text)

    // Register heading in store
    store.headings = [...store.headings, { level: props.level, slug, text }]

    // Set up copy link feature
    const copyable = useCopyable('')

    onMounted(() => {
      copyable.value.setString(`${window.location.origin}${window.location.pathname}#${slug}`)
    })

    function clickEffect () {
      copyable.value.copy()
    }

    return () => h(
      `h${props.level}`,
      {
        class: toClassList('baleada-prose-heading', props.classes),
      },
      [
        h(
          'a',
          {
            id: slug,
            href: `#${slug}`,
            class: 'baleada-prose-contents',
          },
          slots.default()
        ),
        ...(
          props.readerCanCopy
            ? [h(
              'button',
              {
                name: 'Copy link to heading',
                onClick: clickEffect,
              },
              [
                h(HeroiconsLink),
              ]
            )]
            : []
        )
      ]
    )
  },
  props: {
    level: {
      type: Number,
      required: true,
    },
    isFirst: {
      type: Boolean,
      required: true,
    },
    readerCanCopy: {
      default: config.propDefaults.heading.readerCanCopy,
    },
    classes: {
      default: config.propDefaults.heading.classes,
    }
  }
})

const toSlug = createSlug()
