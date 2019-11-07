export default function replaceTag (oldTag, newTag, isClose, options = {}) {
  const lastCharacterIsNewline = oldTag[oldTag.length - 1] === '\n',
        lastCharacter = lastCharacterIsNewline ? '\n' : ''

  if (isClose) {
    return `</${newTag}>${lastCharacter}`
  } else {
    const attrs = options.attrs || {},
          boundAttrs = options.boundAttrs || {},
          attrsString = Object.keys(attrs).map(attr => `${attr}="${attrs[attr]}"`).join(' '),
          boundAttrsString = Object.keys(boundAttrs).map(attr => `:${attr}="${boundAttrs[attr]}"`).join(' ')

    return `<${newTag}${attrsString.length > 0 ? ' ' : ''}${attrsString}${boundAttrsString.length > 0 ? ' ' : ''}${boundAttrsString}>${lastCharacter}`
  }
}
