export default function(md, options) {
  md.renderer.rules.fence = renderProseCodeblock(md)
}

function renderProseCodeblock (md) {
  const rules = md.renderer.rules,
        renderFence = rules.hasOwnProperty('fence') ? rules.fence : md.renderer.renderToken

  return (tokens, index, options, env, self) => {
    const markup = renderFence(tokens, index, options, env, self),
          withoutTrailingNewline = markup.slice(0, markup.length - 1)

    return `<ProseCodeblock>${withoutTrailingNewline}</ProseCodeblock>\n`
  }
}
