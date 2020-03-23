const { generateIndex } = require('@baleada/prepare'),
      generatePropsInterfaces = require('./generatePropsInterfaces')
      compile = require('./compile')

function prepare () {
  /* Index all */
  generateIndex('./src')
  generateIndex('./src/components')
  generateIndex('./src/composition')
  generateIndex('./src/symbols')
  generateIndex('./src/stubs')
  generateIndex('./src/util')

  /* Top level index */
  generateIndex(
    ['src/components', 'src/symbols'],
    { outfile: 'src/index', extensions: ['js', 'vue'] }
  )

  /* Props Interfaces */
  generatePropsInterfaces('vue')

  /* Compile */
  compile()
}

prepare()
