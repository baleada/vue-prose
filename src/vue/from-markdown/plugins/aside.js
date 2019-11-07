// aside (<<< ...props)
import MarkdownItContainer from 'markdown-it-container'
import toProps from './util/toProps'

export default function(md, options) {
  md.use(MarkdownItContainer, 'aside', {
    render: renderProseAside(md),
    marker: '<'
  })
}

function renderProseAside (md) {
  return (tokens, index) => {
    const propsInterface = { type: 'string' },
          props = toProps(tokens[index].info, propsInterface),
          stringifiedProps = JSON.stringify(props)

    return tokens[index].nesting === 1
      ? `<ProseAside v-bind="${stringifiedProps}">\n`
      : '</ProseAside>'
  }
}
