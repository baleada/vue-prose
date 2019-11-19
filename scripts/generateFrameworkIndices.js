const generateIndex = require('./generateIndex'),
      generateFrameworkIndex = require('./generateFrameworkIndex')

module.exports = function(framework) {
  ['components', 'composition'].forEach(dir => {
    generateIndex(`src/${framework}/${dir}`)
  })

  generateFrameworkIndex(framework)
}
