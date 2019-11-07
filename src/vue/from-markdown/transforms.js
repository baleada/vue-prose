import fs from 'fs'
import fm from 'front-matter'
import MarkdownIt from 'markdown-it'
import plugins from './plugins'

export function preRender (markdown, filePath) {
  return {
    frontMatter: fm(markdown),
    stats: fs.statSync(filePath)
  }
}

export function render (preRendered) {
  const md = new MarkdownIt({
          html: true,
          linkify: true,
        }),
        { frontMatter, stats } = preRendered,
        { attributes, body } = frontMatter

  Object.keys(plugins).forEach(plugin => md.use(plugins[plugin]))

  return {
    attributes,
    stats,
    markup: md.render(body),
  }
}

export function postRender (rendered) {
  const { attributes: { title }, stats: { mtime }, markup } = rendered

  // TODO: Remove heading and mtime once Vue supports fragments, then wrap markup in a fragment
  return `\
<template lang="html">\
<section class="contents">\
  <ProseHeading :level="1">${title}</ProseHeading>\
  <ProseMTime mtime="${mtime}" />\
  ${markup}\
</section>\
</template>\n\
\n\
<script>\n\
import { inject } from '@vue/composition-api'\n\
import { proseArticle } from '@baleada/prose/vue/symbols'\n\
\n\
export default {\n\
  setup () {\n\
    const setTitle = inject(proseArticle.setTitle),\n\
          setMTime = inject(proseArticle.setMTime)\n\
\n\
    setTitle(${title})\n\
    setMTime(${mtime})\n\
  }\n\
}\n\
</script>`
}
