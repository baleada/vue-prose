import { preRender, render, postRender } from './transforms'

export default function transform(markdown, loader) {
  const preRendered = preRender(markdown, loader.resourcePath),
        rendered = render(preRendered)

  return postRender(rendered)
}
