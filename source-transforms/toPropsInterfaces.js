import { readFileSync, statSync, readdirSync } from 'fs'
import { parse } from 'path'

export default function toPropsInterfaces () {
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
                  .map(str => str.replace(/: {/g, '')),
                propTypes = propsString
                  .match(/type: (\w+)/g)
                  .map(str => str.replace(/type: /g, '').toLowerCase()),
                propsInterface = props.reduce((propsInterface, prop, i) => {
                  return {
                    ...propsInterface,
                    [prop]: propTypes[i],
                  }
                }, {})

          return { name, interface: propsInterface }
        })

  console.log(`Generated ${propsInterfaces.length} props interfaces`)

  return `export default ${JSON.stringify(propsInterfaces, null, 2)}`
}

function getFiles(dirPath) {
  return readdirSync(dirPath)
    .filter(file => file !== 'index.js' && statSync(`${dirPath}/${file}`).isFile())
    .map(file => ({
      path: `${dirPath}/${file}`,
      name: file.split('.')[0],
    }))
}

