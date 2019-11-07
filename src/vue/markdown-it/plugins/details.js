// details (^^^ ...props)
import MarkdownItContainer from 'markdown-it-container'
import toProps from './util/toProps'

export default function(md, options) {
  md.use(MarkdownItContainer, 'details', {
    render: renderProseDetails(md),
    marker: '^'
  })
}

function renderProseDetails (md) {
  return (tokens, index) => {
    const propsInterface = { summary: 'string' },
          props = toProps(tokens[index].info, propsInterface),
          stringifiedProps = JSON.stringify(props)

    return tokens[index].nesting === 1
      ? `<ProseDetails v-bind="${stringifiedProps}">\n`
      : '</ProseDetails>'
  }
}
