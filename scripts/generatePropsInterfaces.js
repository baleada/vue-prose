const { readFileSync, writeFileSync, statSync, readdirSync } = require('fs'),
      { parse } = require('path'),
      { clipable } = require('@baleada/logic')

module.exports = function () {
  const components = getFiles(`./src/components`).filter(({ name, path }) => name !== 'ProseContext' && parse(path).ext === '.vue'),
        propsInterfaces = components.map(({ path, name }) => {
          const contents = readFileSync(path, 'utf8'),
                propsMatch = contents.match(/props: {(.|\r?\n)*?\n\s\s}/)

          if (!propsMatch) {
            return { name, interface: {} }
          }

          const propsString = propsMatch[0],
                props = propsString
                  .match(/(\w+): {/g).slice(1)
                  .map(str => `${clipable(str).clip(/: {/g)}`),
                propTypes = propsString
                  .match(/type: (\w+)/g)
                  .map(str => `${clipable(str).clip(/type: /g)}`.toLowerCase()),
                propsInterface = props.reduce((propsInterface, prop, i) => {
                  return {
                    ...propsInterface,
                    [prop]: propTypes[i],
                  }
                }, {})

          return { name, interface: propsInterface }
        })

  writeFileSync(
    `./src/symbols/propsInterfaces.js`,
    `export default ${JSON.stringify(propsInterfaces, null, 2)}`,
    'utf8'
  )
}

function getFiles(dirPath) {
  return readdirSync(dirPath)
    .filter(file => file !== 'index.js' && statSync(`${dirPath}/${file}`).isFile())
    .map(file => ({
      path: `${dirPath}/${file}`,
      name: file.split('.')[0],
    }))
}

