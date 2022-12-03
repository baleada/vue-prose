import { defineComponent, h } from 'vue'
import type { PropType } from 'vue'
import { useElementApi, useLabel } from '@baleada/vue-features'
import { toClassList } from '../extracted'
import { useStore } from '../composition'
import type { Config } from '../config'

export type CreateMedia = typeof createMedia

export type MediaOptional = {
  classes?: string,
  showsImageLabel?: boolean,
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
      store.media = []
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
    store.media = [
      ...store.media,
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

    // LABEL
    const media = useElementApi()
    const label = useLabel(media.element)

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
                loading: 'lazy',
                src: props.src,
                ref: media.ref,
                ...(
                  props.showsImageLabel && tag === 'img'
                    ? {}
                    : {
                      'aria-label': props.ariaLabel,
                    }
                ),
              },
            ),
            ...(props.showsImageLabel && tag === 'img'
              ? [h(
                  'p',
                  { ref: label.root.ref },
                  props.ariaLabel
                )]
              : []
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
    showsImageLabel: {
      default: config.propDefaults.media.showsImageLabel,
    },
    classes: {
      default: config.propDefaults.media.classes,
    }
  }
})
