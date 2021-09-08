import { ref, onMounted, defineComponent, h } from 'vue'
// @ts-ignore
import { SimpleTwitter } from '@baleada/vue-simple-icons/lite'
import { toTweetIntent, toTextContent, toClassList } from '../extracted'
import { useStore } from '../composition'
import type { Config } from '../state'

export const createBlockquote = (config: Config) => defineComponent({
  name: 'BaleadaProseBlockquote',
  setup (props, { slots }) {
    const defaultSlots = slots.default(),
          text = props.tweetText || defaultSlots.reduce((text, slot) => text + toTextContent(slot), ''),
          { fullPath } = useStore(),
          intent = ref('')

    onMounted(() => {
      intent.value = toTweetIntent({
        text,
        hashtags: props.tweetHashtags,
        url: props.tweetUrl === 'current' ? `${window.origin}${fullPath}` : props.tweetUrl,
        via: props.tweetVia,
      })
    })

    return () => h(
      'section',
      {
        class: toClassList('baleada-prose-blockquote', props.classes),
      },
      [
        h(
          'section',
          {
            class: 'baleada-prose-contents'
          },
          defaultSlots
        ),
        ...(() => {
          if (!props.readerCanTweet) {
            return []
          }

          return [
            h(
              'a',
              {
                href: intent,
                target: '_blank',
                rel: 'noopener noreferrer',
                'aria-label': 'Tweet blockquote',
              },
              [
                h(SimpleTwitter)
              ]
            )
          ]
        })()
      ]
    )
  },
  props: {
    readerCanTweet: {
      default: config.propDefaults.blockquote.readerCanTweet,
    },
    tweetText: {
      default: config.propDefaults.blockquote.tweetText,
    },
    tweetUrl: {
      default: config.propDefaults.blockquote.tweetUrl,
    },
    tweetVia: {
      default: config.propDefaults.blockquote.tweetVia,
    },
    tweetHashtags: {
      default: () => config.propDefaults.blockquote.tweetHashtags,
    },
    classes: {
      default: config.propDefaults.blockquote.classes,
    },
  }
})
