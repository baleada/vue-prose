import { defineComponent, h } from 'vue'
import type { PropType } from 'vue'
import { toClassList } from '../extracted'
import { useList } from '../composition'
import type { Config } from '../config'

export type CreateList = typeof createList

export type ListOptional = {
  readerCanSearch?: boolean,
  searchIsCaseSensitive?: boolean,
  readerCanChangeSearchCaseSensitivity?: boolean,
  minimumSearchScore?: number,
  classes?: string,
}

export type ListProps = ListOptional & {
  tag: 'ol' | 'ul',
  totalItems: number,
}

export const createList = (config: Config) => defineComponent({
  name: config.componentNames.list,
  setup (props, { slots }) {
    const messages = config.messages.list,
          list = useList(
            {
              totalItems: props.totalItems,
              searchIsCaseSensitive: props.searchIsCaseSensitive,
              minimumSearchScore: props.minimumSearchScore,
              readerCanSearch: props.readerCanSearch,
              readerCanChangeSearchCaseSensitivity: props.readerCanChangeSearchCaseSensitivity,
            }
          )
    
    return () => h(
      'section',
      {
        class: toClassList('baleada-prose-list', props.classes),
      },
      [
        ...(
          props.readerCanSearch
            ? [h(
              'div',
              [
                h(
                  'input',
                  {
                    ref: list.queryInput.ref,
                    placeholder: messages.searchPlaceholder,
                    'aria-label': 'Search by query',
                    type: 'text',
                  }
                )
              ]
            )]
            : []
        ),
        ...(
          props.readerCanSearch && props.readerCanChangeSearchCaseSensitivity
            ? [h(
              'div',
              [
                h(
                  'input',
                  {
                    ref: list.searchIsCaseSensitiveCheckbox.ref,
                    placeholder: messages.searchPlaceholder,
                    'aria-label': 'Change search case sensitivity',
                    type: 'checkbox',
                  }
                ),
                h(
                  'label',
                  [
                    messages.changeSearchCaseSensitivityLabel
                  ]
                )
              ]
            )]
            : []
        ),
        h(
          'section',
          {
            class: 'baleada-prose-contents',
          },
          [
            h(
              props.tag,
              {
                ref: list.root.ref
              },
              list.items.map(({ id, ref }) => slots[id]({ ref, key: id}))
            )
          ]
        )
      ]
    )
  },
  props: {
    tag: {
      type: String as PropType<'ol' | 'ul'>,
      required: true,
    },
    totalItems: {
      type: Number,
      required: true,
    },
    readerCanSearch: {
      default: config.propDefaults.list.readerCanSearch,
    },
    searchIsCaseSensitive: {
      default: config.propDefaults.list.searchIsCaseSensitive,
    },
    readerCanChangeSearchCaseSensitivity: {
      default: config.propDefaults.list.readerCanChangeSearchCaseSensitivity,
    },
    minimumSearchScore: {
      default: config.propDefaults.list.minimumSearchScore,
    },
    classes: {
      default: config.propDefaults.list.classes,
    }
  }
})
