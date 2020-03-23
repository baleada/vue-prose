const { exec, empty } = require('@baleada/prepare')

module.exports = function() {
  empty('./lib')
  exec('rollup --config rollup.config.js')
}
