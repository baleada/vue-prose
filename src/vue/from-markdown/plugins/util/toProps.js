const parsers = {
  array: group => group.replace(/^\[/, '').replace(/\]$/, '').split(','),
  boolean: group => group === undefined || group === 'true',
  date: group => group,
  "function": group => group,
  map: group => group,
  number: group => Number(group),
  object: group => group,
  string: group => group.replace(/^"/, '').replace(/"$/, ''),
}

export default function(info, propsInterface) {
  const attributes = info.match(/(\w*?=(".*?"|\w+|\[.*?\])|\w+)/g)
  return attributes === null
    ? {}
    : attributes
      .map(match => {
        const prop = match.match(/^\w+/)[0],
              group = (match.match(/=(.+)$/) !== null && match.match(/=(.+)$/)[1]) || undefined
        return { prop, group }
      })
      .filter(({ prop, group }) => propsInterface.hasOwnProperty(prop))
      .reduce((props, { prop, group }) => {
        const propType = propsInterface[prop],
              parse = parsers[propType],
              value = parse(group)

        return {
          ...props,
          [prop]: value
        }
      }, {})
}
