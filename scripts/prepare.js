const { empty } = require('@baleada/prepare'),
      generatePropsInterfaces = require('./generatePropsInterfaces')

function prepare () {
  empty('lib')
  empty('plugin')
  empty('propsInterfaces')
  empty('loopedIdPrefix')

  generatePropsInterfaces('vue')
}

prepare()
