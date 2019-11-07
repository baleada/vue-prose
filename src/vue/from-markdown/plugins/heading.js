import replaceTag from './util/replaceTag'

export default function(md, options) {
  md.renderer.rules.heading_open = renderProseHeadingOpen(md)
  md.renderer.rules.heading_close = renderProseHeadingClose(md)
}

function renderProseHeadingOpen (md) {
  return (tokens, index, options) => {
    return replaceTag(
      md.renderer.renderToken(tokens, index, options),
      'ProseHeading',
      false,
      {
        boundAttrs: {
          level: tokens[index].tag.slice(1)
        }
      }
    )
  }
}

function renderProseHeadingClose (md) {
  return (tokens, index, options) => {
    return replaceTag(
      md.renderer.renderToken(tokens, index, options),
      'ProseHeading',
      true
    )
  }
}
