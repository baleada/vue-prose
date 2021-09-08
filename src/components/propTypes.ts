// TODO: Figure out how to export these from .vue files
// TODO: Remove duplication in .vue files once Vue supports imported and complex types in `script setup`

export type AsideOptional = {
  type?: 'info' | 'warning' | 'danger' | 'success' | 'none',
  classes?: string,
}

export type AsideProps = AsideOptional

export type BlockquoteOptional = {
  readerCanTweet?: boolean,
  tweetText?: string,
  tweetUrl?: string,
  tweetVia?: string,
  tweetHashtags?: string[],
  classes?: string,
}

export type BlockquoteProps = BlockquoteOptional

export type CodeblockOptional = {
  readerCanCopy?: boolean,
  showsLang?: boolean,
  showsLineNumbers?: boolean,
  classes?: string,
}

export type CodeblockProps = CodeblockOptional & {
  totalLines: number,
  lang: string, 
}

export type DetailsOptional = {
  classes?: string,
}

export type DetailsProps = DetailsOptional & {
  summary: string,
}

export type HeadingOptional = {
  readerCanCopy?: boolean,
  classes?: string,
}

export type HeadingProps = HeadingOptional & {
  level: number,
  isFirst: boolean,
}

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

export type MediaOptional = {
  classes?: string
}

export type MediaProps = MediaOptional & {
  type: 'image' | 'img' | 'audio' | 'video' | 'embed' | 'iframe',
  isFirst: boolean,
  src: string,
  ariaLabel: string,
}

export type SectionOptional = {
  classes?: string,
}

export type SectionProps = SectionOptional

export type TableOptional = {
  readerCanSearch?: boolean,
  searchIsCaseSensitive?: boolean,
  minimumSearchScore?: number,
  readerCanChangeSearchCaseSensitivity?: boolean,
  classes?: string,
}

export type TableProps = TableOptional & {
  totalBodyRows: number,
  totalColumns: number,
  ariaLabel: string,
}
