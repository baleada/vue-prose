const { generateIndex } = require('@baleada/prepare'),
      generatePropsInterfaces = require('./generatePropsInterfaces')
      compile = require('./compile')

function prepare () {
  /* Index all */
  generateIndex('./src')
  generateIndex('./src/stubs')
  generateIndex('./src/util')

  /* Props Interfaces */
  generatePropsInterfaces('vue')

  /* Compile */
  compile()
}

prepare()
