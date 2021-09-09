import type { Config } from '../config'

export const defaultPropDefaults: {
  aside: Required<Config['propDefaults']['aside']>,
  blockquote: Required<Config['propDefaults']['blockquote']>,
  codeblock: Required<Config['propDefaults']['codeblock']>,
  details: Required<Config['propDefaults']['details']>,
  heading: Required<Config['propDefaults']['heading']>,
  list: Required<Config['propDefaults']['list']>,
  media: Required<Config['propDefaults']['media']>,
  section: Required<Config['propDefaults']['section']>,
  table: Required<Config['propDefaults']['table']>,
} = {
  aside: {
    classes: '',
    type: 'info',
  },
  blockquote: {
    classes: '',
    readerCanTweet: false,
    tweetText: '',
    tweetUrl: '',
    tweetVia: '',
    tweetHashtags: []
  },
  codeblock: {
    classes: '',
    readerCanCopy: false,
    showsLang: false,
    showsLineNumbers: false,
  },
  details: {
    classes: '',
  },
  heading: {
    classes: '',
    readerCanCopy: false,
  },
  list: {
    classes: '',
    readerCanSearch: false,
    searchIsCaseSensitive: true,
    readerCanChangeSearchCaseSensitivity: false,
    minimumSearchScore: 1,
  },
  media: {
    classes: '',
  },
  section: {
    classes: '',
  },
  table: {
    classes: '',
    readerCanSearch: false,
    searchIsCaseSensitive: true,
    readerCanChangeSearchCaseSensitivity: false,
    minimumSearchScore: 1,
  },
}
