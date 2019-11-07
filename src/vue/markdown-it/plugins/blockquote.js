// blockquote (>>> ...props)
import MarkdownItContainer from 'markdown-it-container'
import toProps from './util/toProps'

export default function(md, options) {
  md.use(MarkdownItContainer, 'blockquote', {
    render: renderProseBlockquote(md),
    marker: '"'
  })
}

function renderProseBlockquote (md) {
  return (tokens, index) => {
    const propsInterface = {
            isTweetable: 'boolean',
            tweetText: 'string',
            tweetHashtags: 'array',
          },
          props = toProps(tokens[index].info, propsInterface),
          stringifiedProps = JSON.stringify(props)

    return tokens[index].nesting === 1
      ? `<ProseBlockquote v-bind="${stringifiedProps}">\n`
      : '</ProseBlockquote>'
  }
}
