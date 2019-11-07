// grid (||| ...props)
import MarkdownItContainer from 'markdown-it-container'
import replaceTag from './util/replaceTag'
import toProps from './util/toProps'

export default function(md, options) {
  md.use(MarkdownItContainer, 'grid', {
    render: renderProseGrid(md),
    marker: '|'
  })

  md.renderer.rules.table_open = renderProseGridDescendant(md, 'Grid', false)
  md.renderer.rules.table_close = renderProseGridDescendant(md, 'Grid', true)
  md.renderer.rules.thead_open = renderProseGridDescendant(md, 'Rowgroup', false)
  md.renderer.rules.thead_close = renderProseGridDescendant(md, 'Rowgroup', true)
  md.renderer.rules.tbody_open = renderProseGridDescendant(md, 'Rowgroup', false)
  md.renderer.rules.tbody_close = renderProseGridDescendant(md, 'Rowgroup', true)
  md.renderer.rules.tr_open = renderProseGridDescendant(md, 'Row', false)
  md.renderer.rules.tr_close = renderProseGridDescendant(md, 'Row', true)
  md.renderer.rules.th_open = renderProseGridDescendant(md, 'Columnheader', false)
  md.renderer.rules.th_close = renderProseGridDescendant(md, 'Columnheader', true)
  md.renderer.rules.td_open = renderProseGridDescendant(md, 'Gridcell', false)
  md.renderer.rules.td_close = renderProseGridDescendant(md, 'Gridcell', true)
}

function renderProseGrid (md) {
  return (tokens, index) => {
    const propsInterface = {
            hasMaxHeight: 'boolean',
            canFilterByQuery: 'boolean',
            filterQueryIsCaseSensitive: 'boolean',
            ariaLabel: 'string',
          },
          props = toProps(tokens[index].info, propsInterface),
          stringifiedProps = JSON.stringify(props)

    return tokens[index].nesting === 1
      ? `<ProseGrid v-bind="${stringifiedProps}">\n`
      : '</ProseGrid>'
  }
}

function renderProseGridDescendant (md, descendantName, isClose) {
  return (tokens, index, options) => {
    return replaceTag(
      md.renderer.renderToken(tokens, index, options),
      `Prose${descendantName}`,
      isClose
    )
  }
}
