import { defineComponent, h, ref } from 'vue'
import { useCopyable } from '@baleada/vue-composition'
// @ts-ignore
import { HeroiconsClipboardCopy } from '@baleada/vue-heroicons'
import { toTextContent } from '../extracted'
import { toClassList } from '../extracted'
import type { Config } from '../state'

export const createCodeblock = (config: Config) => defineComponent({
  name: 'BaleadaProseCodeblock',
  setup (props, { slots }) {
    const copyable = useCopyable(''),
          defaultSlots = slots.default(),
          code = defaultSlots.reduce((text, slot) => text + toTextContent(slot), '')

    copyable.value.setString(code)

    function clickEffect () {
      copyable.value.copy()
    }

    // Compute line numbers
    const lineNumbers = Array(props.totalLines)
      .fill(undefined)
      .reduce((lineNumbers, _, index) => `${lineNumbers}${index + 1}\n`, '')

    
    return () => h(
      'section',
      {
        class: toClassList('baleada-prose-codeblock', props.classes),
      },
      [
        h(
          'section',
          {
            class: 'baleada-prose-contents'
          },
          [
            ...(
              props.showsLang
                ? [h(
                  'pre',
                  [
                    h(
                      'code',
                      [
                        props.lang,
                      ]
                    )
                  ]
                )]
                : []
            ),
            ...(
              props.showsLineNumbers
                ? [h(
                  'pre',
                  [
                    h(
                      'code',
                      [
                        lineNumbers,
                      ]
                    )
                  ]
                )]
                : []
            ),
            ...defaultSlots
          ]
        ),
        ...(
          props.readerCanCopy
            ? [h(
              'button',
              {
                name: 'Copy code',
                onClick: clickEffect,
              },
              [
                h(HeroiconsClipboardCopy),
              ]
            )]
            : []
        )
      ]
    )
  },
  props: {
    totalLines: {
      type: Number,
      required: true,
    },
    lang: {
      type: String,
      required: true,
    },
    readerCanCopy: {
      default: config.propDefaults.codeblock.readerCanCopy,
    },
    showsLang: {
      default: config.propDefaults.codeblock.showsLang,
    },
    showsLineNumbers: {
      default: config.propDefaults.codeblock.showsLineNumbers,
    },
    classes: {
      default: config.propDefaults.codeblock.classes,
    },
  }
})
