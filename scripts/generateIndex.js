const fs = require('fs'),
      dir = process.argv[2]

function generateIndex (dir) {
  const files = fs
          .readdirSync(`./src/${dir}`)
          .filter(file => file !== 'index.js' && /\.js$/.test(file))
          .map(file => ({
            path: `./${file}`,
            name: file.split('.')[0],
          })),
        imported = files.reduce((imported, file) => `${imported}import ${file.name} from '${file.path}'\n`, ''),
        exported = files.reduce((exported, file) => `${exported}  ${file.name},\n`, 'export {\n') + '}'

  fs.writeFileSync(
    `./src/${dir}/index.js`,
    `\
${imported}\n${exported}\n\
`
  )

  console.log(`Indexed ${files.length} ${dir} files.`)
}

generateIndex(dir)
