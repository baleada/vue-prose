export default function toTextContent (vNode) {
  const { text = '', children = [] } = vNode
  return text + children.reduce((textContent, child) => textContent + toTextContent(child), '')
}
