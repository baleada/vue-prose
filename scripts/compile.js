const vueLoader = require('vue-loader')

function compileVue (source) {
  console.log(vueLoader(source))
}

module.exports = {
  compileVue
}
