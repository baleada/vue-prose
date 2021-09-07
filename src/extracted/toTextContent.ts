import type { VNode, VNodeArrayChildren } from "vue"

export function toTextContent ({ children }: VNode) {
  if (typeof children === 'string') {
    return children
  }

  // Type assertions here until use cases for more nuanced support are understood
  return (children as VNodeArrayChildren).reduce((textContent, child) => textContent + toTextContent(child as VNode), '')
}
