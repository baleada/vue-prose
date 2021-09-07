export type StoreConfig = {
  name?: string,
  getFullPath?: () => string,
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
    aside?: {
      classes?: string,
      type?: string,
    },
    blockquote?: {
      classes?: string,
      readerCanTweet?: boolean,
      tweetText?: string,
      tweetUrl?: string,
      tweetVia?: string,
      tweetHashtags?: string[]
    },
    codeblock?: {
      classes?: string,
      readerCanCopy?: boolean,
      hasLang?: boolean,
      hasLineNumbers?: boolean,
    },
    details?: {
      classes?: string,
      summary?: string,
    },
    table?: {
      classes?: string,
      readerCanSearch?: boolean,
      searchIsCaseSensitive?: boolean,
      readerCanChangeSearchCaseSensitivity?: boolean,
      minimumSearchScore?: number,
    },
    heading?: {
      classes?: string,
      descendant1Classes?: string,
      descendant2Classes?: string,
      descendant3Classes?: string,
      readerCanCopy?: boolean,
    },
    list?: {
      classes?: string,
      readerCanSearch?: boolean,
      searchIsCaseSensitive?: boolean,
      readerCanChangeSearchCaseSensitivity?: boolean,
      minimumSearchScore?: number,
    },
    media?: {
      classes?: string,
    },
    section?: {
      classes?: string,
    },
  },
  getScrollableContainer?: () => HTMLElement,
}

// This empty object gets filled up by the plugin, then
// read by the store definition.
//
// Import order matters here.
export const storeConfig: StoreConfig = {}
