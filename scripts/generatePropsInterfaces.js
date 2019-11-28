const fs = require('fs')

module.exports = function (framework) {
  const components = getFiles(`./src/vue/components`),
        propsInterfaces = components.reduce(
          (propsInterfaces, { path, name }) => {
            console.log(name)
            const contents = fs.readFileSync(path, 'utf8'),
                  propsMatch = contents.match(/props: {(.|\r?\n)*?\n\s\s}/)

            if (!propsMatch) {
              return {
                ...propsInterfaces,
                [name]: {
                  name,
                  interface: {},
                }
              }
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

            return {
              ...propsInterfaces,
              [name]: {
                name,
                interface: propsInterface,
              },
            }
          },
          {}
        )

  fs.writeFileSync(
    `./src/${framework}/propsInterfaces.js`,
    `export default ${JSON.stringify(propsInterfaces, null, 2)}`,
    'utf8'
  )
}

function getFiles(dirPath) {
  return fs
    .readdirSync(dirPath)
    .filter(file => file !== 'index.js' && fs.lstatSync(`${dirPath}/${file}`).isFile())
    .map(file => ({
      path: `${dirPath}/${file}`,
      name: file.split('.')[0],
    }))
}

function writeFile () {

}
