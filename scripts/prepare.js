const { generateIndex } = require('@baleada/prepare'),
      generatePropsInterfaces = require('./generatePropsInterfaces')
      compile = require('./compile')

function prepare () {
  /* Index all */
  generateIndex('./src/api')
  generateIndex('./src/components', { extensions: ['vue'] })
  generateIndex('./src/composition')
  generateIndex('./src/state')
  generateIndex('./src/util')

  // plugin is stored at top level of src instead of in src/api to avoid circular dependencies
  generateIndex(
    ['src/api', 'src'],
    { outfile: 'src/index' }
  )

  /* Props Interfaces */
  generatePropsInterfaces('vue')

  /* Compile */
  compile()
}

prepare()
