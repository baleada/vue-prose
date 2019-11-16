const fs = require('fs')

module.exports = function(framework) {
  const components = getFiles(framework, 'components'),
        all = components,
        imported = all.reduce((imported, fnxn) => `${imported}import ${fnxn.name} from '${fnxn.path}'\n`, ''),
        exported = all.reduce((exported, fnxn) => `${exported}  ${fnxn.name},\n`, 'export {\n') + '}'

  fs.writeFileSync(
    `./src/${framework}/index.js`,
    `\
${imported}\n${exported}\n\
`
  )

  console.log(`Indexed ${all.length} ${framework} functions.`)
}

function getFiles(framework, category) {
  return fs
          .readdirSync(`./src/${framework}/${category}`)
          .filter(file => file !== 'index.js' && fs.lstatSync(`./src/${framework}/${category}/${file}`).isFile())
          .map(file => ({
            path: `./${category}/${file}`,
            name: file.split('.')[0],
          }))
}
