export default function toTextContent ({ children }) {
  if (typeof children === 'string') {
    return children
  }

  return children.reduce((textContent, child) => textContent + toTextContent(child), '')
}
