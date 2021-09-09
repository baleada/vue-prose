import type { AsideOptional } from '../components/propTypes'
import type { BlockquoteOptional } from '../components/propTypes'
import type { CodeblockOptional } from '../components/propTypes'
import type { DetailsOptional } from '../components/propTypes'
import type { HeadingOptional } from '../components/propTypes'
import type { ListOptional } from '../components/propTypes'
import type { MediaOptional } from '../components/propTypes'
import type { SectionOptional } from '../components/propTypes'
import type { TableOptional } from '../components/propTypes'

export type Config = {
  getFullPath?: 'vue-router' | (() => string),
  messages?: {
    table?: {
      searchPlaceholder?: string,
      changeSearchCaseSensitivityLabel?: string,
    },
    list?: {
      searchPlaceholder?: string,
      changeSearchCaseSensitivityLabel?: string,
    },
  },
  propDefaults?: {
    aside?: AsideOptional,
    blockquote?: BlockquoteOptional,
    codeblock?: CodeblockOptional,
    details?: DetailsOptional,
    table?: TableOptional,
    heading?: HeadingOptional,
    list?: ListOptional,
    media?: MediaOptional,
    section?: SectionOptional,
  },
  componentNames?: {
    [component in 'aside' | 'blockquote' | 'codeblock' | 'details' | 'table' | 'heading' | 'list' | 'media' | 'section']?: string
  },
  getScrollableContainer?: () => HTMLElement,
}

// This empty object gets filled up by the plugin, then
// read by the store definition.
//
// Import order matters here.
export let config: Config = {}

