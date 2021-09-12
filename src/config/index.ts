import type { AsideOptional } from '../components/createAside'
import type { BlockquoteOptional } from '../components/createBlockquote'
import type { CodeblockOptional } from '../components/createCodeblock'
import type { DetailsOptional } from '../components/createDetails'
import type { HeadingOptional } from '../components/createHeading'
import type { ListOptional } from '../components/createList'
import type { MediaOptional } from '../components/createMedia'
import type { SectionOptional } from '../components/createSection'
import type { TableOptional } from '../components/createTable'

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
}

// This empty object gets filled up by the plugin, then
// read by the store definition.
//
// Import order matters here.
export let config: Config = {}
