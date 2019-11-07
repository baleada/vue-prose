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

  return `\
<template lang="html">\
<section class="contents">\
<ProseHeading :level="1">${title}</ProseHeading>\
<ProseUpdatedAt timestamp="${mtime}" />\
${markup}\
</section>\
</template>`
}
