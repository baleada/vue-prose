export default function toTextContent (vNode) {
  const { tag, text, children } = vNode
  return tag
    ? children.reduce((textContent, child) => textContent + toTextContent(child), '')
    : text
}
