import { defineComponent, h } from 'vue'
import type { PropType } from 'vue'
import { toClassList } from '../extracted'
import { useStore } from '../composition'
import type { Config } from '../state'

export type CreateMedia = typeof createMedia

export type MediaOptional = {
  classes?: string
}

export type MediaProps = MediaOptional & {
  type: 'image' | 'img' | 'audio' | 'video' | 'embed' | 'iframe',
  isFirst: boolean,
  src: string,
  ariaLabel: string,
}

export const createMedia = (config: Config) => defineComponent({
  name: config.componentNames.media,
  setup (props) {
    const store = useStore()

    // Reset article-provided state
    if (props.isFirst) {
      store.article.media = []
    }

    // Compute tag
    const tag = (() => {
      switch (props.type) {
        case 'image':
        case 'img':
          return 'img'
        case 'audio':
          return 'audio'
        case 'video':
          return 'video'
        case 'embed':
        case 'iframe':
          return 'iframe'
      }
    })()

    // Register media in context
    store.article.media = [
      ...store.article.media,
      {
        type: props.type,
        tag: tag,
        src: props.src,
        ariaLabel: props.ariaLabel
      }
    ]

    // TODO:
    // download
    // play/pause
    // speed
    // seek
    // change quality
    // do cool cloudinary stuff
    // lazy load
    // set src to a placeholder

    return () => h(
      'section',
      {
        class: toClassList('baleada-prose-media', props.classes),
      },
      [
        h(
          'section',
          {
            class: 'baleada-prose-contents'
          },
          [
            h(
              tag,
              {
                src: props.src,
                'aria-label': props.ariaLabel,
              },
            )
          ]
        )
      ]
    )
  },
  props: {
    type: {
      type: String as PropType<'image' | 'img' | 'audio' | 'video' | 'embed' | 'iframe'>,
      required: true,
    },
    isFirst: {
      type: Boolean,
      required: true,
    },
    src: {
      type: String,
      required: true,
    },
    ariaLabel: {
      type: String,
      required: true,
    },
    classes: {
      default: config.propDefaults.media.classes,
    }
  }
})
